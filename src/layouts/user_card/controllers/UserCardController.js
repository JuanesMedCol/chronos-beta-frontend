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
      /*
    //ejemplo de datos para la tabla user_card
    const data1 = [
      {
        id: "01825096-0cb2-4407-b678-6984634353cc",
        name: "Mckenna",
        lastname: "Labadie",
        number_id: "5035374",
        email: "bret.howe@example.org",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
      {
        id: "02bcd937-1c78-4207-871c-e10e443223b1",
        name: "Rodrick",
        lastname: "Gutmann",
        number_id: "6838194",
        email: "rstokes@example.org",
        created_at: "2023-10-10T18:54:51.000000Z",
        updated_at: "2023-10-10T18:54:51.000000Z",
      },
      {
        id: "0344a1a0-c58b-46c1-9329-3fa4991b7146",
        name: "Jack",
        lastname: "Luettgen",
        number_id: "52141253",
        email: "raoul01@example.net",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
      {
        id: "034bff68-87fd-4a58-b80b-f8d43fd79b26",
        name: "Afton",
        lastname: "Reynolds",
        number_id: "32592029",
        email: "predovic.emelie@example.org",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
      {
        id: "06892155-19ac-4c02-96f7-f22b65a58216",
        name: "Mortimer",
        lastname: "McClure",
        number_id: "80512502",
        email: "vlubowitz@example.com",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
      {
        id: "08587538-3b69-4c74-a5a4-7a1aef46ec48",
        name: "Fernando",
        lastname: "Kub",
        number_id: "59755791",
        email: "shanel85@example.net",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
      {
        id: "0c7103f5-05b4-4e04-9bbe-7d41712bee9d",
        name: "Matilda",
        lastname: "Padberg",
        number_id: "62148448",
        email: "devon.hilpert@example.net",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
      {
        id: "169c5cb1-8eb2-46d9-9e99-f60c9580a74f",
        name: "Lew",
        lastname: "Murphy",
        number_id: "23745436",
        email: "watsica.garrett@example.net",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
      {
        id: "187c9935-7529-42f1-b0f9-7c09392c6a91",
        name: "Linnea",
        lastname: "Ritchie",
        number_id: "51821104",
        email: "cbartell@example.org",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
      {
        id: "1971cd00-8e75-402a-989d-6799f68fc1a3",
        name: "Agnes",
        lastname: "Keeling",
        number_id: "69088316",
        email: "roxane77@example.com",
        created_at: "2023-10-10T18:54:52.000000Z",
        updated_at: "2023-10-10T18:54:52.000000Z",
      },
    ];
    */
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
