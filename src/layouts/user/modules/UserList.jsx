import { Pagination, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import MDButton from "components/MDButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MDBadge from "components/MDBadge";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserList({
  handleUserCreate,
  handleUserList,
  handleUserEdit,
  handleUserDelete,
}) {
  return (
    <>
      <MDBox style={{ display: "flex", justifyContent: "flex-end", marginRight: "2vw" }}>
        <MDButton onClick={handleUserCreate} variant="gradient" color="info">
          Crear
        </MDButton>
      </MDBox>
      <DataTable
        table={{
          columns: [
            { Header: "e-mail", accessor: "email", width: "25%" },
            { Header: "nombre", accessor: "name", width: "25%" },
            { Header: "apellido", accessor: "lastname", width: "25%" },
            { Header: "role", accessor: "role", width: "5%" },
            { Header: "estado", accessor: "status", width: "5%" },
            { Header: "ver detalles", accessor: "ver", width: "12%" },
          ],
          rows: handleUserList
            ? handleUserList.map((userMan) => {
                return {
                  id: userMan.id,
                  email: userMan.email,
                  name: userMan.name,
                  lastname: userMan.lastname,
                  role: userMan.role.name,
                  status:
                    userMan.status === "1" ? (
                      <MDBadge badgeContent="Activo" size="xs" container color="success" />
                    ) : (
                      <MDBadge badgeContent="Inactivo" size="xs" container color="error" />
                    ),
                  ver: (
                    <>
                      {/*<a href="#">
                        <img src={verDetallesImg} />
                      </a>*/}
                      <a
                        data-id={userMan.id}
                        data-name={userMan.name}
                        onClick={handleUserEdit}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                      >
                        {/*<img src={verTablaImg}></img>*/}
                        {
                          <EditOutlinedIcon
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
                        data-id={userMan.id}
                        data-name={userMan.name}
                        onClick={handleUserDelete}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                      >
                        {/*<img src={verTablaImg}></img>*/}
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
      {!handleUserList ? (
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
