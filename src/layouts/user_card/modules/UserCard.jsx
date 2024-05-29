/*
*/
import { Pagination, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import verDetallesImg from "assets/images/ver_detalles.svg";
import verTablaImg from "assets/images/ver tabla.svg";
import PropTypes from "prop-types";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function UserCard({
  dataCardUser,
  error,
  pageIndexAndPageSize,
  entriesStart,
  entriesEnd,
  totalData,
  totalPages,
  currentPage,
  handlePageChange,
  handleOpenCardBoard,
  handleOpenModalEdit,
}) {
  return (
    <>
      <DataTable
        table={{
          columns: [
            { Header: "nombre", accessor: "name", width: "25%" },
            { Header: "creado", accessor: "create_at", width: "12%" },
            { Header: "actualizado", accessor: "updated_at", width: "12%" },
            /*{ Header: "ver detalles", accessor: "ver", width: "12%" },*/
          ],
          rows: dataCardUser
            ? dataCardUser.map((user) => {
                return {
                  name: user.name,
                  lastname: user.lastname,
                  number_id: user.number_id,
                  email: user.email,
                  create_at: new Date(user.created_at).toISOString().slice(0, 10),
                  updated_at: new Date(user.updated_at).toISOString().slice(0, 10),
                  ver: (
                    <>
                      <a
                        data-identifier={user.id}
                        data-name={`${user.name} ${user.lastname}`}
                        onClick={handleOpenCardBoard}
                        style={{ cursor: "pointer" }}
                      >
                        {/*<img src={verTablaImg}></img>*/}
                        {
                          <PreviewOutlinedIcon
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
                        data-identifier={user.id}
                        data-name={user.name}
                        data-lastname={user.lastname}
                        data-numberid={user.number_id}
                        data-email={user.email}
                        onClick={handleOpenModalEdit}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                      >
                        <EditOutlinedIcon
                          style={{
                            fontSize: "200px",
                            width: "24px",
                            height: "24px",
                            backgroundImage: "#000000",
                          }}
                        ></EditOutlinedIcon>
                      </a>
                    </>
                  ),
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
      ) : dataCardUser?.length === 0 || !dataCardUser ? (
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
