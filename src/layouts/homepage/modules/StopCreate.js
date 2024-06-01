import React, { useState, useEffect } from "react";
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
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";
import { RoleListService } from "layouts/role/services/RoleService";

export function StopCreate({
  open,
  handleClose,
  isDisabled,
  getFieldValue,
  handleFieldChange,
  handleSubmit,
}) {
  const [isFormModified, setIsFormModified] = useState(false);

  const [editedData, setEditedData] = useState({
    employee_id: "string",
    status_id: "string",
    start_date: Date().toLocaleString(),
    end_date: "string",
  });

  const [newData, setNewData] = useState({
    employee_id: "string",
    status_id: "string",
    start_date: Date().toLocaleString('es-CO'),
    end_date: "string",
  });

  const [handleRoleList, setRoleList] = useState([]);

  const requestRoleList = async (pageIndex) => {
    const result = await RoleListService(pageIndex);
    if (result && result.payload) {
      const { payload } = result;
      const roleArray = Object.entries(payload.data);
      console.log("si llega", payload.data);
      setRoleList(payload.data);
    }
  };

  useEffect(() => {
    requestRoleList();
  }, []);

  useEffect(() => {
    const hasFormChanged = Object.keys(editedData).some((key) => editedData[key] !== newData[key]);

    const isAnyFieldEmpty = Object.values(editedData).some((value) => !value);

    setIsFormModified(!isAnyFieldEmpty && hasFormChanged);
    console.log(!isAnyFieldEmpty && hasFormChanged);
  }, [editedData, newData]);

  useEffect(() => {
    const requiredFields = ["employee_id", "status_id"];
    const someFieldIsEmpty = requiredFields.some((fieldName) => !editedData[fieldName]);
    setIsFormModified(someFieldIsEmpty);
  }, [editedData]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "400px",
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
          bgColor="info"
          variant="gradient"
          borderRadius="lg"
          p={2}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography id="modal-modal-title" component="h2">
            Crear nueva parada
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
        <Typography id="modal-modal-title" variant="h5" component="h2">
          usuario id
        </Typography>
        <MDInput
          disabled={isDisabled}
          style={{ marginTop: "5px" }}
          label=""
          value={getFieldValue("employee_id")}
          onChange={(e) => handleFieldChange("employee_id", e.target.value)}
        />
        <br />
        <Divider variant="middle" />
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="flex-start">
            <Box sx={{ marginRight: "20px" }}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Rol
              </Typography>
              <FormControl sx={{ minWidth: 80 }}>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={getFieldValue("status_id")}
                  onChange={(e) => handleFieldChange("status_id", e.target.value)}
                  style={{ fontSize: "15px", padding: "10px" }}
                  disabled={isDisabled}
                  displayEmpty
                >
                  <MenuItem value={""}>Seleccione...</MenuItem>
                  {console.log(handleStatusList)}
                  {(handleStatusList ?? []).map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider variant="middle" />
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <MDButton onClick={handleClose}>Cancelar</MDButton>
            <MDButton type="submit" disabled={isDisabled || isFormModified} color="success">
              Crear
            </MDButton>
          </Box>
        </form>
      </Card>
    </Modal>
  );
}

StopCreate.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  isDisabled: PropTypes.bool,
  getFieldValue: PropTypes.func,
  handleFieldChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
