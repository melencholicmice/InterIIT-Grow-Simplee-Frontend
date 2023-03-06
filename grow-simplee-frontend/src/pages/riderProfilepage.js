import React, { useState } from 'react';
import HorizontalNavbar from '../components/HorizontalNavbar';
import SideBar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import RiderData from '../components/RiderData';
import RiderProfile from '../components/RiderPage/RiderProfile';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, 
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';
import ExpandableRow from '../components/PackagesPage/ExpandableRow';


const useStyles = makeStyles({
    contentWrapper:{
        display:"flex",
        flexDirection:"column",
        background: "#292929",
        width:"calc(100vw - 250px)"
    },
    mainPageWrapper:{
        display:"flex"
    },
    searchBar :{
        justifyContent:"center",
        alignItems:"center",
        border:"2px solid red",
    }
})

const RiderProfilePage = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <div >
            <HorizontalNavbar />
            <div className={classes.mainPageWrapper}>
                <SideBar />
                <div className={classes.contentWrapper}>
                    <div className={classes.searchBar}>
                    </div>
                    <RiderProfile/>
                </div>
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
                                    PACKEGE ID
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
                                props['data'].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                        count={props.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </TableContainer >
            </div >
            </div>
        </div>
    )

}

export default RiderProfilePage;
