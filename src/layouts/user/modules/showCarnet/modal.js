import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
//import data from "../../../table.data.json";
//import dataCarnetJSON from "../../../modal.json";
import { useEffect, useState } from "react";
//import ModalCarnet from "../showCarnet/index";

const DataTable = () => {
  const [carnet, setCarnet] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  //const [dataTable, setDataTable] = useState(data);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChangeToCarnet = (username) => {
    setCarnet({ ...carnet, username });
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    //console.log(data);
  });

  return (
    <>
      {/*<TableContainer component={Paper} sx={{ minWidth: 650, position: "absolute", top: "1rem" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.table.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.direction}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleChangeToCarnet(row.name)}>
                    Ver Carnet
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>*/}
      <ModalCarnet
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        dataCarnet={carnet}
        onCloseModal1={handleCloseModal}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default DataTable;
