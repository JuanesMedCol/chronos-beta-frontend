import { useEffect, useState } from "react";
import {
  UserCreateService,
  UserListService,
  UserUpdateService,
  UserDeleteService,
  UserByIDService,
} from "../services/UserService";
import UserList from "../modules/UserList";
import { UserCreate } from "../modules/UserCreate";
import { UserEdit } from "../modules/UserEdit";
import { UserDelete } from "../modules/UserDelete";
import { RoleListService } from "layouts/role/services/RoleService";

export default function UserController() {
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
  const [handleRoleList, setRoleList] = useState();

  const requestRoleList = async () => {
    const result = await RoleListService();
    if (result && result.payload) {
      const { payload } = result;
      const rolePermitsArray = Object.entries(payload);
      console.log(rolePermitsArray);

      setRoleList(rolePermitsArray);
    }
  };

  useEffect(() => {
    requestRoleList();
  }, []);

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

  const requestUserByID = async (idUser) => {
    try {
      const user = await UserByIDService(idUser);
      const { payload } = user;
      return { payload };
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const requestListRoles = async () => {
    try {
      const listRoles = await RoleListService(1);
      const { data } = listRoles;
      return { data };
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // List Controllers

  const [handleUserList, setUserList] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesStart, setEntriesStart] = useState(0);
  const [entriesEnd, setEntriesEnd] = useState(0);
  const [paginaSize, setPaginaSize] = useState(10);

  const requestUserList = async (pageIndex) => {
    const result = await UserListService(1);
    if (result) {
      const { payload } = result;
      await setUserList(payload.data);
      await setTotalPages(payload.last_page);
      await setTotalData(payload.total);
      console.log(payload.data);
      await setEntriesStart(payload.from);
      await setEntriesEnd(payload.to);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageIndexAndPageSize = async (pageSize) => {
    await setPaginaSize(pageSize);
    requestUserList(currentPage === 1 ? currentPage : (currentPage - 1) * pageSize + 1);
  };

  useEffect(() => {
    requestUserList(currentPage);
    console.log("probando");
  }, [currentPage]);

  // List Role Controllers
  /*
  const [handleRoleList, setRoleList] = useState();

  const requestRoleList = async (pageIndex) => {
    const result = await RoleListService(pageIndex);
    if (result && result.payload) {
      const { payload } = result;
      const roleArray = Object.entries(payload.data);
      console.log("si llega", payload.data);
      setRoleList(payload.data);
    }
  };

  useEffect(() => {
    requestRoleList();
  }, []);
 */

  // Create Controllers

  const [openCreate, setOpenCreate] = useState(false);

  const handleUserCreate = (event) => {
    event.preventDefault();
    setIsDisabled(false);
    const data = {
      name: "",
      lastname: "",
      email: "",
      status: "",
      role_id: "",
    };
    console.log(data);
    setDefaultData(data);
    setNewData(data);
    setOpenCreate(true);
  };

  const submitUserCreate = async (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(newData);
    console.log("Formulario enviado:", newData);
    console.log("Formulario convertido a string:", convertedObject);
    await UserCreateService(newData);
    console.log("hola");
    requestUserList(1);
    closeUserCreate();
  };

  const closeUserCreate = () => setOpenCreate(false);

  // Edit Controllers

  const [openEdit, setOpenEdit] = useState(false);
  const [listRoles, setLisRoles] = useState([]);

  const handleUserEdit = async (event) => {
    event.preventDefault();
    setIsDisabled(event.currentTarget.dataset.id === "view" ? true : false);
    const user = await requestUserByID(event.currentTarget.dataset.id);
    const listRoles = await requestListRoles();
    setRecoveredData(user.payload);
    setEditedData(user.payload);
    setLisRoles(listRoles);
    setOpenEdit(true);
  };

  const submitUserEdit = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(editedData);
    console.log("Formulario enviado:", editedData);
    console.log("Formulario convertido a string:", convertedObject);
    UserUpdateService(editedData.id, editedData);
    requestUserList(1);
    closeUserEdit();
  };

  const closeUserEdit = () => setOpenEdit(false);

  // Delete Controllers

  const [openDelete, setOpenDelete] = useState(false);
  const [infoDelete, setInfoDelete] = useState({});

  const requestUserDelete = async (id) => {
    try {
      const result = await UserDeleteService(id);
      const { data } = result;
      console.log(id);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleUserDelete = (event) => {
    event.preventDefault();

    const { dataset } = event.currentTarget;
    const data = {
      id: dataset.id,
      name: dataset.name,
      lastname: dataset.lastname,
      email: dataset.email,
      status: dataset.status,
      role_id: dataset.role_id,
    };
    setInfoDelete(data);
    setOpenDelete(true);
  };

  const submitUserDelete = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(infoDelete.id);
    console.log("Formulario enviado:", infoDelete.id);
    console.log("Formulario convertido a string:", convertedObject.id);
    console.log(`hi la id a eliminar es ${(infoDelete.id, infoDelete.id)}`);
    requestUserDelete(infoDelete.id, infoDelete.id);
    requestUserList(1);
    closeUserDelete();
  };

  const closeUserDelete = () => setOpenDelete(false);

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
      <UserList
        handleUserList={handleUserList}
        handleUserCreate={handleUserCreate}
        handleUserEdit={handleUserEdit}
        handleUserDelete={handleUserDelete}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />

      <UserCreate
        open={openCreate}
        handleClose={closeUserCreate}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValueNew}
        handleFieldChange={handleFieldChangeNew}
        handleSubmit={submitUserCreate}
      />

      <UserEdit
        open={openEdit}
        handleClose={closeUserEdit}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValue}
        handleFieldChange={handleFieldChange}
        handleSubmit={submitUserEdit}
        listRoles={listRoles}
      />

      <UserDelete
        openDelete={openDelete}
        closeDelete={closeUserDelete}
        infoDelete={infoDelete}
        submitDelete={submitUserDelete}
      />
    </>
  );
}
