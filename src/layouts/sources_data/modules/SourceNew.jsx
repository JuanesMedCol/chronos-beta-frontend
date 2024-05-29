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
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import colors from "assets/theme/base/colors";
import closeImg from "assets/images/close_X.svg";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";
import MDAlert from "components/MDAlert";

export function SourceNew({
  open,
  handleClose,
  isFormModified,
  isDisabled,
  isAlert,
  errorAlert,
  spinner,
  getFieldValue,
  sourceTypes,
  carnetTypes,
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

  const modalContentStyle = {
    padding: "20px",
    maxHeight: "80%", // Establece la altura máxima para el contenido del modal
    overflowY: "auto", // Agregar scroll vertical al contenido del modal
  };

  const content = {
    margin: "0",
    padding: "0",
    display: "grid",
    align: "center",
    width: "100%",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
            Nueva Fuente de Datos
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
        <div style={{ maxHeight: "80%", overflowY: "auto" }}>
          <form onSubmit={handleSubmit}>
            <MDBox
              sx={content}
              style={{
                justifyContent: "space-around",
              }}
            >
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Tipo de fuente
                </Typography>
                <FormControl sx={{ minWidth: 80 }}>
                  <Select
                    labelId="labelId-select-tipo-de-fuente"
                    id="select-tipo-de-fuente"
                    value={getFieldValue("name")}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    style={{ fontSize: "15px", padding: "10px" }}
                    disabled={isDisabled}
                    displayEmpty
                  >
                    <MenuItem value={""}>Seleccione...</MenuItem>
                    {sourceTypes
                      ? sourceTypes.map((source) => {
                          return (
                            <MenuItem key={source.id} value={source.name}>
                              {source.name}
                            </MenuItem>
                          );
                        })
                      : []}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ marginRight: "20px" }}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Fuente:
                </Typography>
                {getFieldValue("name") === "Archivo CSV" ? (
                  <>
                    <label>Archivo CSV de ejemplo.</label>
                    <br></br>
                    <span>
                      Descarga el siguiente archivo{" "}
                      <MDButton
                        style={{ marginBottom: "5px" }}
                        color="success"
                        href="/assets/csv.csv"
                        download="csv.csv"
                        target="_self"
                      >
                        Descargar
                      </MDButton>
                    </span>

                    <MDInput
                      disabled={isDisabled}
                      style={{ marginTop: "5px" }}
                      label=""
                      type="file"
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        handleFieldChange("source", selectedFile);
                      }}
                    ></MDInput>
                    <label
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100px",
                        display: "inline-block",
                      }}
                      title={getFieldValue("source") ? getFieldValue("source").name : ""}
                    >
                      {getFieldValue("source") ? getFieldValue("source").name : ""}
                    </label>
                  </>
                ) : (
                  ""
                )}
              </Box>
              {/*<Box>
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
              </Box>*/}

              {/*<Box sx={{ marginRight: "25px" }}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Usuarios
                </Typography>
                <MDInput
                  type="number"
                  disabled={isDisabled}
                  style={{ marginTop: "5px" }}
                  label=""
                  value={getFieldValue("usuarios")}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      handleFieldChange("usuarios", e.target.value);
                    }
                  }}
                />
              </Box>*/}
              {/*<Box sx={{ marginRight: "25px" }}>
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
              </Box>*/}
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Tipo de Carnet
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
                    {carnetTypes
                      ? carnetTypes.map((carnet) => {
                          return (
                            <MenuItem key={carnet.id} value={carnet.name}>
                              {carnet.name}
                            </MenuItem>
                          );
                        })
                      : []}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Fecha de Habilitación
                </Typography>
                <MDInput
                  type="date"
                  style={{ marginTop: "5px" }}
                  label=""
                  value={getFieldValue("created")}
                  onChange={(e) => handleFieldChange("created", e.target.value)}
                />
              </Box>

              {/*<Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Programa
                </Typography>
                <MDInput
                  disabled={isDisabled}
                  style={{ marginTop: "5px" }}
                  value={getFieldValue("programa")}
                  onChange={(e) => handleFieldChange("programa", e.target.value)}
                />
              </Box>*/}
            </MDBox>
          </form>
        </div>
        <Divider variant="middle" />

        {isAlert ? (
          <MDAlert color="error" dismissible>
            Error: {`${errorAlert}`}
          </MDAlert>
        ) : (
          ""
        )}
        {spinner ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          ""
        )}
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
      </Card>
    </Modal>
  );
}

SourceNew.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  isDisabled: PropTypes.bool,
  getFieldValue: PropTypes.func,
  handleFieldChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isFormModified: PropTypes.bool,
};
