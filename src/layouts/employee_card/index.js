

import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { Container, Typography, Button, Box } from "@mui/material";
import { carnet } from "react-router-dom";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import imagen from "layouts/welcome/images/imagenn.jpg";
import brandWhite from "assets/images/logo-dark.svg";
import brandDark from "assets/images/logo-light.svg";

function Employee() {
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
        <Button size='small' variant='contained' sx={{ bgcolor: '#5d6770', color: '#000000', fontWeight: 'bold' }}>
          Marcar Entrada
        </Button>
        <br></br>
        <Button size='small' variant='contained' sx={{ bgcolor: '#5d6770', color: '#000000', fontWeight: 'bold' }}>
          Marcar Salida
        </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button size='small' variant='contained' sx={{  mr: 2, bgcolor: '#b9b9b9', color: '#000000', fontWeight: 'bold' }}>
          Reportes
        </Button>
        <br></br>
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
    </DashboardLayout>
  );
}

export default Employee;
