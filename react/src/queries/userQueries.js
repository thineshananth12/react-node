import {useQuery, useMutation} from '@tanstack/react-query'
import {createUser,loginUser, getMe, getList, saveContact} from './../api/userApi';

export const useLoginUser = ()=>{
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (res) => {
            console.log("Success:", res.data);
        },
        onError: (err) => {
        console.error(err.response?.data);
        }
    })
};
export const useSaveMe = ()=>{
    return useMutation({
        mutationFn: saveContact,
        onSuccess: (res) => {
            console.log("Success:", res.data);
        },
        onError: (err) => {
        console.error(err.response?.data);
        }
    })
};
export const userList = (page, limit, status, searchTerm='')=>{
return useQuery({
    queryKey: ['users', page, limit, status, searchTerm],
    queryFn: () =>
      getList({
        page,
        status,
        searchTerm
      }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
