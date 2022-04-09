import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

/**
 * fetchNextPage -> determine which function to run when we want more data.
 * hasNextPage -> boolean, determing whether we have more data to collect or not.
 */

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async ({ pageParam = initialUrl }) => {
  const response = await fetch(pageParam);
  return response.json();
};

const formatResults = (results) => {
  return results.map((result) => ({
    name: result.name,
    hairColor: result.hair_color,
    eyeColor: result.eye_color,
  }));
};
export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery("sw-people", fetchUrl, {
    getNextPageParam: (lastPage, allPages) => lastPage.next || undefined,
    select: (data) => {
      return data.pages.map((person) => {
        return {
          ...person,
          results: formatResults(person.results),
        };
      });
    },
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div className="">{error.toString()}</div>;
  }

  console.log(data);
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.map((person) => {
          return person.results.map((result) => {
            return <Person key={result.name} {...result} />;
          });
        })}
      </InfiniteScroll>
      {isFetchingNextPage && <div>Loading...</div>}
    </>
  );
}
