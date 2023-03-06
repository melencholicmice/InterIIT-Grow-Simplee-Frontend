import { 
    Paper,
    makeStyles,
} from '@material-ui/core';
import React from 'react'
import profile from '../../images/Ellipse 119.png'

const useStyles = makeStyles({
   wrapper:{
     display:"flex",
     flexDirection:"row",
     width:"calc(100vw - 310px)",
     justifyContent:"stretch",
     alignItems:"center",
   },
   riderTitle:{
    fontWeight:"900",
    padding:"20px 20px",
    fontSize:"1.5rem"
   },
   boxTwoWrapper:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    marginLeft:"2%",
    borderRadius:"15px",
   },
   boxWrapper:{
    display:"flex",
    alignItems:"center",
    borderRadius:"15px",
   },
   imageWrapper:{
    padding:"0 50px"
   },
   boldUtil:{
    fontWeight:"900",
    fontSize:"1.25rem"
   }
})
/*
 * : TODO : integrate the {{192.168.137.207:5000/package/rider-packages}} api 
 *  Varibles to change :-  Rider Name
 */
function RiderProfile(props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
        <Paper style={{width:"65%" , height:"250px"}}  className={classes.boxWrapper}>
            <div>
                <h1 className={classes.riderTitle}>{props.data.name} </h1> 
                <div className={classes.imageWrapper}>
                    <img
                     src={profile}
                     alt='profile pitcure'
                    />
                </div>
            </div>
            <div className={classes.boldUtil}>
                <h3>email : {props.data.email}</h3>
                <h3>phone no : {!props.data.phoneno?"not available":props.data.phoneno}</h3>
            </div>
        </Paper>
        <Paper style={{width:"33%" , height:"250px"}} className={[classes.boxTwoWrapper,classes.boldUtil].join(" ")}>
          <h3>driving Licence : {!props.data.drivingLicence?"not available":props.data.drivingLicence}</h3>
          <h3>blood Group : {!props.data.bloodGroup?"not available":props.data.bloodGroup}</h3>
        </Paper>

        <div>
          
        </div>
    </div>
  )
}

export default RiderProfile;