import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../error/Error";
import Main from "../components/main/homePage/Main";
import Register from "../components/main/authForm/Register";
import Login from "../components/main/authForm/Login";
import OTP from "../demo/OTP";
import Services from "../components/main/services/Services";
import SendMoney from "../components/main/sendMoney/SendMoney";
import CashOut from "../components/main/cashOut/CashOut";
import CashIn from "../agentComponents/cashIn/CashIn";
import WithdrawBalance from "../agentComponents/withdrawBalance/WithdrawBalance";
import DashBoard from "../components/dashboard/DashBoard";
import AllUsers from "../adminComponents/allUsers/AllUsers";
import NewAgent from "../adminComponents/newAgentRequest/NewAgent";
import WithdrawRequest from "../adminComponents/withdrawRequest/WithdrawRequest";
import AllTransactions from "../adminComponents/allTransaction/AllTransactions";
import CashRequest from "../agentComponents/cashRequest/CashRequest";

export const Router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        errorElement: <Error/>,
        children:[
            {
                path:'/',
                element: <Main/>
            },
            {
                path:'/register',
                element: <Register/>
            },
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/services',
                element: <Services/>
            },
            {
                path:'/sendMoney',
                element: <SendMoney/>
            },
            {
                path:'/cashOut',
                element: <CashOut/>
            },

            // agent route
            {
                path:'/cashIn',
                element: <CashIn/>
            },
            {
                path:'/withdrawBalance',
                element: <WithdrawBalance/>
            },
            {
                path:'/cashRequest',
                element: <CashRequest/>
            },


            {
                path:'/otp',
                element: <OTP/>
            },
        ]
    },
    {
        path:"/profile",
        element:<DashBoard/>,
        children:[
            // admin route
            {
                path:'transactions',
                element:<AllTransactions/>
            },
            {
                path:'allUsers',
                element:<AllUsers/>
            },
            {
                path:'newAgents',
                element:<NewAgent/>
            },
            {
                path:'withdrawRequests',
                element:<WithdrawRequest/>
            },
        ]
    },
    {
        path:"*",
        element: <Error/>
    }
])