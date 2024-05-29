/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/login.jpg";

// Para el login con Google
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./google";
const googleid = "729422153813-ihs2v5sduv9i2ulu78kp9edk21u0lcpr.apps.googleusercontent.com";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          dark
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="light" mt={1}>
            Bienvenido a Chronos<br/>
             - Sistema de Gestion de Tiempo -
          </MDTypography>
          <Grid container justifyContent="center" sx={{ mt: 1, mb: 1, width: "100%" }}>
            <GoogleOAuthProvider justifyContent="center" sx={{ width: "100%" }} clientId={googleid}>
              <Google />
            </GoogleOAuthProvider>
          </Grid>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
