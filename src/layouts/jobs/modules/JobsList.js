/*
*/
import { Pagination, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";

export default function JobsList({
  handleList,
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
            { Header: "nombre", accessor: "name", width: "25%" },
            { Header: "creado", accessor: "create_at", width: "12%" },
            { Header: "actualizado", accessor: "updated_at", width: "12%" },
          ],
          rows: handleList
            ? handleList.map((user) => {
                return {
                  name: user.name,
                  lastname: user.lastname,
                  number_id: user.number_id,
                  email: user.email,
                  create_at: new Date(user.created_at).toISOString().slice(0, 10),
                  updated_at: new Date(user.updated_at).toISOString().slice(0, 10),
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
      ) : handleList?.length === 0 || !handleList ? (
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
