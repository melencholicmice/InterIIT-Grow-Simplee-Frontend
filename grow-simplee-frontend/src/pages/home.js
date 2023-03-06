import React, {useEffect}from 'react';
import HorizontalNavbar from '../components/HorizontalNavbar';
import SideBar from '../components/Home/Sidebar';
import PackageContent from '../components/PackagesPage/PackageContent';
import rows from '../Data/packageData';

import SearchBar from '../components/SearchBar';
import RiderData from '../components/RiderData';
import RiderProfile from '../components/RiderPage/RiderProfile';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { AuthContext } from '../context/authContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles({
    wrapper:{
        background: "#292929",
        overflow: "scroll",
    },
    contentWrapper:{
        display: "flex",
        background: "#292929",
    },
    tableWrapper:{
        height:"calc(100vh - 65px)",
        background: "#CCCDCD",
        display: "flex",
        flexDirection: "column",
        margin:"8px auto",
        padding: "12px",
        borderRadius: "10px",
    },
    searchWrapper:{
        marginTop: "8px",
        position: "relative",
        top:"0",
    }
})

const Home = () => {
    const classes = useStyles();
    const contextdata = React.useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        (async() => {

            try{
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get-admin`,{withCredentials:true});
                if(res.status !== 200){
                    throw new Error(res);
                }
                console.log(res.data);
                if(res.data.success !== true){
                    navigate('/');
                }
                
            }
            catch (err){
                console.log(err);
                if(err.response.data.success === false){
                    navigate('/');
                }
            }

        })();


    });

    

    return (
        <div className={classes.wrapper}>
            <HorizontalNavbar />
            <div className={classes.contentWrapper}>
                <SideBar />

                <div className={classes.tableWrapper}>
                    {/* <div className={classes.searchWrapper}>
                    <SearchBar 
                            title="Packages"
                            subtext="this is the list of Packages."
                    />
                    </div> */}
                    <Outlet/>
                </div>
            </div>
        </div>
    )

}

export default Home;
