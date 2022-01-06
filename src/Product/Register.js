import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import {
  RegisterProduct,
  GetUpdate,
  UpdateProduct,
  DeleteProduct,
} from "./Http/RequestProduct";
import { useFormik } from "formik";
import Paper from "@mui/material/Paper";
import { GetColorAll } from "../Color/Http/RequestColor";
import { GetModelAll } from "../Model/Http/RequestModel";
import { GetProductoTypeAll } from "../ProductType/Http/RequestProductType";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyle = makeStyles({
  root: {
    "& .MuiFormControl-root": {
      width: "98%",
      margin: 6,
    },
  },
  pageContent: {
    margin: 40,
    padding: 24,
  },
});

const Register = ({}) => {
  const classes = useStyle();
  const [color, setColor] = useState([]);
  const [model, setModel] = useState([]);
  const [upd, setUpd] = useState(false);
  const [objProduct, setObjProduct] = useState({
    Name: "",
    TypeProduct: "",
    Color: "",
    Model: "",
    Price: 0.0,
    Stock: 0,
    Description: "",
  });
  const [productoType, setProductoType] = useState([]);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const [msj, setMsj] = useState("");
  const paramns = useParams();
  let navigate = useNavigate();

  async function GetColor() {
    var { data } = await GetColorAll();
    setColor(data.result);
  }

  async function GetModel() {
    var { data } = await GetModelAll();
    setModel(data.result);
  }

  async function DeleteP() {
    var { data } = await DeleteProduct(paramns.IdProducto);
    navigate("/");
  }

  async function GetUpdateProduct($id) {
    if (paramns.IdProducto !== undefined) {
      setUpd(true);
      var { data } = await GetUpdate($id);
      setObjProduct((obj) => ({
        ...obj,
        Color: data.result.color,
        Description: data.result.description,
        Model: data.result.model,
        Name: data.result.name,
        Price: data.result.price,
        Stock: data.result.stock,
        TypeProduct: data.result.typeProduct,
      }));
    } else {
      setObjProduct((obj) => ({
        ...obj,
        Color: "",
        Description: "",
        Model: "",
        Name: "",
        Price: "",
        Stock: "",
        TypeProduct: "",
      }));
    }
  }

  async function GetProductoType() {
    var { data } = await GetProductoTypeAll();
    setProductoType(data.result);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const formik = useFormik({
    enableReinitialize: upd,
    initialValues: {
      ...objProduct,
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Required"),
      TypeProduct: Yup.string().required("Required"),
      Color: Yup.string().required("Required"),
      Model: Yup.string().required("Required"),
      Price: Yup.number().required("Required"),
      Stock: Yup.number().required("Required"),
      Description: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (paramns.IdProducto !== undefined) {
        var { data } = await UpdateProduct(paramns.IdProducto, values);
        setUpd(false);
        navigate("/");
      } else {
        var { data } = await RegisterProduct(values);
      }

      if (data.statusCode === 200) {
        setResult("success");
        setMsj("El producto se registro exitosamente");
        handleClick();
      } else {
        setResult("Error");
        setMsj("El producto no se registro exitosamente");
        handleClick();
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    GetColor();
    GetModel();
    GetProductoType();
  }, [""]);

  useEffect(() => {
    GetUpdateProduct(paramns.IdProducto);
  }, [paramns.IdProducto]);

  useEffect(() => {
    GetUpdateProduct(paramns.IdProducto);
  }, [upd]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <div>
          <h1>Productos</h1>
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  name="Name"
                  id="Name"
                  label="Producto"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.Name}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de producto
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.TypeProduct}
                    label="Tipo de producto"
                    name="TypeProduct"
                    onChange={formik.handleChange}
                  >
                    {productoType.map((rows, key) => {
                      return (
                        <MenuItem key={rows.id} value={rows.name}>
                          {rows.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Color</InputLabel>
                  <Select
                    name="Color"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.Color}
                    label="Color"
                    onChange={formik.handleChange}
                  >
                    {color.map((rows, key) => {
                      return (
                        <MenuItem key={rows.id} value={rows.nameColor}>
                          {rows.nameColor}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Modelos</InputLabel>
                  <Select
                    name="Model"
                    labelId="demo-simple-select-label"
                    label="Model"
                    id="demo-simple-select"
                    value={formik.values.Model}
                    label="Modelos"
                    onChange={formik.handleChange}
                  >
                    {model.map((rows, key) => {
                      return (
                        <MenuItem key={rows.id} value={rows.name}>
                          {rows.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">
                    Price
                  </InputLabel>
                  <FilledInput
                    name="Price"
                    id="filled-adornment-amount"
                    value={formik.values.Price}
                    onChange={formik.handleChange}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
                <TextField
                  id="filled-basic"
                  label="Cant. Existencia"
                  variant="filled"
                  name="Stock"
                  value={formik.values.Stock}
                  onChange={formik.handleChange}
                />
                <TextField
                  id="filled-basic"
                  multiline
                  label="Descripción"
                  name="Description"
                  rows={3.9}
                  variant="filled"
                  value={formik.values.Description}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} md={8}>
              <Stack direction="row" spacing={2}>
                <Button
                  disabled={!formik.isValid}
                  type="submit"
                  style={{ left: 6 }}
                  variant="contained"
                >
                  {paramns.IdProducto === undefined
                    ? "Registrar"
                    : "Actualizar"}
                </Button>

                {paramns.IdProducto !== undefined ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    onClick={DeleteP}
                  >
                    Eliminar
                  </Button>
                ) : (
                  ""
                )}
              </Stack>
            </Grid>
          </form>
        </div>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={result} sx={{ width: "100%" }}>
          {msj}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Register;