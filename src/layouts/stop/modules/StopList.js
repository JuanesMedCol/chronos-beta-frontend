/*
*/
import { Pagination, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function StopList({
  dataStopList,
  error,
  pageIndexAndPageSize,
  entriesStart,
  entriesEnd,
  totalData,
  totalPages,
  currentPage,
  handlePageChange,
  
}) {

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false);};
  const handleSelectChange = (event) => {setSelectedOption(event.target.value);};

  const handleClickOpen1 = () => {setOpen1(true);};
  const handleClose1 = () => {setOpen1(false);};
  const handleSelectChange1 = (event) => {setSelectedOption(event.target.value);};

  const handleClickOpen2 = () => {setOpen2(true);};
  const handleClose2 = () => {setOpen2(false);};
  const handleSelectChange2 = (event) => {setSelectedOption(event.target.value);};

  return (
    <>
    <Box sx={{ display: 'flex', gap: 1, mt: 2, ml: 3 }}>
          <Button size='small' variant='contained' sx={{ bgcolor: '#5d6770', color: '#000000', fontWeight: 'bold' }} onClick={handleClickOpen}>
            Marcar Patada
          </Button>
          <Button size='small' variant='contained' sx={{ bgcolor: '#5d6770', color: '#000000', fontWeight: 'bold' }} onClick={handleClickOpen1}>
            Actualizar Parada
          </Button>
          <Button size='small' variant='contained' sx={{ bgcolor: '#5d6770', color: '#000000', fontWeight: 'bold' }} onClick={handleClickOpen2}>
            Marcar tiempo
          </Button>
        </Box>
    <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Actualizar Parada</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Select
              labelId="select-label"
              value={selectedOption}
              onChange={handleSelectChange1}
            >
              <MenuItem value={1}>El empleado tendra un descanso corto</MenuItem>
              <MenuItem value={2}>El empleado estará en su hora de almuerzo</MenuItem>
              <MenuItem value={3}>El empleado estara en formación o retroalimentación</MenuItem>
              <MenuItem value={4}>El empleado tomara una pausa activa</MenuItem>
              <MenuItem value={5}>El empleado hara una ida al baño</MenuItem>
            </Select>
          </FormControl>
          {/*<FormControl sx={{ minWidth: 80 }}> 
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  style={{ fontSize: "15px", padding: "10px" }}
                  displayEmpty
                >
                  <MenuItem value={""}>Seleccione...</MenuItem>
                  {console.log(StatusService)}
                  {(StatusService ?? []).map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.description}
                    </MenuItem>
                    
                  ))}
                </Select>
              </FormControl>*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancelar</Button>
          <Button onClick={handleClose1} variant='contained' color='primary'>Aceptar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Tiempos</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Select
              labelId="select-label"
              value={selectedOption}
              onChange={handleSelectChange2}
            >
              <MenuItem value={1}>El empleado tendra un descanso corto</MenuItem>
              <MenuItem value={2}>El empleado estará en su hora de almuerzo</MenuItem>
              <MenuItem value={3}>El empleado estara en formación o retroalimentación</MenuItem>
              <MenuItem value={4}>El empleado tomara una pausa activa</MenuItem>
              <MenuItem value={5}>El empleado hara una ida al baño</MenuItem>
            </Select>
          </FormControl>
          {/*<FormControl sx={{ minWidth: 80 }}> 
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  style={{ fontSize: "15px", padding: "10px" }}
                  displayEmpty
                >
                  <MenuItem value={""}>Seleccione...</MenuItem>
                  {console.log(StatusService)}
                  {(StatusService ?? []).map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.description}
                    </MenuItem>
                    
                  ))}
                </Select>
              </FormControl>*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancelar</Button>
          <Button onClick={handleClose1} variant='contained' color='primary'>Aceptar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose2}>
        <DialogTitle>Marcar Patada</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Select
              labelId="select-label"
              value={selectedOption}
              onChange={handleSelectChange2}
            >
              <MenuItem value={1}>El empleado tendra un descanso corto</MenuItem>
              <MenuItem value={2}>El empleado estará en su hora de almuerzo</MenuItem>
              <MenuItem value={3}>El empleado estara en formación o retroalimentación</MenuItem>
              <MenuItem value={4}>El empleado tomara una pausa activa</MenuItem>
              <MenuItem value={5}>El empleado hara una ida al baño</MenuItem>
            </Select>
          </FormControl>
          {/*<FormControl sx={{ minWidth: 80 }}> 
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  style={{ fontSize: "15px", padding: "10px" }}
                  displayEmpty
                >
                  <MenuItem value={""}>Seleccione...</MenuItem>
                  {console.log(StatusService)}
                  {(StatusService ?? []).map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.description}
                    </MenuItem>
                    
                  ))}
                </Select>
              </FormControl>*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancelar</Button>
          <Button onClick={handleClose2} variant='contained' color='primary'>Aceptar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Marcar Entrada</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Select
              labelId="select-label"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <MenuItem value={1}>El empleado tendra un descanso corto</MenuItem>
              <MenuItem value={2}>El empleado estará en su hora de almuerzo</MenuItem>
              <MenuItem value={3}>El empleado estara en formación o retroalimentación</MenuItem>
              <MenuItem value={4}>El empleado tomara una pausa activa</MenuItem>
              <MenuItem value={5}>El empleado hara una ida al baño</MenuItem>
            </Select>
          </FormControl>
          {/*<FormControl sx={{ minWidth: 80 }}> 
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  style={{ fontSize: "15px", padding: "10px" }}
                  displayEmpty
                >
                  <MenuItem value={""}>Seleccione...</MenuItem>
                  {console.log(StatusService)}
                  {(StatusService ?? []).map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.description}
                    </MenuItem>
                    
                  ))}
                </Select>
              </FormControl>*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose} variant='contained' color='primary'>Aceptar</Button>
        </DialogActions>
      </Dialog>

      <DataTable
        table={{
          columns: [
            { Header: "employee", accessor: "employee_id", width: "25%" },
            { Header: "estado", accessor: "status_id", width: "25%" },
            { Header: "inicio", accessor: "start_date", width: "12%" },
            { Header: "fin", accessor: "end_date", width: "12%" },
          ],
          rows: dataStopList
            ? dataStopList.map((stop) => {
                return {
                id: stop.id,
                  employee_id: stop.employee_id,
                  status_id: stop.status_id,
                  start_date: new Date(stop.start_date).toISOString().slice(0, 10),
                  end_date: null ? new Date(stop.end_date).toISOString().slice(0, 10) : '',
                  create_at: new Date(stop.created_at).toISOString().slice(0, 10),
                  updated_at: new Date(stop.updated_at).toISOString().slice(0, 10),
                };
              })
            : [],
        }}
        pageIndexAndPageSize={pageIndexAndPageSize}
        canSearch={false}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
      />
      {error ? (
        <MDBox style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MDTypography
            style={{ left: "20px", fontSize: "20px" }}
            variant="button"
            color="secondary"
            fontWeight="regular"
          >
            {error}
          </MDTypography>
        </MDBox>
      ) : dataStopList?.length === 0 || !dataStopList ? (
        <MDBox style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MDTypography
            style={{ left: "20px", fontSize: "20px" }}
            variant="button"
            color="secondary"
            fontWeight="regular"
          >
            No hay datos
          </MDTypography>
        </MDBox>
      ) : (
        <>
          <MDBox style={{ marginLeft: "20px" }} mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              style={{ left: "20px" }}
              variant="button"
              color="secondary"
              fontWeight="regular"
            >
              Mostrando {entriesStart} hasta {entriesEnd} de {totalData} resultados en total
            </MDTypography>
          </MDBox>
          <Stack style={{ marginLeft: "20px", marginBottom: "10px" }} spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            ></Pagination>
          </Stack>{" "}
        </>
      )}
    </>
  );
}
