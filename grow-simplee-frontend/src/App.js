import React, { useEffect, useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import VehicleRoute from "./pages/vehicleroute";
import { AuthContext } from './context/authContext';
import axios from 'axios';
import PackageContent from './components/PackagesPage/PackageContent';
import rows from './Data/packageData';
import RoutesData from "./components/RoutesData";
import RiderData from "./components/RiderData";
import data from "./Data/riderData";
import RiderRegistrationForm from "./components/RiderRegestration/RiderRegistrationForm";
import CreateAdmin from "./components/CreateAdmin/CreateAdminForm";
import RiderPageLayout from "./components/RiderPage/RiderPageLayout";
import NotFound from "./pages/notFound"
import DynamicRouteForm from "./components/DynamicRoutePage/DynamicRouteForm";
import AddPackage from "./components/PackagesPage/addpackageform";
// import VehicleRoute from "./pages/vehicleroute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = async () => {

    try{
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}admin/get-admin`,{withCredentials:true});
        if(res.status !== 200){
            throw new Error(res);
        }
        console.log(res.data);
        if(res.data.success === true){
            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
        }
    }
    catch (err){
        console.log(err);
        if(err.response.data.success === false){
            console.log("not authorized");
        }
    }
    }


    useEffect(() => {

        (async () => {
            // checkUserToken();
        })();
        console.log(`${process.env.REACT_APP_BASE_URL}admin/get-admin`);

    }, []);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login/>,
        },
        {
        
            path:"/rider-route/:routeId",
            element:<VehicleRoute/>
            
        },
        {
            path:`/rider/:riderId`,
            element:<RiderPageLayout data={data}/>
        },
        {
            element:<Home/>,
            children:[
            {
                path: "/routes",
                element: <RoutesData data={data}/>,
            },
            {
                path:"/home",
                element: <PackageContent data={rows} />
            },
            {
                path:"/riders",
                element:<RiderData data={data}/>
            },
            {
                path:"/add-rider",
                element:<RiderRegistrationForm/>
            },
            {
                path:"/add-admin",
                element:<CreateAdmin/>
            },
            {
                path:"/dynamic-pickup",
                element:<DynamicRouteForm/>
            },
            {
                path:"/add-package",
                element:<AddPackage/>
            },
        ]},
        {
            path:"/:notFound",
            element:<NotFound/>
        }
      ]);
 
    return (
        <>
            <AuthContext.Provider value={isLoggedIn}>
                <RouterProvider router={router} />
            </AuthContext.Provider>
        </>
    );
}

export default App;
