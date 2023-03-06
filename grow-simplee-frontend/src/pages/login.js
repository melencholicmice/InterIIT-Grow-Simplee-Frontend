import React ,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/authContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LoginBG from '../images/loginbg.png';
import loginimg from '../images/Group 2784.png'


const styles = (theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  wrapper:{
    width:"100vw",
    height:"100vh",
    display: 'flex',
    alignItems: 'center',
    justifyContent:"center",
    flexDirection:"column",
  },
  lgImg:{
    width:"14vw",
    height:"9vh",
    marginTop:"1%",
  }
});

const useStyles = makeStyles(styles);

const Login = () => {
  const classes = useStyles();

  const contextdata = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    (async() => {

        try{
            const res = await axios.get('http://localhost:5000/admin/get-admin',{withCredentials:true});
            if(res.status !== 200){
                throw new Error(res);
            }
            console.log(res.data);
            if(res.data.success === true){
                navigate('/home');
            }
            
        }
        catch (err){
            console.log(err);
            if(err.response.data.success === false){
                navigate('/');
            }
        }

    })();


  },[]);
  

  return (
    <div style={{backgroundImage:`url(${LoginBG})`}} className={classes.wrapper}>
      <img className={classes.lgImg} src={loginimg} alt="loginimage"/>
        <LoginForm />
    </div>
  )
}

export default Login;