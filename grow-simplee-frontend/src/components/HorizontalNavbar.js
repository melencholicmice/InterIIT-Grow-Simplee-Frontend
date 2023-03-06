import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Toolbar } from '@material-ui/core';
import { AppBar } from '@mui/material';
import logo from '../images/image 1360.png';
import avatar from '../images/Avatar.png';

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    body:{
      width:"100vw",
      background:`linear-gradient(90.02deg, #000000 -0.37%, #17232E 85.24%)`,

    },
    imageAvatar:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px",
      position: "absolute",
      width: "39.97px",
      height: "39.97px",
      left: "90vw",
      top: "14px",
      borderRadius: "19.9857px", 
    },
    imageLogo:{
      position: "absolute",
      width: "251.66px",
      height: "54px",
      left: "-11px",
      top: "7px",
    }
  }));

const HorizontalNavbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.body} position="static">
    <Toolbar>
      <img src={logo} alt="organization logo"/>
      <img className={classes.imageAvatar} src={avatar} alt="avatar"/>
    </Toolbar>
  </AppBar>
  )
}

export default HorizontalNavbar;