/*
*/
import React, { useEffect, useState } from "react";
import UserCard from "../modules/UserCard";
import { editUserCard, getCardUsers } from "../services/userCardService";
import { CardController } from "layouts/card/controllers/CardController";
import { ModalEditUser } from "../modules/ModalEditUser";
export function UserCardController() {
  const [dataCardUser, setDataCardUser] = useState();
  const [name, setName] = useState("");
  const [error, setError] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesStart, setEntriesStart] = useState(0);
  const [entriesEnd, setEntriesEnd] = useState(0);
  const [openBoard, setOpenBoard] = useState(false);
  const [idCardUser, setIdCardUser] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);
  const [recoveredData, setRecoveredData] = useState({});
  const requestCardUsers = async (pageIndex) => {
    try {
      const result = await getCardUsers(pageIndex);
      //const result = false;
      //await setDataCardUser(data);
      if (result.status !== false) {
        const { data, last_page, total, from, to } = result;
        //console.log(carnets);
        //console.log(`${pageIndex} - ${pageSize}`);
        await setDataCardUser(data);
        await setTotalPages(last_page);
        await setTotalData(total);
        await setEntriesStart(from);
        await setEntriesEnd(to);
      } else {
        setError("Error al consultar al servidor");
      }
    } catch (error) {
      setError("Error al consultar al servidor");
      console.error("Error al obtener datos:", error);
    }
    //console.log(data);
  };
  const requestEditUserCard = async (id, editTypeCard) => {
    const result = await editUserCard(id, editTypeCard);

    if (result.success !== false) {
      console.log("Actualizo la lista");
      requestCardUsers(currentPage);
      handleCloseModalEdit();
    } else {
      setError("Error al consultar al servidor");
      console.log(result.message);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageIndexAndPageSize = async (pageSize) => {
    await setPaginaSize(pageSize);
    requestCardUsers(currentPage, pageSize);
  };
  const handleOpenCardBoard = (event) => {
    event.preventDefault();
    setOpenBoard(true);
    const { dataset } = event.currentTarget;
    setIdCardUser(dataset.identifier);
    setName(dataset.name);
    console.log(dataset.identifier);
  };

  const handleCloseCardController = () => {
    setOpenBoard(false);
  };

  useEffect(() => {
    requestCardUsers(currentPage);
  }, [currentPage]);
  //Modal editar
  const handleOpenModalEdit = (event) => {
    //console.log(event.currentTarget.dataset);
    //console.log(event.target.dataset.nombre);
    event.preventDefault();
    setOpenModalEdit(true);
    setIsDisabled(event.currentTarget.dataset.id === "view" ? true : false);
    const { dataset } = event.currentTarget;
    const data = {
      id: dataset.identifier,
      name: dataset.name,
      lastname: dataset.lastname,
      number_id: dataset.numberid,
      email: dataset.email,
    };
    setEditedData(data);
    console.log(data);
  };
  const handleCloseModalEdit = () => setOpenModalEdit(false);
  const header = [{}];
  const getFieldValue = (fieldName) => {
    return editedData[fieldName];
  };
  const handleFieldChange = (fieldName, value) => {
    setEditedData({
      ...editedData,
      [fieldName]: value,
    });
    console.log(value);
  };

  useEffect(() => {
    // Comprueba si algún campo ha cambiado desde los valores iniciales
    const hasFormChanged = Object.keys(editedData).some(
      (fieldName) => editedData[fieldName] !== recoveredData[fieldName]
    );

    const isAnyFieldEmpty = Object.values(editedData).some((value) => value === "");

    setIsFormModified(!isAnyFieldEmpty && hasFormChanged);
    console.log(!isAnyFieldEmpty && hasFormChanged);
  }, [editedData]);
  function convertValuesToString(objeto) {
    const convertedObject = {};

    for (const clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
        convertedObject[clave] = String(objeto[clave]);
      }
    }

    return convertedObject;
  }
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(editedData);
    // Realiza la acción de enviar el formulario aquí
    console.log("Formulario enviado:", editedData);
    console.log("Formulario convertido a string:", convertedObject);
    requestEditUserCard(editedData.id, editedData);
    //requestSourceEdit(editedData.id, editedData);
  };

  return (
    <>
      <UserCard
        dataCardUser={dataCardUser}
        error={error}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        handleOpenCardBoard={handleOpenCardBoard}
        handleOpenModalEdit={handleOpenModalEdit}
      ></UserCard>
      {openBoard && (
        <CardController
          openBoard={openBoard}
          idCardUser={idCardUser}
          name={name}
          onClose={handleCloseCardController}
        ></CardController>
      )}
      <ModalEditUser
        open={openModalEdit}
        handleClose={handleCloseModalEdit}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValue}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmitEdit}
      />
    </>
  );
}
