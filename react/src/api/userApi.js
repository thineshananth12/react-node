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