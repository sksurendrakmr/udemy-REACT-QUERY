import { screen } from "@testing-library/react";

import { rest } from "msw";
import { renderWithQueryClient } from "test-utils";
import { server } from "../../../mocks/server";
import { Calendar } from "../Calendar";

// mocking useUser to mimic a logged-in user
// jest.mock('../../user/hooks/useUser', () => ({
//   __esModule: true,
//   useUser: () => ({ user: mockUser }),
// }));

test("Reserve appointment error", async () => {
  // (re)set handler to return a 500 error for appointments
  server.resetHandlers(
    rest.get(
      "http://localhost:3030/appointments/:month/:year",
      (req, res, ctx) => {
        return res(ctx.status(500));
      }
    )
  );

  //In general, react query writes error to the console if it receives
  //errors and we can update that by setting the logger.

  //we will get error like couldn't find role of 'alert'
  //This is because in application,we are providing default errorHandler
  //but while testing the queryclient doesn't have default errorHandler

  //after adding default Error handler, it will not resolve this error
  //Because it timing out as it retry for 3 times.
  //for test, we need to disable the retry
  renderWithQueryClient(<Calendar />);
  const alertToast = await screen.findByRole("alert");
  expect(alertToast).toHaveTextContent("Request failed with status code 500");
});
