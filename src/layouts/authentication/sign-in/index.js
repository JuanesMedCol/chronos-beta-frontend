// @mui material components
import Card from "@mui/material/Card";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/login.jpg";

// Login Service
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
    console.log(payload);
    const { success } = result;
    if (success === true) {
      const { data } = result;
      console.log(data);
      return { success: true, data };
    } else {
      const message = "Usuario no registrado";
      return { success: false, message };
    }
  } catch (error) {
    const message = "El servidor se encuentra en mantenimiento";
    return { success: false, message };
  }
};

const submitLogin = (navigate, setError) => async (e) => {
  e.preventDefault();
  const data = {
    email: e.target.elements.email.value.toString(),
    password: e.target.elements.password.value.toString(),
  };
  const response = await LoginService(data);
  if (response.success) {
    navigate("/bienvenida"); // Cambia la ruta a donde desees redirigir
  } else {
    setError(response.message);
  }
};

function Basic() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

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
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={submitLogin(navigate, setError)}>
            <MDBox mb={2}>
              <MDInput type="email" name="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" name="password" label="Password" fullWidth />
            </MDBox>
            {error && (
              <MDBox mb={2}>
                <MDTypography variant="caption" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}
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