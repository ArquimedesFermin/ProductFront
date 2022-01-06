import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { GetAll, GetDetailPrice } from "./Http/Request";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GetColorAll } from "../Color/Http/Request";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const useStyle = makeStyles({
  pageContent: {
    margin: 40,
    padding: 24,
  },
  model: {
    margin: 17,
    padding: 24,
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "570px",
  height: "271px",
  borderRadius: "9px 9px 9px 9px",
  boxShadow: 24,
  p: 4,
};

const Grid = () => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [rows, setRows] = useState(2);
  const [color, setColor] = useState([]);
  const [mjs, setMsj] = useState("");
  const [detailRequest, setDetailRequest] = useState({
    Color: "",
    Model: "",
  });
  const [detail, setDetail] = useState({
    price: 0,
    stock: 0,
    color: "",
    colorHex: "",
  });
  const [pagination, setPagination] = useState({
    PageNumber: 1,
    PageSize: 2,
  });

  async function GetProduct($pag) {
    const { data } = await GetAll($pag);
    setProduct(data.result);
  }

  async function GetColor() {
    const { data } = await GetColorAll();
    setColor(data.result);
  }

  async function GetDColor($detailPrice) {
    console.log($detailPrice);
    if ($detailPrice.Model !== "" && $detailPrice.Color !== "") {
      const { data } = await GetDetailPrice($detailPrice);
      console.log(data.result);
      if (data.result !== null) {
        setDetail(data.result);
      } else {
        setMsj(undefined);
      }
    }
  }

  const handleChange = (event, value) => {
    setPagination((pagi) => ({ ...pagi, PageNumber: value }));
  };

  const changeRows = (e) => {
    setRows(e.target.value);
    setPagination((row) => ({ ...row, PageSize: e.target.value }));
  };

  function ChangesValueRadioBtn(e) {
    setMsj("");
    setDetailRequest((obj) => ({ ...obj, Color: e.target.value }));
  }

  const handleOpen = ($model) => {
    setDetailRequest((obj) => ({ ...obj, Model: $model }));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    GetProduct(pagination);
  }, [pagination]);

  useEffect(() => {
    GetDColor(detailRequest);
  }, [detailRequest]);

  useEffect(() => {
    GetColor();
  }, [""]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ fontFamily: "system-ui" }}>
            {mjs === undefined ? (
              <h6 style={{ position: "absolute", top: 159 }}>Color agotado</h6>
            ) : (
              <div></div>
            )}
            {detailRequest.Color === "" ? (
              <h6 style={{ position: "absolute", top: 159 }}>
                Por favor, seleccione un color
              </h6>
            ) : (
              <div></div>
            )}
            <Paper elevation={1} className={classes.model}>
              <Typography variant="h6" gutterBottom component="div">
                Precio: ${detail.price}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Cantidad: {detail.stock}
              </Typography>
            </Paper>
            <div
              style={{
                background: detail.colorHex,
                width: 63,
                height: 38,
                borderRadius: "22px 22px 22px 22px",
                marginTop: 34,
              }}
            ></div>

            <hr style={{ marginTop: 13 }}></hr>
            <FormControl component="fieldset">
              <RadioGroup row name="row-radio-buttons-group">
                {color.map((rows, key) => {
                  return (
                    <div key={rows.id}>
                      <FormControlLabel
                        value={rows.nameColor}
                        control={<Radio />}
                        label={rows.nameColor}
                        onChange={ChangesValueRadioBtn}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
        </Box>
      </Modal>
      <Paper className={classes.pageContent}>
        <h1>Listas Productos</h1>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Rows</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={rows}
            onChange={changeRows}
            autoWidth
            label="Rows"
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{"Model"}</TableCell>
                <TableCell>{"Product"}</TableCell>
                <TableCell>{"Descrición"}</TableCell>
                <TableCell>{"Precio"}</TableCell>
                <TableCell>{"Tipo de producto"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.map((rows, key) => {
                return (
                  <TableRow
                    key={rows.id}
                    hover
                    onClick={() => {
                      handleOpen(rows.model);
                    }}
                  >
                    <TableCell>{rows.model}</TableCell>
                    <TableCell>{rows.name}</TableCell>
                    <TableCell>{rows.description}</TableCell>
                    <TableCell>{rows.price}</TableCell>
                    <TableCell>{rows.typeProduct}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            marginTop: 13,
          }}
        >
          <Pagination
            count={50}
            page={pagination.PageNumber}
            onChange={handleChange}
          />
        </div>
      </Paper>
    </div>
  );
};

export default Grid;
