import { makeStyles } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  LinkButton:{
    display: "flex",
    flexDirection: "row",
    width: "226px",
    height: "36px",
    color: "#E5E5E5",
    border: "1px solid #E5E5E5",
    borderRadius:"12px" ,
    margin:"16px auto",
    '&:hover': {
      opacity:"0.7"
    },
  },
  icon:{
    margin:"auto 18px",
  },
  LinkTitle:{
    fontWeight:"500",
    margin:"auto 0"
  }

})

const LinkButton = (props) => {
    const classes = useStyles();
    return (
      <Link to={props.data.link} className={classes.LinkButton}>
        <div className={classes.icon}>{props.data.icon}</div>
        <div className={classes.LinkTitle}>{ props.data.title}</div>
      </Link>
  )
}

export default LinkButton;
