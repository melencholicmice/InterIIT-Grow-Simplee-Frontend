import { makeStyles } from '@material-ui/core'
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';
import { useState, useEffect } from 'react'
import TablePagination from '@mui/material/TablePagination';
import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio } from  'react-loader-spinner'


const useStyles = makeStyles({
  table: {
      position:"relative",
      overflow:"scroll",
      width: "calc(100vw - 310px)",

  },
  wrapper: {
      margin: "15px auto",
      display:"flex",
      flexDirection:"column"
  },
  tableHeader: {
      backgroundColor: "#343434",
      color: "#FFF",
      width: "calc(100vw - 310px)",
  },
  tableCell:{
      textAlign:"center"
  },
  oddRowStyles: {
      backgroundColor: "#FFFFFF",
      textAlign:"center",
  },
  evenRowStyles:{
      backgroundColor: "#E5E5E5",
  }
})


const RoutesData = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [routedata, setRoutedata] = useState();
  const [loader, setLoader] = useState(false);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const handleRoutesGen = async() => {

    setLoader(true)
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/generate-routes`,{withCredentials:true});
    if(true){
        setLoader(false);
        toast("Routes Generated");
    }
    setLoader(false);
  };

  useEffect(() => {

    (async() =>{

        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/route/get-all-routes`,{withCredentials:true});
        console.log(res.data.routes);
        setRoutedata(res.data.routes);

    })();
    
  }, []);
  


  return (
    <div className={classes.wrapper}>
        {loader && (<Audio
    height = "400"
    width = "400"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle={{marginTop:"20%"}}
    wrapperClass
  />)}
                <div className={classes.searchWrapper}>
                    <SearchBar 
                            title="Routes"
                            subtext="This is a list of Routes."
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        style={{backgroundColor:"#08F96B"}}
                        color="#08F96B"
                        type="submit"
                        size="large"
                        onClick={()=>{handleRoutesGen()}}
                    >
          
                    Generate All Routes
                </Button>
                <div>
                <div className={classes.wrapper}>
                <TableContainer component={Paper} >
                    <Table stickyHeader className={[classes.table , classes.tableCell].join(" ")}>

                            <TableRow className={classes.tableHeader}>
                                <TableCell styles width="30%">
                                    ROUTE
                                </TableCell> 
                                <TableCell styles width="40%">
                                    RIDER ID
                                </TableCell>
                                <TableCell styles width="30%">
                                    CONTACT
                                </TableCell>
                            </TableRow>
                        {
                            !routedata?null:routedata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow className={(index % 2 === 0) ? classes.oddRowStyles : classes.evenRowStyles}>
                                        <TableCell width="25%">
                                            <Link to={`/rider-route/${row.riderId}`}>
                                                {`Route${index+1}`}
                                            </Link>
                                        </TableCell>
                                        <TableCell width="40%">
                                            {row.riderId}
                                        </TableCell>
                                        <TableCell width="20%">
                                            {row.edd}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </Table >

                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={!routedata?0:routedata.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </TableContainer >
            </div>
            </div >
        </div >
        <ToastContainer />
    </div>
  )
}

export default RoutesData;