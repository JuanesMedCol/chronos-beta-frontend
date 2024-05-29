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

export function AdminManCreate({
  open,
  handleClose,
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
            Nueva Fecha de Sincronizacion
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
            <Box>
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px", width: "100%" }}
                label="Nombre"
                value={getFieldValue("name")}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Establecer Fecha
                </Typography>
                <MDInput
                  disabled={isDisabled}
                  type="date"
                  style={{ marginTop: "5px", width: "100%" }}
                  label=""
                  value={getFieldValue("fecha_de_generacion")}
                  onChange={(e) => handleFieldChange("fecha_de_generacion", e.target.value)}
                />
              </Box>
            </Box>
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
            <MDButton type="submit" disabled={isDisabled || !isFormModified} color="success">
              Guardar
            </MDButton>
          </MDBox>
        </form>
      </Card>
    </Modal>
  );
}

AdminManCreate.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  isDisabled: PropTypes.bool,
  getFieldValue: PropTypes.func,
  handleFieldChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isFormModified: PropTypes.bool,
};
