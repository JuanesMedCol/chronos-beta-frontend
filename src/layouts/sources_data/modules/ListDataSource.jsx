/*
*/
import DataTable from "examples/Tables/DataTable";
import viewSource from "assets/images/ver_fuente.svg";
import editSource from "assets/images/edit_fuente.svg";
import deleteSource from "assets/images/delete_fuente.svg";
import closeImg from "assets/images/close_X.svg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import MDInput from "components/MDInput";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import { createSource, getSources, updateSource } from "../services/dataSourceService";
import MDTypography from "components/MDTypography";

export default function ListDataSource({
  handleOpenNew,
  sourceList,
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
            { Header: "id", accessor: "id", width: "25%" },
            { Header: "nombre", accessor: "nombre", width: "30%" },
            { Header: "fecha de generación", accessor: "fecha_de_generacion" },
            { Header: "fuente de datos", accessor: "fuente_datos", width: "12%" },
            { Header: "usuarios", accessor: "usuarios", width: "12%" },
            { Header: "icono", accessor: "icono", width: "12%" },
          ],
          rows: sourceList
            ? sourceList.map((f) => {
                return {
                  id: f.id,
                  nombre: `${f.nombre}`,
                  fecha_de_generacion: f.fecha_de_generacion,
                  fuente_datos: f.fuente_datos,
                  usuarios: f.usuarios,
                  icono: (
                    <>
                      <a
                        style={{ cursor: "pointer" }}
                        data-identificador={f.id}
                        data-fuente={f.nombre}
                        data-url={f.url}
                        data-estado={f.estado}
                        data-usuarios={f.usuarios}
                        data-fechac={f.fecha_de_generacion}
                        data-perfil={f.perfil}
                        data-programa={f.programa}
                        data-id={"view"}
                        onClick={handleOpenEdit}
                      >
                        <img alt="Ver fila" src={viewSource} />
                      </a>
                      <a
                        data-identificador={f.id}
                        data-fuente={f.nombre}
                        data-url={f.url}
                        data-estado={f.estado}
                        data-usuarios={f.usuarios}
                        data-fechac={f.fecha_de_generacion}
                        data-perfil={f.perfil}
                        data-programa={f.programa}
                        data-id={"editar"}
                        onClick={handleOpenEdit}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                      >
                        <img alt="Ver y editar fila" src={editSource} />
                      </a>
                      <a
                        onClick={handleClickDelete}
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                        data-identificador={f.id}
                        data-fuente={f.nombre}
                      >
                        <img alt="Eliminar fila" src={deleteSource} />
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
        showTotalEntries={sourceList ? true : false}
      ></DataTable>
      {!sourceList && (
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
      )}
    </>
  );
}
