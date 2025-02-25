import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../error/Error";
import Main from "../components/main/homePage/Main";
import Register from "../components/main/authForm/Register";
import Login from "../components/main/authForm/Login";
import OTP from "../demo/OTP";
import Services from "../components/main/services/Services";
import SendMoney from "../components/main/sendMoney/SendMoney";

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
                path:'/otp',
                element: <OTP/>
            },
        ]
    },
    {
        path:"*",
        element: <Error/>
    }
])