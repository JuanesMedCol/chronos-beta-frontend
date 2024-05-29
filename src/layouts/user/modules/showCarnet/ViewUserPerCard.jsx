import * as React from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Icon,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import MDInput from "components/MDInput/index";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import colors from "assets/theme/base/colors";
import MDButton from "components/MDButton";

export default function ViewUserPerCard({
  isOpenModal,
  setIsOpenModal,
  dataCarnet,
  onCloseModal1,
  isDisabled,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const handleCloseToModal = () => {
    //setIsOpenModal(false);
    onCloseModal1();
  };

  return (
    <>
      <Modal
        open={true}
        onClose={handleCloseToModal}
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
              onClick={handleCloseToModal}
            >
              close
            </Icon>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2" color={"black"}>
            {/*dataCarnet.username*/}
          </Typography>
          <hr />
          <Box display="flex" alignItems="flex-start">
            <Box sx={{ marginRight: "100px" }}>
              <Typography color={"black"} fontWeight={500}>
                DNI
              </Typography>
              <MDInput disabled={isDisabled} style={{ marginTop: "5px" }} label="" />
            </Box>
            <Box>
              <Typography color={"black"} variant="p" fontWeight={500}>
                Perfil
              </Typography>
              <FormGroup>
                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox />} label="Estudiante" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox />} label="Docente" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox />} label="Vinculado" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox />} label="Invitado" />
                  </Grid>
                </Grid>
              </FormGroup>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography color={"black"} fontWeight={500}>
                Copias Generadas
              </Typography>
              <MDInput type="number" disabled={isDisabled} style={{ marginTop: "5px" }} label="" />
            </Box>
          </Box>
          <Box>
            <Box sx={{ marginRight: "25px" }}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Vigencias Estudiante
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="flex-start">
            <Box sx={{ marginRight: "25px" }}>
              <Typography color={"black"} fontWeight={500}>
                Desde...
              </Typography>
              <MDInput
                /*disabled={isDisabled}*/ type="date"
                style={{ marginTop: "5px" }}
                label=""
              />
            </Box>
            <Box sx={{ marginRight: "25px" }}>
              <Typography color={"black"} fontWeight={500}>
                Hasta...
              </Typography>
              <MDInput
                /*disabled={isDisabled}*/ type="date"
                style={{ marginTop: "5px" }}
                label=""
              />
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
                  displayEmpty
                >
                  <MenuItem value={""}>Seleccione...</MenuItem>
                  <MenuItem>Activo</MenuItem>
                  <MenuItem>Bloqueado</MenuItem>
                  <MenuItem>Vencido</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Typography color={"black"} fontWeight={500}>
              Programa
            </Typography>
            <MDInput disabled={isDisabled} style={{ marginTop: "5px" }} />
            <Typography color={"black"} fontWeight={500}>
              <a href="URL del carnet">URL del carnet</a>
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <MDButton onClick={handleCloseToModal}>Cancelar</MDButton>
            <MDButton type="submit" disabled color="success">
              Guardar
            </MDButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
