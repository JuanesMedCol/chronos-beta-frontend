/*
*/

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MDButton from "components/MDButton";

export function RoleDelete({ openDelete, closeDelete, infoDelete, submitDelete }) {
  return (
    <>
      <Dialog
        open={openDelete}
        onClose={closeDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textAlign: "center" }}
      >
        <DialogTitle id="alert-dialog-title">{"¡Importante!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de eliminar el rol: {infoDelete.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={closeDelete}>Cancelar</MDButton>
          <MDButton color="warning" onClick={submitDelete}>
            Eliminar
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
