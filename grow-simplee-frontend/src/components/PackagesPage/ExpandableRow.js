import React, { useState } from 'react'
import {
    IconButton,
    TableCell,
    TableRow,
    makeStyles
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';


const useStyles = makeStyles({
    oddRowStyles: {
        backgroundColor: "#FFFFFF",
    },
    evenRowStyles: {
        backgroundColor: "#E5E5E5",
    },
    redBorder: {
        margin: "8px",
        fontColor:"#000000",
        height: "100px",
        padding:"50px 50px",
        background: "#CCCDCD",
        backgroundClip:"content-box",
    }
})

function ExpandableRow(props) {
    console.log(props);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [parcel, setParcel] = useState({});

    const handleclick = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/get?id=${props.data.id}`,{withCredentials:true});
        console.log(res.data);
        setParcel(res.data);
        setOpen(!open);
    }

    return (
        <>
            <TableRow className={props.clr ? classes.oddRowStyles : classes.evenRowStyles}>
                <TableCell width="25%">
                    <IconButton size='small' onClick={() => handleclick()}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {props.data.product.SKU}
                </TableCell>
                <TableCell width="40%">
                    {props.data.delivery.customer.address}
                </TableCell>
                <TableCell width="20%">
                    {props.data.delivery.EDD}
                </TableCell>
                <TableCell width="15%">
                    {!props.data.shipped ? "In Transit" : "Delivered"}
                </TableCell>
            </TableRow>
            {open ?
                <TableRow  className={classes.redBorder}>
                    <TableCell width="25%">
                        <div>
                            <p>Name : {parcel.package.product.name}</p>
                            <p>Rider Id : {parcel.package.delivery.riderId}</p>
                            <p>Mass : {parcel.package.weight} KGs</p>
                        </div>
                    </TableCell>
                    <TableCell width="40%">
                        <p>Address : {parcel.package.delivery.customer.address}</p>
                    </TableCell>
                    <TableCell width="20%">
                        <div>
                            <p>Length : {parcel.package.length}</p>
                            <p>Height : {parcel.package.height}</p>
                            <p>Width : {parcel.package.breadth} </p>
                        </div>
                    </TableCell>
                    <TableCell width="15%">
                        {!props.data.shipped ? "In Transit" : "Delivered"}
                    </TableCell>
                </TableRow>
                : <></>}

        </>
    )
}

export default ExpandableRow