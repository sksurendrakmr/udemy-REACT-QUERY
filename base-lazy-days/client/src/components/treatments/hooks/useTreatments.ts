import { useQuery, useQueryClient } from 'react-query';
import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  //we will going to handle error and isFetching, isLoading etc centrally at one place
  //So, here we will going to have fallback value for data
  const fallback = []
  const {data=fallback} = useQuery(queryKeys.treatments,getTreatments)
  return data;
}

//Will call usePrefetchTreatments from Home component. That way
//the data will be preloaded into the cache and as long as the user goes
//to the treatments page before the cache time is up, then we will be able 
//to display the cached data and user's don't have to wait for us actually
//to make a server call.

export function usePrefetchTreatments():void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments,getTreatments)
}
