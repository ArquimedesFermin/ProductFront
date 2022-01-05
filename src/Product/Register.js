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
import { RegisterProduct, GetAll } from "./Http/Request";
import { useFormik } from "formik";

const useStyle = makeStyles({
  root: {
    "& .MuiFormControl-root": {
      width: "98%",
      margin: 6,
    },
  },
});

const Register = () => {
  const classes = useStyle();

  useEffect(() => {
    getAll();
  }, [""]);

  async function getAll() {
    var product = await GetAll();
    console.log(product);
  }
  const formik = useFormik({
    initialValues: {
      Name: "",
      TypeProduct: "",
      Color: "",
      Model: "",
      Price: 0.0,
      Stock: 0,
      Description: "",
    },
    onSubmit: async (values) => {
      var { data } = await RegisterProduct(values);
    },
  });

  return (
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
                <MenuItem value={"Calzado"}>Calzado</MenuItem>
                <MenuItem value={"Embutidos"}>Embutidos</MenuItem>
                <MenuItem value={"Electronicos"}>Electronicos</MenuItem>
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
                <MenuItem value={"Azul"}>Azul</MenuItem>
                <MenuItem value={"Rojo"}>Rojo</MenuItem>
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
                <MenuItem value={"Air Force"}>Air Force</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
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
          <Button type="submit" style={{ left: 6 }} variant="contained">
            Registrar
          </Button>
        </Grid>
      </form>
    </div>
  );
};
export default Register;
