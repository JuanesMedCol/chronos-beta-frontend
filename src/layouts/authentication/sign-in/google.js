/**
=========================================================
Archivo para el login con Google
=========================================================
*
* La configuración se debe realizar en https://console.cloud.google.com/
* Usar el email: ellyn.vasquez@iudigital.edu.co
*/

import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import MDAlert from "components/MDAlert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
//import { useAuth } from "../../../context/index";

const google = () => {
  const Navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  //const { token, login, logout } = useAuth();

  const handleAlertClick = () => {
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleDialogClose = () => {
    closeAlert();
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const googleApiUrl =
            "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
            credentialResponse.credential;

          fetch(googleApiUrl)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Error en la solicitud a la API de Google");
              }
            })
            .then(async (userData) => {
              const email = userData.email;

              const url = process.env.REACT_APP_API_URL;
              try {
                const response = await fetch(
                  process.env.REACT_APP_BASE_URL + "/users/login?email=" + email
                );
                const dataResponse = await response.json();

                if (dataResponse.success === true) {
                  //const {
                  //payload: { token },
                  //} = dataResponse;
                  //console.log(token);
                  //login(token);
                  Navigate("/bienvenida");
                } else {
                  // Usuario no autorizado, mostrar la alerta
                  handleAlertClick();
                }
              } catch (error) {
                console.error("Error al obtener datos:", error);
              }
            })
            .catch((error) => {
              console.error("Error al obtener información del usuario:", error);
            });
        }}
        onError={() => {
          console.log("Verifique sus credenciales de Gmail");
        }}
      />

      <Dialog open={showAlert} onClose={handleDialogClose}>
        <DialogTitle
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            backgroundColor: "#007BFF",
            color: "#FFF",
          }}
        >
          ¡¡No estás autorizado para ingresar!!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              marginTop: "8px",
              backgroundColor: "#FFF",
              color: "#000",
            }}
          >
            <Icon fontSize="small"></Icon>&nbsp; Por favor verifica tu dirección de correo
            electrónico que sea con el correo de la IU Digital
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleDialogClose}
            color="primary"
            style={{ backgroundColor: "#007BFF", color: "#FFF" }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default google;
