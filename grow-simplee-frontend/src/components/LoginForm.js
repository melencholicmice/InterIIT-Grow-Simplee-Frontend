import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    height: "369px",
    width: "489px",
    marginTop: theme.spacing(3),
    border: "1px",
    borderRadius: "20px",
    background:"#060D12",
  },
  textField: {
    textColor:"white",
    marginBottom: theme.spacing(3),
    width: "90%",
  },  
  floatingLabelFocusStyle: {
    color: "white"
  },
  button:{
    backgroundColor:"#08F96B",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  },
  multilineColor:{
    color:"white"
  }
}));

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const body = {
      email: email,
      password: password
    }
    
    console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    try {
      const res = await axios.post('/admin/login', body, {withCredentials:true,crossDomain:true});
      console.log(res)
      if(res.status !== 200){
        throw new Error(res);
      }
      
      if(res.data.success === true){
        navigate("/home");
      }
      else{
        setMessage(res.message);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message + " check email and password");
    }
    
  };

  return (
    <>

      <form className={classes.form} onSubmit={handleSubmit}>
        {/* <Typography> Grow Simplee Admin</Typography> */}
        <TextField
          className={classes.textField}
          label="Email"
          variant="outlined"
          InputProps={{className:classes.multilineColor,classes:{notchedOutline: classes.notchedOutline}}}
          InputLabelProps={{
            style:{color:"white"},
            className: classes.floatingLabelFocusStyle,
          }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          type="password"
          InputProps={{className:classes.multilineColor,classes:{notchedOutline: classes.notchedOutline}}}
          InputLabelProps={{
            style:{color:"white"},
            className: classes.floatingLabelFocusStyle,
          }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p style={{color:"red", margin:"5px",alignItems:"center"}}>{message}</p>
        <Button
          className={classes.button}
          variant="contained"
          color="#08F96B"
          type="submit"
          size="large"
        >
          
          Login
        </Button>
      </form>
    </>
  );
}

export default LoginForm;