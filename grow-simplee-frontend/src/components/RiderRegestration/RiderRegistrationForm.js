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
    overflow:"scroll",
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

const BloodGroupTypes = [
  {
    value: 'A_POSITIVE',
    label: 'A +ve',
  },
  {
    value: 'A_NEGATIVE',
    label: 'A -ve',
  },
  {
    value: 'B_POSITIVE',
    label: 'B +ve',
  },
  {
    value: 'B_NEGATIVE',
    label: 'B -ve',
  },
  {
    value: 'AB_POSITIVE',
    label: 'AB +ve',
  },
  {
    value: 'AB_NEGATIVE',
    label: 'AB -ve',
  },
  {
    value: 'O_POSITIVE',
    label: 'O +ve',
  },
  {
    value: 'O_NEGATIVE',
    label: 'O -ve',
  },
  {
    value: 'OTHER',
    label: 'Other',
  },
];

function RiderRegistrationForm() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    phoneno: "",
    password: "",
    drivingLicense: "",
    vehicleId: "",
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
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/add-rider`,values,{withCredentials:true});
      console.log(res);
      if(res.status !== 200){
        throw new Error(res);
      }
      if(res.data.success === true){
        setResponseMsg("Rider Created Successfully");
        toast("Rider created successfully");
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
            id="name"
            name="name"
            label="name"
            required
            value={values.name}
            onChange={handleChange}
            className={[classes.formComponent].join(" ")}
          />
          <TextField
            variant="outlined"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            className={[classes.formComponent].join(" ")}
          />
          <TextField
            variant="outlined"
            id="bloodGroup"
            name="bloodGroup"
            select
            label="Blood Group"
            defaultValue="A_POSITIVE"
            value={values.bloodGroup}
            onChange={handleChange}
            className={[classes.formComponent].join(" ")}
          >
            {BloodGroupTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className={[classes.formComponent].join(" ")}
            value={values.password}
            onChange={handleChange}
          />
          <TextField
            id="phoneno"
            name="phoneno"
            label="Phone Number"
            variant="outlined"
            fullWidth
            className={[classes.formComponent].join(" ")}
            value={values.phoneno}
            onChange={handleChange}
          />
          <TextField
            id="drivingLicense"
            name="drivingLicense"
            label="Driving Licence URL"
            variant="outlined"
            fullWidth
            className={[classes.formComponent].join(" ")}
            value={values.drivingLicense}
            onChange={handleChange}
          />
          <TextField
            id="vehicleId"
            name="vehicleId"
            label="Vechical ID"
            variant="outlined"
            fullWidth
            className={[classes.formComponent].join(" ")}
            value={values.vehicleId}
            onChange={handleChange}
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

export default RiderRegistrationForm

