/*
*/
import React, { useEffect, useState } from "react";
import { getCard } from "../services/cardService";
import CardListPerUser from "../modules/CardListPerUser";
export function CardController({ openBoard, idCardUser, name, onClose }) {
  const [dataCard, setDataCard] = useState();
  const [error, setError] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesStart, setEntriesStart] = useState(0);
  const [entriesEnd, setEntriesEnd] = useState(0);
  const [openBoardCard, setOpenBoardCard] = useState(false);
  const requestCards = async (id, pageIndex) => {
    const result = await getCard(id, pageIndex);

    if (result.status !== false) {
      const { data, last_page, total, from, to } = result;
      //if (data.length !== 0) {
      //}
      await setDataCard(data);
      await setTotalPages(last_page);
      await setTotalData(total);
      await setEntriesStart(from);
      await setEntriesEnd(to);
    } else {
      setError("Error al consultar al servidor");
    }

    //console.log(data);
  };
  /*
  const handleOpenCardBoard = (event) => {
    event.preventDefault();
    setOpenBoard(true);
    //const { dataset } = event.currentTarget;
    const data = {
      nombre: "",
      url: "",
      estado: "bloqueado", // Convierte el atributo estado a un booleano
      usuarios: "",
      fecha_de_generacion: "",
      perfil: "",
      programa: "",
    };
    console.log(data);
  };
*/
  const handleClose = () => {
    onClose();
    setOpenBoardCard(false);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageIndexAndPageSize = async (pageSize) => {
    await setPaginaSize(pageSize);
    requestCardUsers(currentPage, pageSize);
  };

  useEffect(() => {
    if (openBoard === true) {
      setOpenBoardCard(openBoard);
      requestCards(idCardUser, currentPage);
      console.log(openBoard);
    }
  }, [currentPage, idCardUser, openBoard]);

  return (
    <>
      <CardListPerUser
        openBoard={openBoardCard}
        dataCard={dataCard}
        name={name}
        error={error}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        handleClose={handleClose}
      ></CardListPerUser>
    </>
  );
}
