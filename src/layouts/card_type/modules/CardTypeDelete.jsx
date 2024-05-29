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

export function CardTypeDelete({ openDelete, handleCloseDelete, infoDelete, handleSubmitDelete }) {
  return (
    <>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ textAlign: "center" }}
      >
        <DialogTitle id="alert-dialog-title">{"¡Importante!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de eliminar el tipo de carnet: {infoDelete.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDelete}>Cancelar</MDButton>
          <MDButton color="warning" onClick={handleSubmitDelete}>
            Eliminar
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
