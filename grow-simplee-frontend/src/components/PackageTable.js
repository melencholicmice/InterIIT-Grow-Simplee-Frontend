import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import rows from '../Data/packageData';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const styles = () => ({
    tableBody: {
        maxHeight: '300px',
        overflow: 'auto',
        border: '2px solid red'
    },
    tableStyles:{
        marginTop:"100px",
        border:"1px solid red"
    },
    firstColoumn:{
        position:"sticky",
        left:0,
    },
    completedStyle:{
        border:"1px solid green",
        borderRadiur:"4px"
    },
    pendingStyle:{
        border:"1px solid blue",
        borderRadiur:"4px"
    }
});


const useStyles = makeStyles(styles);

const PackageTable = () => {
    const classes = useStyles();
    const [data , setData] = useState([]);
    useEffect(()=>{

        (async()=>{
            console.log("entered useeffect in ");
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/get-dimension-records`,{withCredentials:true})
            console.log(res.data)
        })();
    },[]);

    return (
        <TableContainer component={Paper} styles={classes.tableStyles}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className={classes.firstColoumn}>Package ID </StyledTableCell>
                        <StyledTableCell align="right">Location</StyledTableCell>
                        <StyledTableCell align="right">EDD</StyledTableCell>
                        <StyledTableCell align="right">Status&nbsp;(g)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.packageId}>
                                <StyledTableCell component="th" scope="row" className={classes.firstColoumn}>
                                    <Link to={`../package/${row.packageId}`}>
                                    {row.packageId}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.location}</StyledTableCell>
                                <StyledTableCell align="right">{row.edd}</StyledTableCell>
                                <StyledTableCell align="right"
                                    className={(row.status === "completed") ? classes.completedStyle : classes.pendingStyle }
                                >
                                    {row.status}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PackageTable;