import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { RegisterMark, GetById, UpdateMark } from "../Http/RequestMark";
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

const InsertMark = ({ Id, setChange, change }) => {
  const classes = useStyle();
  const [obj, setObj] = useState({ Id: 0, Name: "" });
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const [msj, setMsj] = useState("");
  const [upd, setUpd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  async function GetMarkByIdR($id) {
    console.log($id);
    if (Id !== undefined && Id !== 0) {
      setUpd(true);
      const { data } = await GetById($id);
      setObj((obj) => ({
        ...obj,
        Id: $id,
        Name: data.result.name,
      }));
    } else {
      setObj((obj) => ({
        ...obj,
        Id: 0,
        Name: "",
      }));
    }
  }

  const ClearField = () => {
    setObj({
      Id: 0,
      Name: "",
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
        var { data } = await UpdateMark(values);

        if (change == true) {
          setChange(false);
        } else {
          setChange(true);
        }

        ClearField();
      } else {
        console.log(values);
        var { data } = await RegisterMark(values);
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
      GetMarkByIdR(Id);
      setIsEdit(true);
    }
  }, [Id]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <div>
          <h1>Marcas de productos</h1>
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

export default InsertMark;
