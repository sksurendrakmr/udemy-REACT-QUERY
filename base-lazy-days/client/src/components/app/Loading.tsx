import { Spinner, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useIsFetching, useIsMutating } from "react-query";

/**
 * useIsFetching will return an Integer, representing the number
 * of query calls that are currently in the fetching state.
 *
 * so if useIsFetching > 0 ? 'fetching state (true)' : false
 */

export function Loading(): ReactElement {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating(); //give us integer which tell us how many mutation function are currently unresolved

  const display = isFetching || isMutating ? "inherit" : "none";

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
