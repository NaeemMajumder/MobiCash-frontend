import axios from "axios";
import { toast } from "react-toastify";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const UseAxiosSecure = () => {


  // axios interceptors
  axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token');
    console.log("axiosSecure: ", token);
    config.headers.authorization = token;
    return config
  },function(error){
    return Promise.reject(error);
  });


  // axios interceptors 401 and 403 handle
  axiosSecure.interceptors.response.use(function(response){
    return response;
  },async function(error){
    let status = error.response.status;
    if(status == 401 || status == 403){
      toast.error("not working")
    }
    return Promise.reject(error);
  })

  return axiosSecure;
};

export default UseAxiosSecure;
