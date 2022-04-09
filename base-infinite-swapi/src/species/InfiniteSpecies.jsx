import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async ({ paramPage = initialUrl }) => {
  const response = await fetch(paramPage);
  return response.json();
};

const formatSpeciesResults = (results) =>
  results.map((result) => ({
    name: result.name,
    language: result.language,
    averageLifeSpan: result.average_lifespan,
  }));
export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    isError,
  } = useInfiniteQuery("sw-species", fetchUrl, {
    getNextPageParam: (lastPage) => lastPage.next || undefined,
    select: (data) =>
      data.pages.map((page) => ({
        ...page,
        results: formatSpeciesResults(page.results),
      })),
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  console.log(data);
  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.map((species) =>
          species.results.map((result) => (
            <Species key={result.name} {...result} />
          ))
        )}
      </InfiniteScroll>
      {isFetchingNextPage && <div>Loading...</div>}
    </>
  );
}
