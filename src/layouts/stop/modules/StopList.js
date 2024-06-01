/*
*/
import { Pagination, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";

export default function StopList({
  dataStopList,
  error,
  pageIndexAndPageSize,
  entriesStart,
  entriesEnd,
  totalData,
  totalPages,
  currentPage,
  handlePageChange,
}) {
  return (
    <>
      <DataTable
        table={{
          columns: [
            { Header: "employee", accessor: "employee_id", width: "25%" },
            { Header: "estado", accessor: "status_id", width: "25%" },
            { Header: "inicio", accessor: "start_date", width: "12%" },
            { Header: "fin", accessor: "end_date", width: "12%" },
          ],
          rows: dataStopList
            ? dataStopList.map((stop) => {
                return {
                id: stop.id,
                  employee_id: stop.employee_id,
                  status_id: stop.status_id,
                  start_date: new Date(stop.start_date).toISOString().slice(0, 10),
                  end_date: null ? new Date(stop.end_date).toISOString().slice(0, 10) : '',
                  create_at: new Date(stop.created_at).toISOString().slice(0, 10),
                  updated_at: new Date(stop.updated_at).toISOString().slice(0, 10),
                };
              })
            : [],
        }}
        pageIndexAndPageSize={pageIndexAndPageSize}
        canSearch={false}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
      />
      {error ? (
        <MDBox style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MDTypography
            style={{ left: "20px", fontSize: "20px" }}
            variant="button"
            color="secondary"
            fontWeight="regular"
          >
            {error}
          </MDTypography>
        </MDBox>
      ) : dataStopList?.length === 0 || !dataStopList ? (
        <MDBox style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MDTypography
            style={{ left: "20px", fontSize: "20px" }}
            variant="button"
            color="secondary"
            fontWeight="regular"
          >
            No hay datos
          </MDTypography>
        </MDBox>
      ) : (
        <>
          <MDBox style={{ marginLeft: "20px" }} mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              style={{ left: "20px" }}
              variant="button"
              color="secondary"
              fontWeight="regular"
            >
              Mostrando {entriesStart} hasta {entriesEnd} de {totalData} resultados en total
            </MDTypography>
          </MDBox>
          <Stack style={{ marginLeft: "20px", marginBottom: "10px" }} spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            ></Pagination>
          </Stack>{" "}
        </>
      )}
    </>
  );
}
