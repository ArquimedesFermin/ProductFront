import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { GetAllPag, DeleteProductType } from "../Http/RequestProductType";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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

const GridColor = ({ SetId, change }) => {
  const classes = useStyle();
  const [model, setModel] = useState([]);
  const [rows, setRows] = useState(5);
  const [idModel, setIdModel] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [pagination, setPagination] = useState({
    PageNumber: 1,
    PageSize: 5,
  });

  async function GetProductTypeP($pag) {
    const { data } = await GetAllPag($pag);
    console.log(data.result);
    setModel(data.result);
  }

  async function DeleteColor($id) {
    if ($id != 0) {
      await DeleteProductType($id);
      await GetProductTypeP(pagination);
    }
  }

  const handleDelete = ($id) => {
    setIdDelete($id);
  };

  const changeRows = (e) => {
    setRows(e.target.value);
    setPagination((row) => ({ ...row, PageSize: e.target.value }));
  };

  const handleChange = (event, value) => {
    setPagination((pagi) => ({ ...pagi, PageNumber: value }));
  };

  const SetValue = ($id) => {
    setIdModel($id);
  };

  useEffect(() => {
    GetProductTypeP(pagination);
  }, [pagination]);

  useEffect(() => {
    GetProductTypeP(pagination);
  }, [change]);

  useEffect(() => {
    SetId(idModel);
  }, [idModel]);

  useEffect(() => {
    DeleteColor(idDelete);
  }, [idDelete]);

  return (
    <Paper className={classes.pageContent}>
      <h1>Tipos de Productos</h1>
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
              <TableCell>{"Marca"}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {model.map((rows, key) => {
              return (
                <TableRow key={rows.id}>
                  <TableCell>{rows.name}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        SetValue(rows.id);
                      }}
                      aria-label="delete"
                      size="large"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        handleDelete(rows.id);
                      }}
                      aria-label="delete"
                      size="large"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
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
  );
};

export default GridColor;
