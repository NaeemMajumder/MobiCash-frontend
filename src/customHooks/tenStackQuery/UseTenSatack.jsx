import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../UseAxiosSecure";
import AuthProviderHook from "../AuthProviderHook";

// ten stack query for all transactions
const UseAllTransaction = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: allTransactions}=  useQuery({
        queryKey: ['transaction', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get('/allTransactions');
            return res.data;
        }
    })
    return [allTransactions, refetch];
}

// ten stack query for all transactions
const UseAllUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: allUsers}=  useQuery({
        queryKey: ['allUsers', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    return [allUsers, refetch];
}

// ten stack query for all transactions
const UseNewUserRequest = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: newUsersRequest}=  useQuery({
        queryKey: ['newUsersRequest', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get('/newUsers');
            return res.data;
        }
    })
    return [newUsersRequest, refetch];
}

export {UseAllTransaction, UseAllUsers, UseNewUserRequest};