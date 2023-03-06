import React, { useEffect, useState} from 'react'
import HorizontalNavbar from '../HorizontalNavbar';
import {
    makeStyles,
} from '@material-ui/core';
import SideBar from '../Home/Sidebar';
import { AuthContext } from '../../context/authContext';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import RiderProfile from './RiderProfile';
import { KeyboardArrowLeftOutlined } from '@material-ui/icons';
import RiderPageTable from './RiderPageTable';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    contentWrapper: {
        display: "flex",
    },
    profileWrapper: {
        display: "flex",
        padding:"auto",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "calc(100vw - 248px)",
        backgroundColor: "#292929"
    },
    backButton: {
        color: "#3EEF85",
        display: "flex",
        alignItems:"flex-start",
        "&hover": {
            opacity: "0.1",
        },
        cursor: "pointer",
        marginBottom:"10px"
    },
    backText: {
        color: "#3EEF85",
        fontSize: "20px",
    },
    tableHeader:{
        color:"#FFFFFF",
        backgroundColor:"#000000"
    },
    innerWrapper:{
        margin:"auto",
    }
});

function RiderPageLayout(props) {

    const classes = useStyles();
    const contextdata = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [riderData, setRiderData] = useState({
        name: "",
        phoneno: "",
        onduty: false,
        email: "",
        drivingLicense: "",
        bloodGroup: "",
        vehicleId: null
    });
    let param = useParams();

    useEffect(() => {

        (async () => {

            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get-admin`, { withCredentials: true });
                if (res.status !== 200) {
                    throw new Error(res);
                }
                console.log(res.data);
                if (res.data.success !== true) {
                    navigate('/');
                }

            }
            catch (err) {
                console.log(err);
                if (err.response.data.success === false) {
                    navigate('/');
                }
            }
                
            const riderRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get-rider?id=${param.riderId}`,{withCredentials: true});
            console.log(riderRes.data);
            if(riderRes.status === 200){
                setRiderData(riderRes.data.rider);
            }
        })();
    }, []);

    return (
        <div>
            <HorizontalNavbar />
            <div>
                <div className={classes.contentWrapper}>
                    <SideBar />
                    <div className={classes.profileWrapper}>
                    <div className={classes.innerWrapper}>
                        <Link
                            to="/riders"
                        > 
                            <div className={classes.backButton}>
                                <KeyboardArrowLeftOutlined
                                    fontSize='large'
                                />
                                <p className={classes.backText}>Back</p>
                            </div>
                        </Link>
                            <RiderProfile data={riderData} />
                            <RiderPageTable data={props.data}/>
                    </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default RiderPageLayout