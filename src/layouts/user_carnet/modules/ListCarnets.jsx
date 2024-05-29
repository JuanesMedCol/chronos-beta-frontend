/*
*/
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import verDetallesImg from "assets/images/ver_detalles.svg";
import React, { useState, useEffect, useRef } from "react";
import { useAsyncDebounce } from "react-table";
import MDBadge from "components/MDBadge";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Box,
  FormControl,
  Hidden,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDPagination from "components/MDPagination";
import MDTypography from "components/MDTypography";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { date } from "yup";
export default function ListCarnets({
  filter,
  handleFilter,
  isVisible,
  handleChange,
  search,
  handleClick,
  isVisibleSelectDate,
  filterDate,
  handleFilterDate,
  isVisibleDate,
  dateFrom,
  dateUntil,
  handleChangeDateFrom,
  handleChangeDateUntil,
  handleClickSubmit,
  listCarnets,
  error,
  pageIndexAndPageSize,
  entriesStart,
  entriesEnd,
  totalData,
  paginaSize,
  currentPage,
  totalPages,
  handlePageChange,
  handleOpenToModal,
}) {
  return (
    <>
      <MDBox>
        <FormControl style={{ left: "20px" }} variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Filtrado por...</InputLabel>
          <Select
            style={{ width: "auto" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Filtrado por..."
            onChange={handleFilter}
          >
            <MenuItem value="">NINGUNO</MenuItem>
            <MenuItem value={"number_id"}>DOCUMETO</MenuItem>
            <MenuItem value={"name"}>NOMBRE o APELLIDO</MenuItem>
            <MenuItem value={"email"}>CORREO</MenuItem>
          </Select>
        </FormControl>

        <MDInput
          style={{
            left: "20px",
            visibility: isVisible ? "visible" : "hidden",
          }}
          label="Buscar"
          onChange={handleChange}
          value={search}
        />
        <Icon
          color="primary"
          style={{
            display: "inline-block",
            marginLeft: "25px",
            verticalAlign: "middle",
            visibility: isVisible ? "visible" : "hidden",
          }}
        >
          <a onClick={handleClick} title="Agregar más filtros" href="#">
            add_circle
          </a>
        </Icon>
        <FormControl
          style={{ left: "20px", visibility: isVisibleSelectDate ? "visible" : "hidden" }}
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
        >
          <InputLabel
            id="demo-simple-select-label2"
            style={{ visibility: isVisibleSelectDate ? "visible" : "hidden" }}
          >
            Filtrado por fecha
          </InputLabel>
          <Select
            style={{ width: "auto", visibility: isVisibleSelectDate ? "visible" : "hidden" }}
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            value={filterDate}
            label="Filtrado por fecha"
            onChange={handleFilterDate}
          >
            <MenuItem value="">NINGUNO</MenuItem>
            <MenuItem value={"created"}>DE GENERACIÓN</MenuItem>
            {/*<MenuItem value={"ultima_descarga"}>ULTIMA DESCARGA</MenuItem>*/}
            <MenuItem value={"expires_in"}>VIGENCIA</MenuItem>
          </Select>
        </FormControl>
        <MDInput
          type="date"
          style={{ marginLeft: "20px", visibility: isVisibleDate ? "visible" : "hidden" }}
          label="Desde"
          value={dateFrom}
          onChange={handleChangeDateFrom}
        />
        <MDInput
          type="date"
          style={{ marginLeft: "25px", visibility: isVisibleDate ? "visible" : "hidden" }}
          label="Hasta"
          value={dateUntil}
          onChange={handleChangeDateUntil}
        />
      </MDBox>
      <MDButton
        style={{ left: "20px", marginTop: "10px" }}
        variant="gradient"
        color="info"
        onClick={handleClickSubmit}
      >
        Buscar
      </MDButton>
      {/*console.log(listCarnets, limitResult)*/}
      <DataTable
        table={{
          columns: [
            { Header: "dni", accessor: "dni" },
            { Header: "nombre", accessor: "name" },
            { Header: "creado", accessor: "created" },
            { Header: "vigencia", accessor: "expired_in" },
            { Header: "estado", accessor: "status" },
            { Header: "ver detalles", accessor: "view" },
          ],
          rows: listCarnets
            ? listCarnets.map((carnet) => {
                return {
                  id: carnet.id,
                  dni: carnet.number_id,
                  name: `${carnet.card_user_name} ${carnet.card_user_lastname}`,
                  created: new Date(carnet.created).toISOString().slice(0, 10),
                  expired_in: new Date(carnet.expires_in).toISOString().slice(0, 10),
                  status:
                    carnet.status === "active" ? (
                      <MDBadge badgeContent="Activo" size="xs" container color="success" />
                    ) : (
                      <MDBadge badgeContent="Inactivo" size="xs" container color="error" />
                    ),
                  view: (
                    <>
                      <a
                        data-dni={carnet.number_id}
                        data-name={carnet.card_user_name}
                        data-lastname={carnet.card_user_lastname}
                        data-status={carnet.status}
                        data-created={carnet.created}
                        data-expired={carnet.expires_in}
                        data-type={carnet.card_type_name}
                        data-userid={carnet.card_user_id}
                        data-cardtypeid={carnet.card_type_id}
                        style={{ cursor: "pointer" }}
                        onClick={handleOpenToModal}
                      >
                        <FindInPageOutlinedIcon
                          style={{
                            fontSize: "200px",
                            width: "24px",
                            height: "24px",
                            backgroundImage: "#000000",
                          }}
                        ></FindInPageOutlinedIcon>
                        {/*<img src={verDetallesImg} />*/}
                      </a>
                      <a href={`${process.env.REACT_APP_API_URL}/cards/card_file/${carnet.id}`}>
                        <DownloadIcon
                          style={{
                            fontSize: "200px",
                            width: "24px",
                            height: "24px",
                            backgroundImage: "#000000",
                            color: "#7b809a",
                          }}
                        />
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
      ) : listCarnets?.length === 0 || !listCarnets ? (
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
