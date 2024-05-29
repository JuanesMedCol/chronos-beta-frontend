/*
*/
import React, { useEffect, useState } from "react";
import ListCardType from "../modules/ListCardType";
import {
  createCardTypes,
  deleteCardTypes,
  getCardTypes,
  updatedCardTypes,
} from "../services/cardTypeService";
import { CardTypeEdit } from "../modules/CardTypeEdit";
import { CardTypeNew } from "../modules/CardTypeNew";
import { CardTypeDelete } from "../modules/CardTypeDelete";
//import { useAuth } from "../../../context/index";
export function CardTypeController() {
  const [dataTypeCard, setDataTypeCard] = useState();
  const [name, setName] = useState("");
  const [error, setError] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesStart, setEntriesStart] = useState(0);
  const [entriesEnd, setEntriesEnd] = useState(0);
  const [idCardUser, setIdCardUser] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [recoveredData, setRecoveredData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [objectExpired, setObjectExpired] = useState("");
  const [newData, setNewData] = useState({});
  const [infoDelete, setInfoDelete] = useState({});
  const [defaultData, setDefaultData] = useState({});
  const [isFormModified, setIsFormModified] = useState(false);
  //const { token, login, logout } = useAuth();
  const requestCardUsers = async (pageIndex) => {
    const result = await getCardTypes(pageIndex);

    if (result.status !== false) {
      const { data, last_page, total, from, to } = result;
      await setDataTypeCard(data);
      await setTotalPages(last_page);
      await setTotalData(total);
      await setEntriesStart(from);
      await setEntriesEnd(to);
    } else {
      setError("Error al consultar al servidor");
    }

    //console.log(data);
  };

  const requestCreateTypeCard = async (newTypeCard) => {
    const result = await createCardTypes(newTypeCard);

    if (result.status !== false) {
      console.log("Actualizo la lista");
      requestCardUsers(currentPage);
    } else {
      setError("Error al consultar al servidor");
      console.log(result.message);
    }
  };
  const requestUpdateTypeCard = async (id, editTypeCard) => {
    const result = await updatedCardTypes(id, editTypeCard);

    if (result.status !== false) {
      console.log("Actualizo la lista");
      requestCardUsers(currentPage);
    } else {
      setError("Error al consultar al servidor");
      console.log(result.message);
    }
  };

  const requestDeleteTypeCard = async (id) => {
    const result = await deleteCardTypes(id);

    if (result.status !== false) {
      console.log("Actualizo la lista");
      requestCardUsers(currentPage);
    } else {
      setError("Error al consultar al servidor");
      console.log(result.message);
    }
  };

  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseNew = () => setOpenNew(false);
  const handleCloseDelete = () => setOpenDelete(false);

  const getFieldValueEdit = (fieldName) => {
    return editedData[fieldName];
  };

  const getFieldValueNew = (fieldName) => {
    return newData[fieldName];
  };

  const getValueExpired1 = (fieldName) => {
    const value = editedData[fieldName];
    if (value) {
      const values = value.split(" ");
      if (values) {
        const extractedValue = values[0]; // Obtener la primera parte antes del espacio
        const extractedValue2 = values[1];
        const objectValue = {
          value1: extractedValue,
          value2: extractedValue2,
        };
        console.log(extractedValue);
        setObjectExpired(objectValue);
        return extractedValue;
      } else {
        console.log("No se encontró ningún valor antes del espacio");
      }
    }
  };
  const getValueExpired2 = (fieldName) => {
    const value = getFieldValueEdit(fieldName);
    if (value) {
      const values = value.split(" ");
      if (values.length > 0) {
        const extractedValue = parseInt(values[0], 10); // Obtener la primera parte antes del espacio
        const extractedValue2 = values[1];
        const objectValue = {
          value1: extractedValue,
          value2: extractedValue2,
        };
        console.log(objectValue);
        setObjectExpired(objectValue);
      } else {
        console.log("No se encontró ningún valor antes del espacio");
      }
    }
  };

  const handleFieldChangeEdit = (fieldName, value) => {
    setEditedData({
      ...editedData,
      [fieldName]: value,
    });
    console.log(value);
  };

  const handleFieldChangeNew = (fieldName, value) => {
    setNewData({
      ...newData,
      [fieldName]: value,
    });
    console.log(value);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const { id, name, expiredNumber, expiredStr } = editedData;
    const expiredNumberStr = expiredNumber.toString();
    const objectTypeCard = {
      name: name,
      expiration_time: `${expiredNumberStr} ${expiredStr}`,
    };
    console.log("Formulario enviado:", editedData);
    await requestUpdateTypeCard(id, objectTypeCard);
    handleCloseEdit();
    //const convertedObject = convertValuesToString(editedData);
    // Realiza la acción de enviar el formulario aquí
    // console.log("Formulario convertido a string:", convertedObject);
    //requestSourceEdit(editedData.id, editedData);
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    const { name, expiredNumber, expiredStr } = newData;
    const expiredNumberStr = expiredNumber.toString();
    const objectTypeCard = {
      name: name,
      expiration_time: `${expiredNumberStr} ${expiredStr}`,
    };
    requestCreateTypeCard(objectTypeCard);
    handleCloseNew();

    // Realiza la acción de enviar el formulario aquí
    console.log("Formulario enviado:", objectTypeCard);
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    console.log(`hi la id a eliminar es ${infoDelete.id}`);
    requestDeleteTypeCard(infoDelete.id);
    handleCloseDelete();
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageIndexAndPageSize = async (pageSize) => {
    await setPaginaSize(pageSize);
    requestCardUsers(currentPage, pageSize);
  };

  const handleOpenNew = (event) => {
    //console.log(event.currentTarget.dataset);
    //console.log(event.target.dataset.nombre);
    event.preventDefault();
    setOpenNew(true);
    setIsDisabled(false);
    //const { dataset } = event.currentTarget;
    const data = {
      name: "",
      expiredNumber: "",
      expiredStr: "month",
    };
    setDefaultData(data);
    setNewData(data);
    console.log(data);
  };

  const handleOpenEdit = (event) => {
    //console.log(event.currentTarget.dataset);
    //console.log(event.target.dataset.nombre);
    event.preventDefault();
    setIsDisabled(event.currentTarget.dataset.id === "view" ? true : false);
    const { dataset } = event.currentTarget;
    const values = dataset.expired.split(" ");
    if (values.length > 0) {
      const extractedValue = parseInt(values[0], 10); // Obtener la primera parte antes del espacio
      const extractedValue2 = values[1];
      const objectValue = {
        value1: extractedValue,
        value2: extractedValue2,
      };
      console.log(objectValue);
      setObjectExpired(objectValue);
    } else {
      console.log("No se encontró ningún valor antes del espacio");
    }
    const data = {
      id: dataset.identifier,
      name: dataset.name,
      expiredNumber: parseInt(values[0], 10),
      expiredStr: values[1],
    };

    setRecoveredData(data);
    setEditedData(data);
    setName(dataset.name);
    setOpenEdit(true);
    console.log(data);
  };

  const handleClickDelete = (event) => {
    event.preventDefault();

    const { dataset } = event.currentTarget;
    const data = {
      id: dataset.identifier,
      name: dataset.name,
    };
    setInfoDelete(data);
    setOpenDelete(true);
  };
  useEffect(() => {
    //console.log(token);
    requestCardUsers(currentPage);
  }, []);

  useEffect(() => {
    // Comprueba si algún campo ha cambiado desde los valores iniciales
    const hasFormChanged = Object.keys(editedData).some(
      (fieldName) => editedData[fieldName] !== recoveredData[fieldName]
    );

    const isAnyFieldEmpty = Object.values(editedData).some((value) => value === "");

    setIsFormModified(!isAnyFieldEmpty && hasFormChanged);
    console.log(!isAnyFieldEmpty && hasFormChanged);
  }, [editedData]);

  useEffect(() => {
    // Comprueba si algún campo ha cambiado desde los valores iniciales
    //const hasFormChanged = Object.keys(newData).some((fieldName) => newData[fieldName] !== "");
    const requiredFields = ["name", "expiredNumber", "expiredStr"];
    const someFieldIsEmpty = requiredFields.some((fieldName) => !newData[fieldName]);
    setIsFormModified(someFieldIsEmpty);
    console.log(someFieldIsEmpty);
  }, [newData]);

  return (
    <>
      <ListCardType
        dataTypeCard={dataTypeCard}
        error={error}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        handleOpenNew={handleOpenNew}
        handleOpenEdit={handleOpenEdit}
        handleClickDelete={handleClickDelete}
      ></ListCardType>
      <CardTypeNew
        open={openNew}
        handleClose={handleCloseNew}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValueNew}
        handleFieldChange={handleFieldChangeNew}
        handleSubmit={handleSubmitNew}
      />
      <CardTypeEdit
        open={openEdit}
        dataTypeCard={dataTypeCard}
        objectExpired={objectExpired}
        handleClose={handleCloseEdit}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValueEdit}
        name={name}
        handleFieldChange={handleFieldChangeEdit}
        handleSubmit={handleSubmitEdit}
      />
      <CardTypeDelete
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        infoDelete={infoDelete}
        handleSubmitDelete={handleSubmitDelete}
      />
    </>
  );
}
