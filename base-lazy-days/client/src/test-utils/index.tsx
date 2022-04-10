import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// import { defaultQueryClientOptions } from "../react-query/queryClient";

//make a function to generate a unique query client for each test
const generateQueryClient = () => {
  return new QueryClient();
};

export const renderWithQueryClient = (
  UI: React.ReactElement,
  client?: QueryClient
): RenderResult => {
  const queryClient = client ?? generateQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{UI}</QueryClientProvider>
  );
};

// // from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
// export const createQueryClientWrapper = (): React.FC => {
//   const queryClient = generateQueryClient();
//   return ({ children }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };
