import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AllBuyers from "../../Pages/DashBoard/Admin/AllBuyers";
import AllSellers from "../../Pages/DashBoard/Admin/AllSellers";
import DashBoard from "../../Pages/DashBoard/Dashboard/DashBoard";
import AddAProduct from "../../Pages/DashBoard/Seller/AddAProduct";
import MyProducts from "../../Pages/DashBoard/Seller/MyProducts";
import SeeAll from "../../Pages/Home/Advertised/SeeAll";
import Blog from "../../Pages/Home/Blog/Blog";
import Categories from "../../Pages/Home/Categories/Categories/Categories";
import Category from "../../Pages/Home/Categories/Category/Category";
import CategorySingle from "../../Pages/Home/Categories/Category/CategorySingle";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/SignUp/SignUp";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import AdminRoute from "../PrivateRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
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
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/see-all',
                element: <PrivateRoute>
                    <SeeAll></SeeAll>
                </PrivateRoute>
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
                path: '/category/:categoryName',
                element: <PrivateRoute>
                    <CategorySingle> </CategorySingle>
                </PrivateRoute>,
                loader: ({ params }) => params.categoryName
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <DashBoard></DashBoard>
            },
            {
                path: '/dashboard/seller-addAProduct',
                element: <AddAProduct></AddAProduct>
            },
            {
                path: '/dashboard/seller-myProducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/admin-allSellers',
                element: <AdminRoute>
                    <AllSellers></AllSellers>
                </AdminRoute>
            },
            {
                path: '/dashboard/admin-allBuyers',
                element: <AdminRoute>
                    <AllBuyers></AllBuyers>
                </AdminRoute>
            },
        ]
    }
]);

export default router;