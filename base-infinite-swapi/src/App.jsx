import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";

/**
 * useInfiniteQuery vs useQuery
 * 1. In useInfiniteQuery, shape of data different than usequery.
 * 2. Data Object with two properties :-
 *      --> pages (array of objects for each page of data)
 *      --> pageParams
 * 3. Every query has its own element in the pages array.
 * 4. pageParams tracks the keys of queries that have been retieved.
 *    --> rarely used.
 *
 * Syntax
 * -> pageParam is a parameter passed to the queryFn.
 * --> useInfiniteQuery("sw-people", ({pageParam = defaultUrl}) => fetchUrl(pageParam))
 *
 * ==========
 *
 * useInfiniteQuery options
 *
 * Funtion that determine how to get the next page.
 * Either from the data from lastPage or the data from the allPages.
 *
 * --> getNextPageParam : (lastPage, allPages)
 *      --> Updates pageParam
 *      --> Might use all of the pages of data (allPages)
 *
 *
 * There are also some properties of the return object that are different from useQuery.
 * 
 *
   1. fetchNextPage -> a function we need to call whenever the user needs more data. 
                     (Either to click a button or when they hit the point on the screen 
                      where they are about to run out of data)

   2. hasNextPage -> Based in return value of getNextPageParam
                     if undefined, no more data.

   3. isFetchingNextPage -> For displaying a loader spinner
                            useInfinteQuery can distinguish between whether it's fetching
                            the next page or whether it's fetching in general.
        

      ==================================
      The flow
      ==============
      When componentMount, data property of useInfinteQuery is undefined as we haven't made query yet.
 * 
 */

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
        {/* <InfiniteSpecies /> */}
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
