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

export function AdminManEdit({
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
            <Box>
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px", width: "100%" }}
                label="Nombre"
                value={getFieldValue("name")}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px", width: "100%" }}
                label="Descripcion"
                value={getFieldValue("description")}
                onChange={(e) => handleFieldChange("description", e.target.value)}
              />
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

AdminManEdit.propTypes = {
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
