import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {
  RegistrarColor,
  GetByIdColor,
  UpdateColor,
} from "../Http/RequestColor";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

const InsertColor = ({ Id, setChange, change }) => {
  const classes = useStyle();
  const [obj, setObj] = useState({ Id: 0, Name: "", HexColor: "" });
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const [msj, setMsj] = useState("");
  const [upd, setUpd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  async function GetColorByIdR($id) {
    console.log($id);
    if (Id !== undefined && Id !== 0) {
      setUpd(true);
      const { data } = await GetByIdColor($id);
      setObj((obj) => ({
        ...obj,
        Id: $id,
        Name: data.result.name,
        HexColor: data.result.hexColor,
      }));
    } else {
      setObj((obj) => ({
        ...obj,
        Id: 0,
        Name: "",
        HexColor: "",
      }));
    }
  }

  const ClearField = () => {
    setObj({
      Id: 0,
      Name: "",
      HexColor: "",
    });
    setUpd(true);
    setIsEdit(false);
  };

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
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        var { data } = await UpdateColor(values);

        if (change == true) {
          setChange(false);
        } else {
          setChange(true);
        }

        ClearField();
      } else {
        console.log(values);
        var { data } = await RegistrarColor(values);
        if (change == true) {
          setChange(false);
        } else {
          setChange(true);
        }
        ClearField();
      }

      if (data.statusCode === 200) {
        setResult("success");
        setMsj(
          `El producto se ${isEdit ? "Actualizo" : "Registro"} exitosamente`
        );
        handleClick();
      } else {
        setResult("Error");
        setMsj(
          `El producto no se ${isEdit ? "Actualizo" : "Registro"} exitosamente`
        );
        handleClick();
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    console.log(Id);
    if (Id !== undefined && Id !== 0) {
      GetColorByIdR(Id);
      setIsEdit(true);
    }
  }, [Id]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <div>
          <h1>Colores</h1>
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  name="Name"
                  id="Name"
                  label="Name"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.Name}
                />
                <TextField
                  name="HexColor"
                  id="HexColor"
                  label="HexColor"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.HexColor}
                />
              </Grid>
              <Grid item xs={6} md={8}>
                <Stack direction="row" spacing={2}>
                  <Button
                    disabled={!formik.isValid}
                    type="submit"
                    style={{ left: 6 }}
                    variant="contained"
                  >
                    {isEdit ? "Actualizar" : "Registrar"}
                  </Button>
                  {isEdit ? (
                    <Button
                      disabled={!formik.isValid}
                      //type="submit"
                      style={{ left: 6 }}
                      variant="contained"
                      onClick={() => ClearField()}
                    >
                      Limpiar
                    </Button>
                  ) : (
                    ""
                  )}
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

export default InsertColor;
