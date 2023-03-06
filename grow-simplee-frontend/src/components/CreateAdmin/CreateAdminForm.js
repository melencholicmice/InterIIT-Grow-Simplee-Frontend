import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import "../../styles/utils.css"
import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const useStyles = makeStyles({
  wrapper: {
    width: "calc(100vw - 310px)",
    height: "100%",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  formWrapper: {
    border: "2px solid #343434",
    borderRadius: "5px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    opacity: "0.75",
    padding: "10px"
  },
  formComponent: {
    margin: "10px auto",
    display: "flex"
  },
  button:{
    backgroundColor: "#08F96B",
  }
})

function CreateAdmin() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(values);
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/add-admin`,values,{withCredentials:true});
    if(res.status === 200){
      toast.success("admin created successfully");
    }

  };

  return (
    <div className={classes.wrapper}>
      <Container maxWidth="sm"
        className={[classes.formWrapper, "text-field-custom"].join(" ")}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            id="name"
            name="name"
            label="name"
            required
            value={values.name}
            onChange={handleChange}
            className={classes.formComponent}
          />
          <TextField
            variant="outlined"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={classes.formComponent}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            className={classes.formComponent}
            value={values.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" className={[classes.formComponent,classes.button].join(" ")}>
            Register
          </Button>
        </form>
      </Container>
      <ToastContainer
      position="bottom-center" />
    </div>
  );
}

export default CreateAdmin;

