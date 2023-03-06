import React, { useEffect, useState } from 'react'
import HorizontalNavbar from '../HorizontalNavbar';
import {
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    makeStyles,
    TextField,
} from '@material-ui/core';
import TablePagination from '@mui/material/TablePagination';

const useStyles = makeStyles({
    wrapper:{
        padding:"20px",
        width:"calc(100vw - 310px)",
    },
    tableWrapper:{
      overflow:"scroll",
      maxHeight:"500px"
    },
    searchBarWrapper:{
        paddingBottom:"10px"
    },
    container:{
        borderRadius:"8px",
        marginTop:"20px",
        backgroundColor:"#CCCDCD"
    },
    tableHeader:{
        backgroundColor: "#343434",
        color: "#FFF",
        width: "calc(100vw - 310px)",

    }

});

function RiderPageTable(props) {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [search , setSearch] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.searchBarWrapper}>
                <TextField
                  fullWidth
                  id="search"
                  label="Search"
                  type="search"
                  value={search}
                  onChange={handleChange}
                  variant="outlined"
                  size='small'
                  inputProps={{
                    style: {
                      width: "70%",
                    },}}
                />
                </div>
                <div className={classes.tableWrapper}>
                    <TableContainer component={Paper} stickyHeader>
                        <Table stickyHeader="true" className={classes.table}>

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

                            {/* <TableBody>
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
                            </TableBody> */}
                        </Table >
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={props.data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer >
                </div>
        </div>
        </div>
    )
}

export default RiderPageTable;