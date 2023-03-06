import {
    IconButton,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    makeStyles,
    TableBody
} from '@material-ui/core';
import React, { useState , useEffect } from 'react'
import TablePagination from '@mui/material/TablePagination';
import ExpandableRow from './ExpandableRow';
import { TableHead } from '@mui/material';
import SearchBar from '../SearchBar';
import axios from 'axios';

const useStyles = makeStyles({
    table: {
        width: "calc(100vw - 310px)",
    },
    wrapper: {
        margin: "15px auto",
        overflow: "scroll",

    },
    tableHeader: {
        backgroundColor: "#343434",
        color: "#FFF",
        width: "calc(100vw - 310px)",
    },
    completedStyle:{
        border:"1px solid green",
        borderRadiur:"4px"
    },
    pendingStyle:{
        border:"1px solid blue",
        borderRadiur:"4px"
    }
})
const PackageContent = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data , setData] = useState([]);

    useEffect(()=>{

        (async() => {
            console.log("entered use effect in package table");
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/package/get/filter` , {},{withCredentials:true});
            console.log(res.data);
            setData(res.data.packages);
            
        })();
            
    },[]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className={classes.wrapper}>
              <div className={classes.searchWrapper}>
                    <SearchBar 
                            title="Package"
                            subtext="This is a list of Packages."
                    />
                </div>
            <div>
                <TableContainer component={Paper} stickyHeader>
                    <Table stickyHeader="true" className={[classes.redBorder, classes.table].join(" ")}>
                        <TableHead>
                            <TableRow className={classes.tableHeader}>
                                <TableCell styles width="25%">
                                    PACKAGE ID
                                </TableCell>
                                <TableCell styles width="40%">
                                    LOCATION
                                </TableCell>
                                <TableCell styles width="20%">
                                    EDD
                                </TableCell>
                                <TableCell styles width="15%">
                                    STATUS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    if (index % 2) {
                                        return <ExpandableRow data={row} clr={false} />
                                    }
                                    else {
                                        return <ExpandableRow data={row} clr={true} />
                                    }
                                })
                            }
                        </TableBody>
                    </Table >

                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={!data?0:data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </TableContainer >
            </div >
        </div >
    )
}

export default PackageContent;