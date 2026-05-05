import {useQuery, useMutation} from '@tanstack/react-query'
import {createUser,loginUser, getMe} from './../api/userApi';

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
}

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
