import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const SideBar = ({ open }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(open);
  }, [open]);

  const list = () => (
    <Box role="presentation" style={{ width: 254 }}>
      <List>
        <div>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            Productos
          </Typography>
        </div>
        <ListItem to="/" button component={Link}>
          Lista de productos
        </ListItem>
        <ListItem to="/RegistrarProducto" button component={Link}>
          Registrar
        </ListItem>
      </List>
      <Divider />
      <div>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            Configuraciones
          </Typography>
        </div>
        <ListItem to="/Color" button component={Link}>
          Color
        </ListItem>
        <ListItem to="/Mark" button component={Link}>
          Marcas de productos
        </ListItem>
        <ListItem to="/Model" button component={Link}>
          Modelos de productos
        </ListItem>
        <ListItem to="/ProductType" button component={Link}>
          Tipos de productos
        </ListItem>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          onClick={() => {
            setState(false);
          }}
          open={state}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SideBar;
