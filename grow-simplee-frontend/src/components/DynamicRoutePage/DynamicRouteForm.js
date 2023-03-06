import {
    Button,
    Container,
    makeStyles,
    MenuItem,
    TextField,
    Typography,
  } from '@material-ui/core';
  import React, { useState } from 'react'
  import "../../styles/utils.css"
  import axios from 'axios';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  const useStyles = makeStyles({
    formWrapper: {
      border: "2px solid #343434",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
      borderRadius: "20px",
      opacity: "0.75",
      padding: "10px",
      // height:"inherit"
    },
    formComponent: {
      margin: "10px auto",
      display: "flex",
      width: "100%",
      minWidth: "500px"
    },
    wrapper: {
      width: "calc(100vw - 310px)",
      height: "calc(100%)",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
    },
    button: {
      color: "#white",
      backgroundColor: "#08F96B",
      alignItems: "center",
      marginBottom: "20px"
    },
    buttonWrapper: {
      display: "flex",
      alignItems: "center"
    }
  })
  
  
  function DynamicRouteForm() {
    const classes = useStyles();
    const [values, setValues] = useState({
      SKU: "",
      productName: "",
      AWB: "",
      customerName: "",
      address: "",
    });
    const [responseMsg, setResponseMsg] = useState("");
  
    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      try{
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/package/add-pickup`,values,{withCredentials:true});
        console.log(res);
        if(res.status !== 200){
          throw new Error(res);
        }
        if(res.data.success === true){
          setResponseMsg("Rider Created Successfully");
          toast.success("package added successfully");
        }
        else{
          toast("Something went wrong");
        }
      } catch(err){
          setResponseMsg(err.message);
          toast(err.message);
      }
    };
  
    return (
      <div className={classes.wrapper} style={{
        borderRadius: "8px"
      }}>
        <Container maxWidth="sm" className={classes.formWrapper}>
          <Typography variant="h5" component="h2" >
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              id="SKU"
              name="SKU"
              label="SKU"
              required
              value={values.name}
              onChange={handleChange}
              className={[classes.formComponent].join(" ")}
            />
            <TextField
              variant="outlined"
              id="productName"
              name="productName"
              label="productName"
              required
              fullWidth
              value={values.email}
              onChange={handleChange}
              className={[classes.formComponent].join(" ")}
            />
            <TextField
              variant="outlined"
              id="AWB"
              name="AWB"
              label="AWB"
              required
              fullWidth
              value={values.email}
              onChange={handleChange}
              className={[classes.formComponent].join(" ")}
            />
            <TextField
              variant="outlined"
              id="customerName"
              name="customerName"
              label="customerName"
              required
              fullWidth
              value={values.email}
              onChange={handleChange}
              className={[classes.formComponent].join(" ")}
            />
            <TextField
              variant="outlined"
              id="address"
              name="address"
              label="address"
              required
              fullWidth
              value={values.email}
              onChange={handleChange}
              className={[classes.formComponent].join(" ")}
            />
            
            <div className={classes.buttonWrapper}>
              <Button type="submit" variant="contained" className={classes.button}>
                Register
              </Button>
            </div>
          </form>
        </Container>
        <ToastContainer />
      </div>
    );
  }
  
  export default DynamicRouteForm;
  
  