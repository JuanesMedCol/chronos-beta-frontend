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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MDButton from "components/MDButton";

export default function ListCardType({
  dataTypeCard,
  error,
  pageIndexAndPageSize,
  entriesStart,
  entriesEnd,
  totalData,
  totalPages,
  currentPage,
  handlePageChange,
  handleOpenNew,
  handleOpenEdit,
  handleClickDelete,
}) {
  return (
    <>
      <MDBox style={{ display: "flex", justifyContent: "flex-end", marginRight: "2vw" }}>
        <MDButton onClick={handleOpenNew} variant="gradient" color="info">
          Crear
        </MDButton>
      </MDBox>
      <DataTable
        table={{
          columns: [
            { Header: "nombre", accessor: "name", width: "12%" },
            { Header: "vigencia", accessor: "expires_in", width: "12%" },
            { Header: "creado", accessor: "created", width: "12%" },
            { Header: "actualizado", accessor: "updated", width: "12%" },
            { Header: "ver detalles", accessor: "view", width: "12%" },
          ],
          rows: dataTypeCard
            ? dataTypeCard.map((type) => {
                return {
                  name: type.name,
                  expires_in: type.expiration_time,
                  created: new Date(type.created_at).toISOString().slice(0, 10),
                  updated: new Date(type.updated_at).toISOString().slice(0, 10),
                  view: (
                    <>
                      <a
                        data-identifier={type.id}
                        data-name={type.name}
                        data-expired={type.expiration_time}
                        data-created={type.created_at}
                        data-updated={type.updated_at}
                        data-id={"view"}
                        onClick={handleOpenEdit}
                        style={{ cursor: "pointer" }}
                      >
                        {/*<img src={verTablaImg}></img>*/}
                        {
                          <RemoveRedEyeOutlinedIcon
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
                        data-identifier={type.id}
                        data-name={type.name}
                        data-expired={type.expiration_time}
                        data-created={type.created_at}
                        data-updated={type.updated_at}
                        data-id={"edit"}
                        onClick={handleOpenEdit}
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
                      <a
                        data-identifier={type.id}
                        data-name={type.name}
                        data-expired={type.expiration_time}
                        data-created={type.created_at}
                        data-updated={type.updated_at}
                        data-id={"delete"}
                        onClick={handleClickDelete}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                      >
                        <DeleteForeverOutlinedIcon
                          style={{
                            fontSize: "200px",
                            width: "24px",
                            height: "24px",
                            backgroundImage: "#000000",
                          }}
                        ></DeleteForeverOutlinedIcon>
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
      ) : dataTypeCard?.length === 0 || !dataTypeCard ? (
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
