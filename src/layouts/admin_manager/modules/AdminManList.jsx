import { Pagination, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import verDetallesImg from "assets/images/ver_detalles.svg";
import verTablaImg from "assets/images/ver tabla.svg";
import PropTypes from "prop-types";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import MDButton from "components/MDButton";

export default function AdminManList({
  handleAdminManCreate,
  handleAdminManList,
  handleAdminManEdit,
  handleAdminManDelete,
}) {
  return (
    <>
      <MDBox style={{ display: "flex", justifyContent: "flex-end", marginRight: "2vw" }}>
        <MDButton onClick={handleAdminManCreate} variant="gradient" color="info">
          Crear
        </MDButton>
      </MDBox>
      <DataTable
        table={{
          columns: [
            { Header: "nombre", accessor: "name", width: "25%" },
            { Header: "descripcion", accessor: "description" },
            { Header: "ver detalles", accessor: "ver", width: "12%" },
          ],
          rows: handleAdminManList
            ? handleAdminManList.map((adminMan) => {
                return {
                  name: adminMan.name,
                  lastname: adminMan.description,
                  ver: (
                    <>
                      <a href="#">
                        <img src={verDetallesImg} />
                      </a>
                      <a
                        data-identifier={adminMan.id}
                        onClick={handleAdminManEdit}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
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
      />

      {!handleAdminManList ? (
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
          <div></div>
        </>
      )}
    </>
  );
}
