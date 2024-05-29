/*
*/
import {
  Box,
  Card,
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
import MDBox from "components/MDBox";

export function ModalEditUser({
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
            Editar Usuario
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
        <Divider variant="middle" />
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="flex-start">
            <Box sx={{ marginRight: "20px" }}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Nombre de usuario:
              </Typography>
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px" }}
                label=""
                value={getFieldValue("name")}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
            </Box>
            <Box>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Apellido:
              </Typography>
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px" }}
                label=""
                value={getFieldValue("lastname")}
                onChange={(e) => handleFieldChange("lastname", e.target.value)}
              />
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                email:
              </Typography>
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px" }}
                label=""
                value={getFieldValue("email")}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="flex-start">
            <Box sx={{ marginRight: "25px" }}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                DNI:
              </Typography>
              <MDInput
                disabled={isDisabled}
                style={{ marginTop: "5px" }}
                label=""
                value={getFieldValue("number_id")}
                onChange={(e) => handleFieldChange("number_id", e.target.value)}
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

ModalEditUser.propTypes = {
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
