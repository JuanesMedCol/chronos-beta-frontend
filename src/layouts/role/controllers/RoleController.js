/*
*/

import { useEffect, useState } from "react";
import {
  RoleCreateService,
  RoleListService,
  RoleUpdateService,
  RoleDeleteService,
  RoleByIDService,
  RolePermisionsListService,
} from "../services/RoleService";
import RoleList from "../modules/RoleList";
import { RoleCreate } from "../modules/RoleCreate";
import { RoleEdit } from "../modules/RoleEdit";
import { RoleDelete } from "../modules/RoleDelete";

export default function RoleController() {
  // Common Controllers
  const [isDisabled, setIsDisabled] = useState(false);
  const [defaultData, setDefaultData] = useState({});
  const [isFormModified, setIsFormModified] = useState(false);
  const [recoveredData, setRecoveredData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [newData, setNewData] = useState({});
  const [buildData, setBuildData] = useState({});
  const header = [{}];

  // Field Check

  const getFieldValueNew = (fieldName) => {
    return newData[fieldName];
  };

  const getFieldValue = (fieldName) => {
    return editedData[fieldName];
  };

  const handleFieldChangeNew = (fieldName, value) => {
    setNewData({
      ...newData,
      [fieldName]: value,
    });
    console.log(value);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedData({
      ...editedData,
      [fieldName]: value,
    });
    console.log(value);
  };

  // ByID Controllers

  const requestRoleByID = async (idRole) => {
    try {
      const role = await RoleByIDService(idRole);
      const { payload } = role;
      return { payload };
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // Permit List Controllers

  const [handleRolePermitList, setRolePermitList] = useState();

  const requestRolePermitList = async () => {
    const result = await RolePermisionsListService();
    if (result && result.payload) {
      const { payload } = result;
      const rolePermitsArray = Object.entries(payload);

      setRolePermitList(rolePermitsArray);
    }
  };

  useEffect(() => {
    requestRolePermitList();
  }, []);

  // List Controllers

  const requestRoleList = async (pageIndex) => {
    const result = await RoleListService(pageIndex);
    if (result) {
      const { payload } = result;
      await setRoleList(payload.data);
      await setTotalPages(payload.last_page);
      await setTotalData(payload.total);
      await setEntriesStart(payload.from);
      await setEntriesEnd(payload.to);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageIndexAndPageSize = async (pageSize) => {
    await setPaginaSize(pageSize);
    requestRoleList(currentPage === 1 ? currentPage : (currentPage - 1) * pageSize + 1);
  };

  useEffect(() => {
    requestRoleList(currentPage === 1 ? currentPage : (currentPage - 1) * paginaSize + 1);
  }, [currentPage]);

  // Create Controllers

  const [openCreate, setOpenCreate] = useState(false);

  const handleRoleCreate = (event) => {
    event.preventDefault();
    setIsDisabled(false);
    const data = {
      name: "",
      description: "",
      //permissions: "",
    };
    console.log(data);
    setDefaultData(data);
    setNewData(data);
    setOpenCreate(true);
  };

  const submitRoleCreate = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(newData);
    console.log("Formulario enviado:", newData);
    console.log("Formulario convertido a string:", convertedObject);
    RoleCreateService(newData);
    requestRoleList(1);
    closeRoleCreate();
  };

  const closeRoleCreate = () => setOpenCreate(false);

  // Edit Controllers

  const [openEdit, setOpenEdit] = useState(false);

  const handleRoleEdit = async (event) => {
    event.preventDefault();
    setIsDisabled(event.currentTarget.dataset.id === "view" ? true : false);
    const role = await requestRoleByID(event.currentTarget.dataset.id);
    setRecoveredData(role.payload);
    setEditedData(role.payload);
    setOpenEdit(true);
  };

  const submitRoleEdit = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(editedData);
    console.log("Formulario enviado:", editedData);
    console.log("Formulario convertido a string:", convertedObject);
    RoleUpdateService(editedData.id, editedData);
    requestRoleList(1);
    closeRoleEdit();
  };

  const closeRoleEdit = () => setOpenEdit(false);

  // Delete Controllers

  const [openDelete, setOpenDelete] = useState(false);
  const [infoDelete, setInfoDelete] = useState({});

  const requestRoleDelete = async (id) => {
    try {
      const result = await RoleDeleteService(id);
      const { data } = result;
      console.log(id);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleRoleDelete = (event) => {
    event.preventDefault();

    const { dataset } = event.currentTarget;
    const data = {
      id: dataset.id,
      name: dataset.name,
      //permissions: dataset.permissions,
    };
    setInfoDelete(data);
    setOpenDelete(true);
  };

  const submitRoleDelete = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(infoDelete.id);
    console.log("Formulario enviado:", infoDelete.id);
    console.log("Formulario convertido a string:", convertedObject.id);
    console.log(`hi la id a eliminar es ${(infoDelete.id, infoDelete.id)}`);
    requestRoleDelete(infoDelete.id, infoDelete.id);
    requestRoleList(1);
    closeRoleDelete();
  };

  const closeRoleDelete = () => setOpenDelete(false);

  // Test Keys

  useEffect(() => {
    const hasFormChanged = Object.keys(editedData).some(
      (fieldName) => editedData[fieldName] !== recoveredData[fieldName]
    );

    const isAnyFieldEmpty = Object.values(editedData).some((value) => value === "");

    setIsFormModified(!isAnyFieldEmpty && hasFormChanged);
    console.log(!isAnyFieldEmpty && hasFormChanged);
  }, [editedData]);

  useEffect(() => {
    const requiredFields = ["name", "description"];
    const someFieldIsEmpty = requiredFields.some((fieldName) => !newData[fieldName]);
    setIsFormModified(someFieldIsEmpty);
  }, [newData]);

  // Stringify

  function convertValuesToString(objeto) {
    const convertedObject = {};

    for (const clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
        convertedObject[clave] = String(objeto[clave]);
      }
    }

    return convertedObject;
  }

  return (
    <>
      <RoleList
        handleRoleList={handleRoleList}
        handleRoleCreate={handleRoleCreate}
        handleRoleEdit={handleRoleEdit}
        handleRoleDelete={handleRoleDelete}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />

      <RoleCreate
        open={openCreate}
        handleClose={closeRoleCreate}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValueNew}
        handleFieldChange={handleFieldChangeNew}
        handleSubmit={submitRoleCreate}
        handleRolePermitList={handleRolePermitList}
      />

      <RoleEdit
        open={openEdit}
        handleClose={closeRoleEdit}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValue}
        handleFieldChange={handleFieldChange}
        handleSubmit={submitRoleEdit}
        handleRolePermitList={handleRolePermitList}
      />

      <RoleDelete
        openDelete={openDelete}
        closeDelete={closeRoleDelete}
        infoDelete={infoDelete}
        submitDelete={submitRoleDelete}
      />
    </>
  );
}
