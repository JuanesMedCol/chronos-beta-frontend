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
import { useEffect, useState } from "react";
import { RoleListService } from "layouts/role/services/RoleService";

export function UserEdit({
  open,
  handleClose,
  datosRecuperados,
  datosEditados,
  isFormModified,
  isDisabled,
  getFieldValue,
  handleFieldChange,
  handleSubmit,
  listRoles,
}) {
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

  // List Role Controllers

  const [handleRoleList, setRoleList] = useState();

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
            Editando Usuario: {getFieldValue("name")}
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
          Nombre
        </Typography>
        <MDInput
          disabled={isDisabled}
          style={{ marginTop: "5px" }}
          label=""
          value={getFieldValue("name")}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        <br />
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Apellidos
        </Typography>
        <MDInput
          disabled={isDisabled}
          style={{ marginTop: "5px" }}
          label="Apellidos"
          value={getFieldValue("lastname")}
          onChange={(e) => handleFieldChange("lastname", e.target.value)}
        />
        <br />
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Email
        </Typography>
        <MDInput
          disabled={isDisabled}
          style={{ marginTop: "6px" }}
          label="Email"
          value={getFieldValue("email")}
          onChange={(e) => handleFieldChange("email", e.target.value)}
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
                  value={getFieldValue("role_id")}
                  onChange={(e) => handleFieldChange("role_id", e.target.value)}
                  style={{ fontSize: "15px", padding: "10px" }}
                  disabled={isDisabled}
                  displayEmpty
                >
                  <MenuItem value={""}>Seleccione...</MenuItem>
                  {console.log(handleRoleList)}
                  {(handleRoleList ?? []).map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Estado
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={getFieldValue("status")}
                  onChange={(e) => handleFieldChange("status", e.target.value)}
                >
                  <FormControlLabel
                    disabled={isDisabled}
                    value={1}
                    control={<Radio />}
                    label="Activo"
                  />
                  <FormControlLabel
                    disabled={isDisabled}
                    value={0}
                    control={<Radio />}
                    label="Inactivo"
                  />
                </RadioGroup>
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
            {console.log(isDisabled, isFormModified)}
            <MDButton type="submit" disabled={isDisabled || !isFormModified} color="success">
              Actualizar
            </MDButton>
          </Box>
        </form>
      </Card>
    </Modal>
  );
}

UserEdit.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  datosRecuperados: PropTypes.object,
  isDisabled: PropTypes.bool,
  datosEditados: PropTypes.object,
  getFieldValue: PropTypes.func,
  handleFieldChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isFormModified: PropTypes.bool,
  listRoles: PropTypes.array,
};
