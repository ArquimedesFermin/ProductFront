import react from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  root: {
   minHeight:61
  },
  logo:{
    height:20
  }
});

const Bar = () => {
  const classes = useStyle();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" className={classes.logo}>
            Products
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Bar;
