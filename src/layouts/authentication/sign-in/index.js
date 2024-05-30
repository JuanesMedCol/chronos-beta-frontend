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
//const googleid = ".apps.googleusercontent.com";

//Login Service

export const LoginService = async (payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data },
      } = result;
      console.log(payload);
      return { data };
    } else if (success === false) {
      const message = "Error del servidor al realizar la solicitud";
      const status = false;
      return { status, message };
      //throw new Error(`Error del servidor al realizar la solicitud`);
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    const message = "Error del servidor al realizar la solicitud";
    const status = false;
    return { status, message };
  }
};

const submitLogin = async (e) => {
  e.preventDefault();
  await LoginService();
  console.log("hola");
};


function Basic() {

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
            Bienvenido a Chronos<br />
            - Sistema de Gestion de Tiempo -
          </MDTypography>
          {/*<Grid container justifyContent="center" sx={{ mt: 1, mb: 1, width: "100%" }}>
            <GoogleOAuthProvider justifyContent="center" sx={{ width: "100%" }} clientId={googleid}>
              <Google />
            </GoogleOAuthProvider>
          </Grid>*/}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={submitLogin}>
              <MDBox mb={2}>
                <MDInput type="email" label="Email" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="password" label="Password" fullWidth />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton type="submit" variant="gradient" color="success" fullWidth>
                  Ingresar
                </MDButton>
              </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
