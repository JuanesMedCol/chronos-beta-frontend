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
} from "@mui/material";
import colors from "assets/theme/base/colors";
import closeImg from "assets/images/close_X.svg";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

export function SourceEdit({
  open,
  handleClose,
  datosRecuperados,
  datosEditados,
  isFormModified,
  isDisabled,
  getFieldValue,
  handleFieldChange,
  handleSubmit,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "400px",
    bgcolor: "background.paper",
    border: "2px solid #000",
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
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Icon
            sx={{
              fontSize: "10px",
              color: colors.dark.main,
              stroke: "currentColor",
              strokeWidth: "2px",
              cursor: "pointer",
              marginLeft: "auto",
            }}
            onClick={handleClose}
          >
            close
          </Icon>
        </Box>
        <Divider variant="middle" />
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Fuente de datos: {getFieldValue("nombre")}
        </Typography>
        <Divider variant="middle" />
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="flex-start">
            <Box sx={{ marginRight: "20px" }}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                URL fuente
              </Typography>
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px" }}
                label="Url"
                value={getFieldValue("url")}
                onChange={(e) => handleFieldChange("url", e.target.value)}
              />
            </Box>
            <Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Estado
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={getFieldValue("estado")}
                  onChange={(e) => handleFieldChange("estado", e.target.value)}
                >
                  <FormControlLabel
                    disabled={isDisabled}
                    value={"activo"}
                    control={<Radio />}
                    label="Activo"
                  />
                  <FormControlLabel
                    disabled={isDisabled}
                    value={"bloqueado"}
                    control={<Radio />}
                    label="Bloqueado"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Usuarios
              </Typography>
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px" }}
                label=""
                value={getFieldValue("usuarios")}
                onChange={(e) => handleFieldChange("usuarios", e.target.value)}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="flex-start">
            <Box sx={{ marginRight: "25px" }}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Fecha de creación
              </Typography>
              <MDInput
                disabled={isDisabled}
                type="date"
                style={{ marginTop: "5px" }}
                label=""
                value={getFieldValue("fecha_de_generacion")}
                onChange={(e) => handleFieldChange("fecha_de_generacion", e.target.value)}
              />
            </Box>
            <Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Perfil
              </Typography>
              <FormControl sx={{ minWidth: 80 }}>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={getFieldValue("perfil")}
                  onChange={(e) => handleFieldChange("perfil", e.target.value)}
                  style={{ fontSize: "15px", padding: "10px" }}
                  disabled={isDisabled}
                  displayEmpty
                >
                  <MenuItem value={""}>Seleccione...</MenuItem>
                  <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                  <MenuItem value={"Vinculado"}>Vinculado</MenuItem>
                  <MenuItem value={"Invitado"}>Invitado</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Programa
            </Typography>
            <MDInput
              disabled={isDisabled}
              style={{ marginTop: "5px" }}
              value={getFieldValue("programa")}
              onChange={(e) => handleFieldChange("programa", e.target.value)}
            />
          </Box>
          <Divider variant="middle" />
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <MDButton onClick={handleClose}>Cancelar</MDButton>
            <MDButton type="submit" disabled={isDisabled || !isFormModified} color="success">
              Guardar
            </MDButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

SourceEdit.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  datosRecuperados: PropTypes.object,
  isDisabled: PropTypes.bool,
  datosEditados: PropTypes.object,
  getFieldValue: PropTypes.func,
  handleFieldChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isFormModified: PropTypes.bool,
};
