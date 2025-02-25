import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../error/Error";

export const Router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        errorElement: <Error/>,
        children:[
            {
                path:'/'
            }
        ]
    },
    {
        path:"*",
        element: <Error/>
    }
])