import { render, screen } from "@testing-library/react";
import { renderWithQueryClient } from "test-utils";

import { Treatments } from "../Treatments";

test("renders response from query", async () => {
  // write test here
  renderWithQueryClient(<Treatments />);
  //will look at the response that we are getting from
  //the query and not just renders without errors.

  //marked with async because it will actually going to render
  //the response from the query asynchronously even though its not
  //making a network request as mock service worker request is still asynchronously.

  //test whether it render query response or not
  const treatmentTitles = await screen.findAllByRole("heading", {
    name: /massage|facial|scrub/i,
  });

  expect(treatmentTitles).toHaveLength(3);
});
