import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../error/Error";
import Main from "../components/main/homePage/Main";
import Register from "../components/main/authForm/Register";
import Login from "../components/main/authForm/Login";
import Services from "../components/main/services/Services";
import SendMoney from "../components/main/sendMoney/SendMoney";
import CashOut from "../components/main/cashOut/CashOut";
import CashIn from "../agentComponents/cashIn/CashIn";
import WithdrawBalance from "../agentComponents/withdrawBalance/WithdrawBalance";
import DashBoard from "../components/dashboard/DashBoard";
import AllUsers from "../adminComponents/allUsers/AllUsers";
import NewAgent from "../adminComponents/newAgentRequest/NewAgent";
import WithdrawRequest from "../adminComponents/withdrawRequest/WithdrawRequest";
import CashRequest from "../agentComponents/cashRequest/CashRequest";
import CashApprove from "../adminComponents/cashRequestAdmin/CashApprove";
import MyProfile from "../components/myProfile/MyProfile";
import MyTransactions from "../components/myTransaction/MyTransactions";
import WithdrawHistory from "../agentComponents/withdrawHistory/WithdrawHistory";
import AllWithdraws from "../adminComponents/allWithdraws/AllWithdraws";
import UserDetails from "../adminComponents/userDetails/UserDetails";
import PrivateRoute from "../provider/PrivateRoute";
import AgentPrivateRoute from "../provider/AgentPrivateRoute";
import AdminPrivateRoute from "../provider/AdminPrivateRoute";
import UserPrivateRoute from "../provider/UserPrivateRoute";
import UserAgentPrivateRoute from "../provider/UserAgentPrivateRoute";
import AllTransData from "../adminComponents/allTransaction/AllTransData";

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
                element: <PrivateRoute><UserAgentPrivateRoute><Services/></UserAgentPrivateRoute></PrivateRoute>
            },
            {
                path:'/sendMoney',
                element: <PrivateRoute><UserPrivateRoute><SendMoney/></UserPrivateRoute></PrivateRoute>
            },
            {
                path:'/cashOut',
                element: <PrivateRoute><UserPrivateRoute><CashOut/></UserPrivateRoute></PrivateRoute>
            },

            // agent route
            {
                path:'/cashIn',
                element: <PrivateRoute><AgentPrivateRoute><CashIn/></AgentPrivateRoute></PrivateRoute>
            },
            {
                path:'/withdrawBalance',
                element: <PrivateRoute><AgentPrivateRoute><WithdrawBalance/></AgentPrivateRoute></PrivateRoute>
            },
            {
                path:'/cashRequest',
                element: <PrivateRoute><AgentPrivateRoute><CashRequest/></AgentPrivateRoute></PrivateRoute>
            },
        ]
    },
    {
        path:"/profile",
        element:<PrivateRoute><DashBoard/></PrivateRoute>,
        children:[
            {
                path:"",
                element:<MyProfile/>
            },
            // admin route
            {
                path:'transactions',
                element:<PrivateRoute><AdminPrivateRoute><AllTransData/></AdminPrivateRoute></PrivateRoute>
            },
            {
                path:'allUsers',
                element:<PrivateRoute><AdminPrivateRoute><AllUsers/></AdminPrivateRoute></PrivateRoute>
            },
            {
                path:'newAgents',
                element:<PrivateRoute><AdminPrivateRoute><NewAgent/></AdminPrivateRoute></PrivateRoute>
            },
            {
                path:'withdrawRequests',
                element:<PrivateRoute><AdminPrivateRoute><WithdrawRequest/></AdminPrivateRoute></PrivateRoute>
            },
            {
                path:'allWithdraws',
                element:<PrivateRoute><AdminPrivateRoute><AllWithdraws/></AdminPrivateRoute></PrivateRoute>
            },
            {
                path:'cashRequest',
                element:<PrivateRoute><AdminPrivateRoute><CashApprove/></AdminPrivateRoute></PrivateRoute>
            },

            // user route
            {
                path:'userTransactions',
                element: <PrivateRoute><UserAgentPrivateRoute><MyTransactions/></UserAgentPrivateRoute></PrivateRoute> // user + agent
            },

            // agent
            {
                path:'withdrawHistory',
                element:<PrivateRoute><AgentPrivateRoute><WithdrawHistory/></AgentPrivateRoute></PrivateRoute>
            },

            // demo route
            {
              path: "details/:id",
              element: <UserDetails />,
              loader: ({params})=>fetch(`https://mobi-cash-backend.vercel.app/user/${params.id}`)
            },
        ]
    },
    {
        path:"*",
        element: <Error/>
    }
])