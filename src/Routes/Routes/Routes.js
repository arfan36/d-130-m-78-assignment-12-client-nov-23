import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Error from "../../Pages/Error/Error";
import Categories from "../../Pages/Home/Categories/Categories/Categories";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/categories',
                element: <Categories></Categories>
            },
        ]
    },
]);

export default router;