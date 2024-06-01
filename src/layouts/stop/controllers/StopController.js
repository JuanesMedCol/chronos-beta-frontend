import React, { useEffect, useState } from "react";
import StopList from "../modules/StopList";
import {
    StopListService,

  } from "../services/StopService";

 export function StopController() {
  // Common Controllers
  const [dataStopList, setDataStopList] = useState();
  const [name, setName] = useState("");
  const [error, setError] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesStart, setEntriesStart] = useState(0);
  const [entriesEnd, setEntriesEnd] = useState(0);
  const [openBoard, setOpenBoard] = useState(false);
  const [idStopList, setIdStopList] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);
  const [recoveredData, setRecoveredData] = useState({});

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

  // List Controllers


  const requestStopList = async (pageIndex) => {
    try {
      const result = await StopListService(pageIndex);
      if (result.status !== false) {
        const { data, last_page, total, from, to } = result;
        await setDataStopList(data);
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
  };


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageIndexAndPageSize = async (pageSize) => {
    await setPaginaSize(pageSize);
    requestStopList(currentPage, pageSize);
  };

  useEffect(() => {
    requestStopList(currentPage);
  }, [currentPage]);

  return (
    <>
      <StopList
        dataStopList={dataStopList}
        error={error}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
}