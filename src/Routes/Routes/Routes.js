import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Error from "../../Pages/Error/Error";
import Categories from "../../Pages/Home/Categories/Categories/Categories";
import Category from "../../Pages/Home/Categories/Category/Category";
import CategorySingle from "../../Pages/Home/Categories/Category/CategorySingle";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
            {
                path: '/category',
                element: <Category></Category>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute>
                    <CategorySingle> </CategorySingle>
                </PrivateRoute>,
                loader: ({ params }) => params.id
            },
        ]
    },
]);

export default router;