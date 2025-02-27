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

// ten stack query for all UseAllUsers
const UseAllUsers = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: allUsers}=  useQuery({
        queryKey: ['allUsers', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    return [allUsers, refetch];
}

// ten stack query for all new agent request
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

// ten stack query for all withdraws show
const UseAllWithdraws = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: allWithdraws}=  useQuery({
        queryKey: ['allWithdraws', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get('/withdraws');
            return res.data;
        }
    })
    return [allWithdraws, refetch];
}

// ten stack query for all withdraws show for specific agent
const UseAgentWithdraw = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: agentWithdraw}=  useQuery({
        queryKey: ['agentWithdraw', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/withdraws?email=${user?.email}`);
            return res.data;
        }
    })
    return [agentWithdraw, refetch];
}

// ten stack query for all withdraws request (pending)
const UseAllWithdrawsReq = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: withdrawsReq}=  useQuery({
        queryKey: ['withdrawsReq', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get('/withdrawsReq');
            return res.data;
        }
    })
    return [withdrawsReq, refetch];
}

// ten stack query for all cash request
const UseAllCashReq = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: cashReq}=  useQuery({
        queryKey: ['cashReq', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get('/cashReq');
            return res.data;
        }
    })
    return [cashReq, refetch];
}


// ten stack query for see all my transactions
const UseMyTransactions = () => {
    const axiosSecure = UseAxiosSecure();
    const {user} = AuthProviderHook();
    const {refetch,data: myTransactions}=  useQuery({
        queryKey: ['myTransactions', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/allTransactions?email=${user?.email}`);
            return res.data;
        }
    })
    return [myTransactions, refetch];
}


export {UseAllTransaction, UseAllUsers, UseNewUserRequest, UseAllWithdraws, UseAllWithdrawsReq, UseAllCashReq, UseAgentWithdraw, UseMyTransactions};