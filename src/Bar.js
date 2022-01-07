import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const useStyle = makeStyles({
  root: {
    minHeight: 61,
  },
  logo: {
    height: 20,
  },
});

const Bar = ({ setState }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setState(open);
  }, [open]);

  const OpenSideBar = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const classes = useStyle();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={OpenSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Prueba técnica de claro  
            </Typography>
            v1.0 
          </Toolbar>
        
        </AppBar>
      
      </Box>
    </div>
  );
};
export default Bar;
