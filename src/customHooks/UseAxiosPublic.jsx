import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://mobi-cash-backend.vercel.app",
});
const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
