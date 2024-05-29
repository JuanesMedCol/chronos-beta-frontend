/*
*/

import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Icon,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Typography,
  Card,
} from "@mui/material";
import colors from "assets/theme/base/colors";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export function RoleEdit({
  open,
  handleClose,
  datosRecuperados,
  datosEditados,
  isFormModified,
  isDisabled,
  getFieldValue,
  handleFieldChange,
  handleSubmit,
  handleRolePermitList,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <MDBox
          mt={-7}
          color="white"
          bgColor="dark"
          variant="gradient"
          borderRadius="lg"
          p={2}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography id="modal-modal-title" component="h2">
            Editando Rol: {getFieldValue("name")}
          </Typography>
          <Icon
            sx={{
              fontSize: "2em",
              stroke: "currentColor",
              strokeWidth: "2px",
              cursor: "pointer",
              marginLeft: "auto",
            }}
            onClick={handleClose}
          >
            close
          </Icon>
        </MDBox>
        <Divider variant="middle" />
        <form onSubmit={handleSubmit}>
          <Box>
            <MDBox
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <MDBox style={{ width: "50%" }}>
                <Typography
                  id="modal-modal-title"
                  component="h5"
                  style={{ marginTop: "5px", width: "50%" }}
                >
                  Ajustes Rol
                </Typography>
                <MDInput
                  disabled={isDisabled}
                  style={{ marginTop: "5px", width: "100%" }}
                  label="Nombre"
                  value={getFieldValue("name")}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />
                <MDInput
                  disabled={isDisabled}
                  style={{ marginTop: "15px", width: "100%" }}
                  label="Descripcion"
                  value={getFieldValue("description")}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                />
              </MDBox>
              {/*<MDBox style={{ marginLeft: 15, width: "50%" }}>
                <Typography
                  id="modal-modal-title"
                  component="h5"
                  style={{ marginTop: "5px", width: "50%" }}
                >
                  Permisos
                </Typography>

                {handleRolePermitList &&
                  handleRolePermitList.map(([category, permits]) => (
                    <div key={category}>
                      <Typography
                        sx={{
                          display: "inline",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {category}
                      </Typography>
                      <ul>
                        {permits &&
                          permits.map(([label, value]) => (
                            <Box key={value} sx={{ py: -1 }}>
                              <Checkbox
                                sx={{ py: -1 }}
                                id={value}
                                name="permissions"
                                value={value}
                              />
                              <Typography
                                sx={{
                                  display: "inline",
                                  fontSize: 16,
                                }}
                                htmlFor={value}
                              >
                                {label}
                              </Typography>
                            </Box>
                          ))}
                      </ul>
                    </div>
                  ))}
                              </MDBox>*/}
            </MDBox>
          </Box>
          <Divider variant="middle" />
          <MDBox
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
            m={-0.5}
            mb={-2}
          >
            <MDButton color="error" onClick={handleClose}>
              Cancelar
            </MDButton>
            <MDButton
              type="submit"
              onClick={handleSubmit}
              disabled={isDisabled || !isFormModified}
              color="success"
            >
              Guardar
            </MDButton>
          </MDBox>
        </form>
      </Card>
    </Modal>
  );
}

RoleEdit.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  datosRecuperados: PropTypes.object,
  isDisabled: PropTypes.bool,
  datosEditados: PropTypes.object,
  getFieldValue: PropTypes.func,
  handleFieldChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isFormModified: PropTypes.bool,
  handleRolePermitList: PropTypes.any,
};
