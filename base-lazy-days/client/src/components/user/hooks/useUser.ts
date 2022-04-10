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
  const {data:user} = useQuery(queryKeys.user,()=>getUser(user));
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
