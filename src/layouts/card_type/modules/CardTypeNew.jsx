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
  TextField,
  styled,
  Button,
  Card,
} from "@mui/material";
import colors from "assets/theme/base/colors";
import closeImg from "assets/images/close_X.svg";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";

export function CardTypeNew({
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
    maxWidth: "700px",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    maxHeight: "95vh",
  };

  const content = {
    margin: "0",
    padding: "0",
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
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
            Crear Tipo de Carnet
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
          <div style={{ maxHeight: "80%", overflowY: "auto" }}>
            <Box sx={content}>
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Tipo de carnet
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Fecha de expiración
                </Typography>
                <Box sx={{ marginTop: "5px", alignItems: "center" }}>
                  <MDInput
                    type="number"
                    disabled={isDisabled}
                    style={{ width: "4.2em", marginRight: "5px" }}
                    label=""
                    value={getFieldValue("expiredNumber")}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        handleFieldChange("expiredNumber", e.target.value);
                      }
                    }}
                  />
                  <FormControl sx={{ minWidth: 80 }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={getFieldValue("expiredStr") ? getFieldValue("expiredStr") : ""}
                      onChange={(e) => handleFieldChange("expiredStr", e.target.value)}
                      style={{ fontSize: "15px", padding: "10px" }}
                      disabled={isDisabled}
                      displayEmpty
                    >
                      <MenuItem value={""}>Seleccione...</MenuItem>
                      <MenuItem value={"day"}>Día</MenuItem>
                      <MenuItem value={"month"}>Mes</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </div>
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
              onClick={handleSubmit}
              type="submit"
              disabled={isDisabled || isFormModified}
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

CardTypeNew.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  isDisabled: PropTypes.bool,
  getFieldValue: PropTypes.func,
  handleFieldChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isFormModified: PropTypes.bool,
};
