/*
*/
import React, { useState, useEffect, useRef } from "react";
import ListCarnets from "../modules/ListCarnets";
import {
  getCarnetUser,
  getCarnetUserFilterDate,
  getTypeCarnets,
  getUserId,
} from "../services/userCarnet";
import ViewUserPerCard from "../modules/ViewUserPerCard";

export default function UserListController() {
  const [limitResult, setLimitResult] = useState([
    {
      id: "1",
      status: "active",
      created: "2023-10-23",
      updated_at: "2023-10-24",
      card_user_id: "22",
      card_type_id: "25",
    },
    {
      id: "2",
      status: "active",
      created: "2023-10-23",
      updated_at: "2023-10-24",
      card_user_id: "22",
      card_type_id: "25",
    },
  ]);
  //const [paginaIndex, setPaginaIndex] = useState(0);
  //const [listCarnets2, setListCarnets2] = useState([]);
  //const [displayedData, setDisplayedData] = useState([]);
  const [userId, setUserId] = useState({});

  //Lógica para la tabla de listar usuarios carnetizados ---->
  const [listCarnets, setListCarnets] = useState();
  const [error, setError] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesStart, setEntriesStart] = useState(0);
  const [entriesEnd, setEntriesEnd] = useState(0);
  const [paginaSize, setPaginaSize] = useState(10);
  const requestCarnets = async (pageIndex) => {
    try {
      const result = await getCarnetUser(pageIndex);
      if (result.status !== false) {
        const { data, last_page, total, from, to } = result;
        //console.log(carnets);
        //console.log(`${pageIndex} - ${pageSize}`);
        await setListCarnets(data);
        //await setListCarnets2(data);
        await setTotalPages(last_page);
        if (last_page <= pageIndex) {
          await setCurrentPage(last_page);
        }
        await setTotalData(total);
        await setEntriesStart(from);
        await setEntriesEnd(to);
        setError("");
      } else {
        setError("Error al consultar al servidor");
      }
    } catch (error) {
      setError("Error al consultar al servidor");
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
    //setEntriesStart(currentPage === 1 ? currentPage : (currentPage - 1) * paginaSize + 1);
    searchValidation(currentPage, paginaSize);
  }, [currentPage]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  // <-------

  //Lógica para el filtrado de la tabla de usuarios carnetizados ---->
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("date");
  const [dateUntil, setDateUntil] = useState("date");
  const [filter, setFilter] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDate, setIsVisibleDate] = useState(false);
  const [isVisibleSelectDate, setIsVisibleSelectDate] = useState(false);

  const searchValidation = (currentPage, paginaSize) => {
    requestCarnetsDate(currentPage, paginaSize, search, filter, filterDate, dateFrom, dateUntil);

    // requestCarnets(currentPage, paginaSize);
  };

  const requestCarnetsDate = async (
    pageIndex,
    pageSize,
    carnetbuscado,
    tipofiltro1,
    tipofiltro2,
    dateFrom,
    dateUntil
  ) => {
    try {
      const result = await getCarnetUserFilterDate(
        pageIndex,
        10,
        carnetbuscado,
        tipofiltro1,
        tipofiltro2,
        dateFrom,
        dateUntil
      );

      if (result.status !== false) {
        const { data, last_page, total, from, to } = result;
        console.log(data);
        console.log(`${pageIndex}`);
        await setListCarnets(data);
        //await setListCarnets2(data);
        await setTotalPages(last_page);
        if (last_page <= pageIndex) {
          await setCurrentPage(last_page);
        }
        await setTotalData(total);
        await setEntriesStart(from);
        await setEntriesEnd(to);
        setError("");
      } else {
        setError("Error al consultar al servidor");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setFilter(event.target.value);
      setIsVisible(false);
      setIsVisibleSelectDate(false);
      setIsVisibleDate(false);
      setSearch("");
      setFilterDate("");
      setDateFrom("date");
      setDateUntil("date");
      requestCarnets(currentPage, paginaSize);
      return;
    }
    setFilter(event.target.value);
    setIsVisible(true);
  };

  const handleFilterDate = (event) => {
    if (event.target.value === "") {
      setFilterDate(event.target.value);
      setDateFrom("date");
      setDateUntil("date");
      setIsVisibleDate(false);
      return;
    }
    setFilterDate(event.target.value);
    setIsVisibleDate(true);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setIsVisibleSelectDate(true);
  };
  const handleChange = (event) => {
    event.preventDefault();
    const searchIsString = event.target.value;
    if (searchIsString.startsWith(" ")) return;
    setSearch(searchIsString.toString());
    if (filter === "") return;
  };

  const handleChangeDateFrom = (event) => {
    if (event.target.value !== "") {
      const date = new Date(event.target.value);
      let formatDate = date.toISOString().slice(0, 10);
      if (dateUntil !== "" && dateUntil !== "date") {
        if (formatDate > dateUntil) {
          formatDate = dateUntil;
        }
      }
      setDateFrom(formatDate);
    } else {
      setDateFrom("date");
    }
  };

  const handleChangeDateUntil = (event) => {
    if (event.target.value !== "") {
      const date = new Date(event.target.value);
      let formatDate = date.toISOString().slice(0, 10);
      if (dateFrom !== "" && dateFrom !== "date") {
        if (formatDate < dateFrom) {
          formatDate = dateFrom;
        }
      }
      setDateUntil(formatDate);
    } else {
      setDateUntil("date");
    }
  };

  const handleClickSubmit = (event) => {
    event.preventDefault();
    searchValidation(currentPage, paginaSize);
  };
  // <-------

  //Lógica para el modal de vista ---->
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [viewData, setViewData] = useState({});
  const [typeCarnets, setTypeCarnets] = useState([]);

  const requestTypeCarnets = async () => {
    try {
      const result = await getTypeCarnets();
      const { data } = result;
      setTypeCarnets(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  const handleOpenToModal = async (event) => {
    event.preventDefault();
    const { dataset } = event.currentTarget;
    await requestTypeCarnets();
    const data = {
      status: dataset.status,
      created: new Date(dataset.created).toISOString().slice(0, 10),
      expired: new Date(dataset.expired).toISOString().slice(0, 10),
      name_user: dataset.name,
      last_name_user: dataset.lastname,
      number_id_user: dataset.dni,
      email_user: dataset.email,
      type_card: dataset.type,
    };
    setViewData(data);
    setIsOpenModal(true);
    //console.log(data);
  };

  const handleCloseToModal = (event) => {
    event.preventDefault();
    setIsOpenModal(false);
  };
  //Obtener valor por clave especifica del objeto
  const getFieldValue = (fieldName) => {
    return viewData[fieldName];
  };
  // <-------

  //Lógica para crear ---->

  // <-------

  //Lógica para editar ---->

  // <-------

  //Lógica para eliminar ---->

  // <-------

  const pageIndexAndPageSize = async (pageSize) => {
    await setPaginaSize(pageSize);
    await setEntriesStart(currentPage === 1 ? currentPage : (currentPage - 1) * pageSize + 1);
    //await requestCarnets(currentPage, pageSize);
    searchValidation(currentPage, pageSize);
  };
  /*
  const requestUserPerId = async (idUser) => {
    try {
      const user = await getUserId(idUser);
      const { id, name, lastname, number_id, email, created_at } = user;
      // console.log(user);
      //console.log(`${pageIndex} - ${pageSize}`);
      await setUserId({
        id: id,
        name: name,
        lastname: lastname,
        number_id: number_id,
        email: email,
        created: created_at,
      });
      return { id, name, lastname, number_id, email, created_at };
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  */

  //const totalPages = Math.ceil(carnetsTotal / paginaSize);

  return (
    <>
      <ListCarnets
        filter={filter}
        handleFilter={handleFilter}
        isVisible={isVisible}
        handleChange={handleChange}
        search={search}
        handleClick={handleClick}
        isVisibleSelectDate={isVisibleSelectDate}
        filterDate={filterDate}
        handleFilterDate={handleFilterDate}
        isVisibleDate={isVisibleDate}
        dateFrom={dateFrom}
        dateUntil={dateUntil}
        handleChangeDateFrom={handleChangeDateFrom}
        handleChangeDateUntil={handleChangeDateUntil}
        handleClickSubmit={handleClickSubmit}
        listCarnets={listCarnets}
        limitResult={limitResult}
        error={error}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        paginaSize={paginaSize}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleOpenToModal={handleOpenToModal}
      ></ListCarnets>
      <ViewUserPerCard
        isOpenModal={isOpenModal}
        handleCloseToModal={handleCloseToModal}
        isDisabled={isDisabled}
        typeCarnets={typeCarnets}
        getFieldValue={getFieldValue}
      ></ViewUserPerCard>
    </>
  );
}
