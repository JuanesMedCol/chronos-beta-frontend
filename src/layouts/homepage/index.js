import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { Container, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

import {
  StatusService,
  HomeListService,
  HomeCreateService
} from "./services/HomepageService";

console.log(Date().toLocaleString().slice(0, 10))

function Homepage() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: selectedOption
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
     
      handleClose();
    })
    .catch((error) => {
      console.error('Error:', error);
     
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ marginTop: "64px", textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          ¡Bienvenido al sistema de gestion Chronos!
        </Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          "Valora cada minuto de tu jornada laboral, pues el tiempo bien empleado no solo impulsa nuestro progreso, sino que también nos acerca a nuestros objetivos con mayor eficiencia y satisfacción."
        </Typography>
        <Divider variant="middle" />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button size='small' variant='contained' sx={{ bgcolor: '#5d6770', color: '#000000', fontWeight: 'bold' }} onClick={handleClickOpen}>
            Marcar Entrada
          </Button>
          <Button size='small' variant='contained' sx={{ bgcolor: '#5d6770', color: '#000000', fontWeight: 'bold' }}>
            Marcar Salida
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button size='small' variant='contained' sx={{ mr: 2, bgcolor: '#b9b9b9', color: '#000000', fontWeight: 'bold' }}>
            Reportes
          </Button>
          <Button size='small' variant='contained' sx={{ bgcolor: '#b9b9b9', color: '#000000', fontWeight: 'bold'}}>
            Agregar cargos
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button size='small' variant='contained' sx={{ bgcolor: '#5d6770', color: '#000000', fontWeight: 'bold' }}>
            Agregar parada
          </Button>
        </Box>
      </div>
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
    </DashboardLayout>
  );
}

export default Homepage;
