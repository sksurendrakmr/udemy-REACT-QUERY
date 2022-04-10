import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { generateQueryClient } from "react-query/queryClient";

// import { defaultQueryClientOptions } from "../react-query/queryClient";

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {
    //shallow errors without printing  out
  },
});

//make a function to generate a unique query client for each test
const generateTestQueryClient = () => {
  const client = generateQueryClient();
  //changing default options and disable retry
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export const renderWithQueryClient = (
  UI: React.ReactElement,
  client?: QueryClient
): RenderResult => {
  const queryClient = client ?? generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{UI}</QueryClientProvider>
  );
};

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const createQueryClientWrapper = (): React.FC => {
  const queryClient = generateQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
