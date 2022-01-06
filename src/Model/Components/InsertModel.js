import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {
  InsertModelR,
  GetModelById,
  UpdateModel,
  DeleteModel,
} from "../Http/RequestModel";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { GetMarkAll } from "../../Marks/Http/RequestMark";
import MenuItem from "@mui/material/MenuItem";

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

const InsertModel = ({ Id }) => {
  const classes = useStyle();
  const [obj, setObj] = useState({ Id: 0, Name: "", IdMark: 0 });
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState("");
  const [msj, setMsj] = useState("");
  const [mark, setMark] = useState([]);
  const [id, setId] = useState(0);
  const [upd, setUpd] = useState(false);

  async function GetMark() {
    const { data } = await GetMarkAll();
    setMark(data.result);
  }

  async function GetModelByIdR($id) {
    console.log($id);
    if (Id !== undefined && Id !== 0) {
      setUpd(true);
      const { data } = await GetModelById($id);
      setObj((obj) => ({
        ...obj,
        Id: $id,
        Name: data.result.name,
        IdMark: data.result.idMark,
      }));
    } else {
      setObj((obj) => ({
        ...obj,
        Id: 0,
        Name: "",
        IdMark: 1,
      }));
    }
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
      ...obj,
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Required"),
      IdMark: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      if (Id !== undefined && Id !== 0) {
        var { data } = await UpdateModel(values);
      } else {
        var { data } = await InsertModelR(values);
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
    GetMark();
  }, [""]);

  useEffect(() => {
    GetModelByIdR(Id);
  }, [Id]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <div>
          <h1>Modelos</h1>
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  name="Name"
                  id="Name"
                  label="Modelo"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.Name}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.IdMark}
                    label="Marca"
                    name="IdMark"
                    onChange={formik.handleChange}
                  >
                    {mark.map((rows, key) => {
                      return (
                        <MenuItem key={rows.id} value={rows.id}>
                          {rows.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={8}>
                <Stack direction="row" spacing={2}>
                  <Button
                    disabled={!formik.isValid}
                    type="submit"
                    style={{ left: 6 }}
                    variant="contained"
                  >
                    {Id !== undefined && Id !== 0 ? "Actualizar" : "Registrar"}
                  </Button>
                </Stack>
              </Grid>
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

export default InsertModel;
