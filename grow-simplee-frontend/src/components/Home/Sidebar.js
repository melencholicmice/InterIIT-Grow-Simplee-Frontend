import { makeStyles } from '@material-ui/core'
import React from 'react'

import LinkButton from './LinkButton'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import {
  PackageIconSvg,
  RiderIconSvg,
  RoutesIconSvg,
  NotificationIconSvg,
  SettingsIconSvg,
  BikerIconSvg,
  PickupIconSvg
} from '../../Data/SvgFiles'

const useStyles = makeStyles({
  test: {
    display:"flex",
    flexDirection: "column",
    height: "calc(100vh - 64px)",
    width:"250px",
    backgroundColor:"#292929",
    justifyContent:"space-between",
    alignItems:"center",
    borderRight:"2px solid #FFFFFF" ,
    // position: "sticky",
    position:"relative"
  },
  logoutButtonWrapped:{
    display:"flex",
    width:"100%",
    height:"60px",
    justifyContent:"center",
    alignItems: "center",
  },
  logoutButton:{
    margin:"auto",
    backgroundColor:"#08F96B",
    height: "34.31px",
    width: "223px",
    borderRadius: "5.20px",
    "&hover":{
      opacity: "0.9",
    }
}
})

const pageLinkData = [
  {
    'icon': PackageIconSvg,
    'title': "Package",
    'link': "/home"
  },
  {
    'icon': RoutesIconSvg,
    'title': "Routes",
    'link': "/routes"
  },
  {
    'icon': RiderIconSvg,
    'title': "Riders",
    'link': "/riders"
  },
  {
    'icon': BikerIconSvg,
    'title': "Add Rider",
    'link': "/add-rider"
  },
   {
    'icon': SettingsIconSvg,
    'title': "Add Admin",
    'link': "/add-admin"
  },
  {
    'icon': PickupIconSvg,
    'title': "Dynamic Pickup",
    'link': "/dynamic-pickup"
  },
  {
    'icon': PickupIconSvg,
    'title': "Add Package",
    'link': "/add-package"
  }
]

const Sidebar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const logout = async () =>{
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/logout`,{},{withCredentials:true});
    if(res.data.success === true) {
      navigate("/");
    }
  }

  return (
      <div className ={classes.test}>
        <div className="linkButtons">
          {pageLinkData.map((data) =>
              <LinkButton data={data} />
          )}
        </div>
        <div className = {classes.logoutButtonWrapped}>
        <button className = {classes.logoutButton} onClick={()=> {logout()}}>
          Logout
        </button>
        </div>
      </div>
  )
}

export default Sidebar;