import React, {useEffect, useState} from 'react';
import HorizontalNavbar from '../components/HorizontalNavbar';
import SideBar from '../components/Home/Sidebar';
import '../styles/vehiclerouter.css';
import Routetimeline from '../components/routetimeline';
import { AuthContext } from '../context/authContext';
import { useNavigate , useParams} from "react-router-dom";
import axios from 'axios';
import {io} from 'socket.io-client';

const VehicleRoute = () =>{

    const contextdata = React.useContext(AuthContext);
    const navigate = useNavigate();
    const socket = io(process.env.REACT_APP_BASE_URL,{withCredentials:true});
    const param = useParams();
    const [routeData, setRouteData] = useState();
    const [mapApiUrl, setMapsApiUrl] = useState(`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_MAPS_API}
    &origin=koramangala,Bangalore,karnataka&destination=gopalan+mall,bangalore,karnataka&waypoints=garuda+mall,bangalore,karnataka|UB%20city,bangalore,karnataka|lalbagh+botanical+garden,bangalore,karnataka`);
    const [riderCurrentlocation, setRiderCurrentlocation] = useState();
    

    useEffect(() => {

        (async() => {

            try{
                const res = await axios.get('http://localhost:5000/admin/get-admin',{withCredentials:true});
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

            console.log(process.env.REACT_APP_BASE_URL);
            socket.on("connect", () => {
                console.log("calling");
                console.log(socket.id); 
            });

            socket.on("rider:move", async(riderEntity)=>{
                setRiderCurrentlocation(riderEntity)
            })

            console.log(param.routeId);
            const riderRouteRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/route/get-rider-route?riderId=${param.routeId}`,{withCredentials:true});
            console.log(riderRouteRes.data);
            setRouteData(riderRouteRes.data);

            let url = `https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_MAPS_API}
            &origin=`;
            url += `${riderRouteRes.data.points[0].latitude},${riderRouteRes.data.points[0].longitude}`
            url += `&destination=${riderRouteRes.data.points[riderRouteRes.data.points.length-1].latitude},${riderRouteRes.data.points[riderRouteRes.data.points.length-1].longitude}`
            url += `&waypoints=`;
            for(let i = 1; i < riderRouteRes.data.points.length; i++){
                url += `${riderRouteRes.data.points[i].latitude},${riderRouteRes.data.points[i].longitude}`
                if(i < riderRouteRes.data.points.length-1){
                    url += `|`;
                }
            }
            console.log(url);
            setMapsApiUrl(url);


        })();


    },[]);
    

    return(
        <div className="wrapper">
            <HorizontalNavbar />
            <div className='contentWrapper'>
                <SideBar />
                <div className='DataWrapper'>
                    <h1><b>Route ID:</b></h1>
                    <p>Rider Name:</p>
                    <p>Rider ID:</p>
                    <div className='timeline-map-separator'>

                        <div className='col'>
                        {!routeData?null:( <Routetimeline data={!routeData?null:routeData.points} />)} 
                        </div>
                        <div className='col1'>
                            <iframe
                                title='map-frame'
                                width="80%"
                                height="60%"
                                style={{border:"0",margin:"auto",borderRadius:"10px"}}
                                loading="lazy"
                                allowfullscreen
                                referrerpolicy="no-referrer-when-downgrade"
                                src = {mapApiUrl} >
                            </iframe>
                            
                        </div>

                    </div>
                    
                    
                </div>
            </div>
       
    </div>
    )
}

export default VehicleRoute; 