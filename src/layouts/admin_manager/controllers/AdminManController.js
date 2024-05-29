import { useEffect, useState } from "react";
import {
  AdminManCreateService,
  AdminManListService,
  AdminManUpdateService,
  AdminManDeleteService,
  AdminManByIDService,
} from "../services/AdminManService";
import AdminManList from "../modules/AdminManList";
import { AdminManCreate } from "../modules/AdminManCreate";
import { AdminManEdit } from "../modules/AdminManEdit";
import { AdminManDelete } from "../modules/AdminManDelete";

export default function AdminManController() {
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

  const requestAdminManByID = async (idAdminMan) => {
    try {
      const admin = await AdminManByIDService(idAdminMan);
      const { payload } = admin;
      return { payload };
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // List Controllers

  const [handleAdminManList, setAdminManList] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesStart, setEntriesStart] = useState(0);
  const [entriesEnd, setEntriesEnd] = useState(0);
  const [paginaSize, setPaginaSize] = useState(10);

  const requestAdminManList = async (pageIndex) => {
    const result = await AdminManListService(pageIndex);
    if (result) {
      const { payload } = result;
      await setAdminManList(payload.data);
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
    requestAdminManList(currentPage === 1 ? currentPage : (currentPage - 1) * pageSize + 1);
  };

  useEffect(() => {
    requestAdminManList(currentPage === 1 ? currentPage : (currentPage - 1) * paginaSize + 1);
  }, [currentPage]);

  // Create Controllers

  const [openCreate, setOpenCreate] = useState(false);

  const handleAdminManCreate = (event) => {
    event.preventDefault();
    setIsDisabled(false);
    const data = {
      name: "",
      description: "",
    };
    console.log(data);
    setDefaultData(data);
    setNewData(data);
    setOpenCreate(true);
  };

  const submitAdminManCreate = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(newData);
    console.log("Formulario enviado:", newData);
    console.log("Formulario convertido a string:", convertedObject);
    AdminManCreateService(newData);
    requestAdminManList(1);
    closeAdminManCreate();
  };

  const closeAdminManCreate = () => setOpenCreate(false);

  // Edit Controllers

  const [openEdit, setOpenEdit] = useState(false);

  const handleAdminManEdit = async (event) => {
    event.preventDefault();
    setIsDisabled(event.currentTarget.dataset.id === "view" ? true : false);
    const admin = await requestAdminManByID(event.currentTarget.dataset.id);
    setRecoveredData(admin.payload);
    setEditedData(admin.payload);
    setOpenEdit(true);
  };

  const submitAdminManEdit = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(editedData);
    console.log("Formulario enviado:", editedData);
    console.log("Formulario convertido a string:", convertedObject);
    AdminManUpdateService(editedData.id, editedData);
    requestAdminManList(1);
    closeAdminManEdit();
  };

  const closeAdminManEdit = () => setOpenEdit(false);

  // Delete Controllers

  const [openDelete, setOpenDelete] = useState(false);
  const [infoDelete, setInfoDelete] = useState({});

  const requestAdminManDelete = async (id) => {
    try {
      const result = await AdminManDeleteService(id);
      const { data } = result;
      console.log(id);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleAdminManDelete = (event) => {
    event.preventDefault();

    const { dataset } = event.currentTarget;
    const data = {
      id: dataset.id,
      name: dataset.name,
    };
    setInfoDelete(data);
    setOpenDelete(true);
  };

  const submitAdminManDelete = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(infoDelete.id);
    console.log("Formulario enviado:", infoDelete.id);
    console.log("Formulario convertido a string:", convertedObject.id);
    console.log(`hi la id a eliminar es ${(infoDelete.id, infoDelete.id)}`);
    requestAdminManDelete(infoDelete.id, infoDelete.id);
    requestAdminManList(1);
    closeAdminManDelete();
  };

  const closeAdminManDelete = () => setOpenDelete(false);

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
      <AdminManList
        handleAdminManList={handleAdminManList}
        handleAdminManCreate={handleAdminManCreate}
        handleAdminManEdit={handleAdminManEdit}
        handleAdminManDelete={handleAdminManDelete}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />

      <AdminManCreate
        open={openCreate}
        handleClose={closeAdminManCreate}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValueNew}
        handleFieldChange={handleFieldChangeNew}
        handleSubmit={submitAdminManCreate}
      />

      <AdminManEdit
        open={openEdit}
        handleClose={closeAdminManEdit}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValue}
        handleFieldChange={handleFieldChange}
        handleSubmit={submitAdminManEdit}
      />

      <AdminManDelete
        openDelete={openDelete}
        closeDelete={closeAdminManDelete}
        infoDelete={infoDelete}
        submitDelete={submitAdminManDelete}
      />
    </>
  );
}
