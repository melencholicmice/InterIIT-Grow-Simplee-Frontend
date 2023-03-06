import {
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    makeStyles
} from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import axios from 'axios';

const useStyles = makeStyles({
    table: {
        width: "calc(100vw - 310px)",
        overflow:"scroll"
    },
    wrapper: {
        margin: "15px auto"
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

const RiderData = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [riderData, setRiderData] = useState();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
      
        (async()=>{
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get-all-riders`,{withCredentials:true});
            console.log(res.data.riders);
            if(res.data !== undefined){
                setRiderData(res.data.riders);
            }
        })();
    
      
    }, [])
    

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(props);
    return (
        <div className={classes.wrapper}>
                <div className={classes.searchWrapper}>
                    <SearchBar 
                            title="Riders"
                            subtext="This is a list of Riders."
                    />
                </div>
                <div className={classes.table}>
                    <TableContainer component={Paper}  >
                            <Table stickyHeader className={[classes.redBorder, classes.tableCell].join(" ")}>
                                    <TableRow className={classes.tableHeader}>
                                        <TableCell styles width="30%">
                                            RIDER ID
                                        </TableCell>
                                        <TableCell styles width="40%">
                                            RIDER NAME
                                        </TableCell> 
                                        <TableCell styles width="30%">
                                            CONTACT
                                        </TableCell>
                                    </TableRow>
                                {
                                    !riderData?null:riderData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow className={(index % 2 === 0) ? classes.oddRowStyles : classes.evenRowStyles}>
                                                <TableCell width="25%">
                                                    <Link to={`/rider/${row.id}`}>
                                                        {row.id}
                                                    </Link>
                                                </TableCell>
                                                <TableCell width="40%">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell width="20%">
                                                    {row.phoneno}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
    
                            </Table >
    
                            <TablePagination
                                rowsPerPageOptions={[10]}
                                component="div"
                                count={!riderData?0:riderData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
    
                    </TableContainer >
                </div>
            </div >
    )
}

export default RiderData;











