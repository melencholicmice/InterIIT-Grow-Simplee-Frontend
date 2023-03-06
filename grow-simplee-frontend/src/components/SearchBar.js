import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
  wrapper:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center",
    marginBottom:"30px"
  },
  searchBarWrapper : {
      margin:"auto",
      minWidth:"500px",
      width : "70%",
      display:"flex"
    },
    title:{
      display:"flex",
      flexDirection:"column"
    },
    pageTitle:{
      fontSize:"24px",
      fontWeight:"600",
    },
    pageSubTitle:{
      fontSize:"16px",
      fontWeight:"600",
      color: "#71717A",

    },
});

const useStyles = makeStyles(styles);
const SearchBar = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
    <div className={classes.title}>
      <h1 className={classes.pageTitle}>{props.title}</h1>
      <p className={classes.pageSubTitle}>{props.subtext}</p>
    </div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.searchBarWrapper}>
          <TextField
            fullWidth
            id="search"
            label="Search"
            type="search"
            value={searchValue}
            onChange={handleChange}
            variant="outlined"
            size='small'
            inputProps={{
              style: {
                width: "70%",
              },}}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;