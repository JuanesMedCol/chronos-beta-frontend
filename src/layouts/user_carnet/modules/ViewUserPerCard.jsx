/*
*/
import * as React from "react";
import {
  Autocomplete,
  Box,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import MDInput from "components/MDInput/index";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import colors from "assets/theme/base/colors";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

export default function ViewUserPerCard({
  isOpenModal,
  dataCarnet,
  handleCloseToModal,
  isDisabled,
  getFieldValue,
  typeCarnets,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "450px",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
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

  return (
    <>
      <Modal
        open={isOpenModal}
        onClose={handleCloseToModal}
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
              Detalles del usuario:
              <br />
              {` ${getFieldValue("name_user")} ${getFieldValue("last_name_user")}`}
            </Typography>

            <Icon
              sx={{
                fontSize: "2em",
                stroke: "currentColor",
                strokeWidth: "2px",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={handleCloseToModal}
            >
              close
            </Icon>
          </MDBox>
          <Divider variant="middle" />
          <div style={{ maxHeight: "80%", overflowY: "auto" }}>
            <MDBox
              sx={content}
              style={{
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ marginRight: "20px" }}>
                <Typography color={"black"} fontWeight={500}>
                  DNI
                </Typography>
                <MDInput
                  disabled={isDisabled}
                  style={{ marginTop: "5px" }}
                  label=""
                  value={getFieldValue("number_id_user")}
                />
              </Box>
              <Box>
                <Typography color={"black"} variant="p" fontWeight={500}>
                  Perfil
                </Typography>

                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <FormGroup>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={getFieldValue("type_card")}
                        onChange={(e) => handleFieldChange("type_card", e.target.value)}
                      >
                        {typeCarnets
                          ? typeCarnets.map((type) => {
                              return (
                                <FormControlLabel
                                  key={type.id}
                                  disabled={isDisabled}
                                  value={type.name}
                                  control={<Radio />}
                                  label={type.name}
                                />
                              );
                            })
                          : []}
                        {/*<FormControlLabel control={<Checkbox />} label="Estudiante" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox />} label="Docente" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox />} label="Vinculado" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox />} label="Invitado" />
                  </Grid>*/}
                      </RadioGroup>
                    </FormGroup>
                  </Grid>
                </Grid>
              </Box>

              {/*<Box>
            <Box>
              <Typography color={"black"} fontWeight={500}>
                Copias Generadas
              </Typography>
              <MDInput type="number" disabled={isDisabled} style={{ marginTop: "5px" }} label="" />
            </Box>
          </Box>*/}
              <Box>
                <Box>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Vigencias
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <Box sx={{ marginRight: "25px" }}>
                  <Typography color={"black"} fontWeight={500}>
                    Desde...
                  </Typography>
                  <MDInput
                    type="date"
                    style={{ marginTop: "5px" }}
                    label=""
                    disabled={isDisabled}
                    value={getFieldValue("created")}
                  />
                </Box>
                <Box sx={{ marginRight: "25px" }}>
                  <Typography color={"black"} fontWeight={500}>
                    Hasta...
                  </Typography>
                  <MDInput
                    type="date"
                    style={{ marginTop: "5px" }}
                    label=""
                    disabled={isDisabled}
                    value={getFieldValue("expired")}
                  />
                </Box>
              </Box>
              <Box>
                <Typography color={"black"} fontWeight={500}>
                  Estado
                </Typography>
                <FormControl sx={{ minWidth: 80 }}>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    style={{ fontSize: "15px", padding: "10px" }}
                    disabled={isDisabled}
                    value={getFieldValue("status")}
                    displayEmpty
                  >
                    <MenuItem value="">Seleccione...</MenuItem>
                    <MenuItem value={"active"}>Activo</MenuItem>
                    <MenuItem value={"inactive"}>Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </MDBox>
          </div>
          {/*<Box>
            <Typography color={"black"} fontWeight={500}>
              Programa
            </Typography>
            <MDInput disabled={isDisabled} style={{ marginTop: "5px" }} />
            <Typography color={"black"} fontWeight={500}>
              <a href="URL del carnet">URL del carnet</a>
            </Typography>
          </Box>*/}
          <Divider variant="middle" />
          <MDBox
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
            m={-0.5}
            mb={-2}
          >
            <MDButton color="error" onClick={handleCloseToModal}>
              Cancelar
            </MDButton>
            <MDButton type="submit" disabled color="success">
              Guardar
            </MDButton>
          </MDBox>
        </Card>
      </Modal>
    </>
  );
}
