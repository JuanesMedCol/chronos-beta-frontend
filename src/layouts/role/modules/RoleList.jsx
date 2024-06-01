/*
*/

import React from "react";
import { Pagination, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function RoleList({
  handleRoleCreate,
  handleRoleList,
  handleRoleEdit,
  handleRoleDelete,
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
      <MDBox
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "2vw",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <MDButton onClick={handleRoleCreate} variant="gradient" color="info">
          Crear
        </MDButton>
      </MDBox>
      <DataTable
        table={{
          columns: [
            { Header: "nombre", accessor: "name", width: "25%" },
            { Header: "descripcion", accessor: "description" },
            { Header: "acciones", accessor: "action", width: "12%" },
          ],
          rows: handleRoleList
            ? handleRoleList.map((role) => {
                return {
                  name: role.name,
                  description: role.description,
                  action: (
                    <>
                      <a
                        data-id={role.id}
                        data-name={role.name}
                        data-description={role.description}
                        onClick={handleRoleDelete}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                      >
                        {
                          <DeleteIcon
                            style={{
                              fontSize: "200px",
                              width: "24px",
                              height: "24px",
                              backgroundImage: "#000000",
                            }}
                          />
                        }
                      </a>
                      <a
                        data-id={role.id}
                        data-name={role.name}
                        data-description={role.description}
                        onClick={handleRoleEdit}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                      >
                        {
                          <EditIcon
                            style={{
                              fontSize: "200px",
                              width: "24px",
                              height: "24px",
                              backgroundImage: "#000000",
                            }}
                          />
                        }
                      </a>
                    </>
                  ),
                };
              })
            : [],
        }}
        canSearch={false}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        pageIndexAndPageSize={pageIndexAndPageSize}
      />

      {!handleRoleList ? (
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
