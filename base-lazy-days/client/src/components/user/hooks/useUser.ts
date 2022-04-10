import { AxiosResponse } from 'axios';
import { QueryClient, useQuery } from 'react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
    },
  );
  return data.user;
}


/**
 * useUser responsibility to maintain user's state both in localStorage
 * in query cache.
 */


interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  // const {data:user} = useQuery(queryKeys.user,()=>getUser(user)); //undefined


  //we need to reinitialize the user data from localstorage when page reloaded
  //Use InitialData value to useQuery


  //onSuccess runs after : 1. setQueryData 2. after query function return value
  //onSuccess callback have data as parameter which will be either the return value of queryFn or the value of setQueryData. 
  //since it get the data either from updateUser() or clearUser() so data type would be User | null
  const {data:user} = useQuery(queryKeys.user,()=>getUser(user),{
    onSuccess:(data:User | null)=>{
      //if user is null, data comes from clearUser() and we want to clear the localStorage
      if(!data){
        clearStoredUser();
      }else{
        setStoredUser(data)
      }
    },
    initialData:getStoredUser
  });
  const queryClient = new QueryClient();

  //we want to be able to set the value in the query cache from useAuth hook.
  //so we will have valid user when we run above useQuery function
  // meant to be called from useAuth

  //Here, React query acting as a provider for auth
  //In order to set the value in query cache, we are going to use the queryClient method called setQueryData.
  function updateUser(newUser: User): void {
    queryClient.setQueryData(queryKeys.user,newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    queryClient.setQueryData(queryKeys.user,null);
  }

  return { user, updateUser, clearUser };
}
