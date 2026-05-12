import axiosInstance from "./axiosInstance";
export const createUser = (data)=>{
    return axiosInstance.post('/user/create', data)
}
export const loginUser = (data)=>{
    return axiosInstance.post('/login', data);
}

export const getMe = async () => {
  const res = await axiosInstance.get("/user/me");
  return res.data; // always return data only
};
export const saveContact = async (data) =>{
    return axiosInstance.post('/user/create', data);
}
export const getList = (data)=>{
    return axiosInstance.get('/user/list',
        {
            params: data
        }
    );
}