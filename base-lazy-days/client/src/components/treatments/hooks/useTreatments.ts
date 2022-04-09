import { useQuery } from 'react-query';
import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const toast = useCustomToast();
  //we will going to handle error and isFetching, isLoading etc centrally at one place
  //So, here we will going to have fallback value for data
  const fallback = []
  const {data=fallback} = useQuery(queryKeys.treatments,getTreatments,{
    onError:(error)=>{
      const title = error instanceof Error ? error.message : "error connecting to the server";
      toast({title,status:'error'})
    }
  })
  return data;
}
