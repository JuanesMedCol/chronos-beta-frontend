/*
*/
import { Box, Card, Divider, Icon, Modal, Pagination, Stack, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";
import verDetallesImg from "assets/images/ver_detalles.svg";
import PropTypes from "prop-types";
import data from "layouts/tables/data/authorsTableData";
import MDBadge from "components/MDBadge";
import DownloadIcon from "@mui/icons-material/Download";

export default function CardListPerUser({
  openBoard,
  dataCard,
  name,
  error,
  pageIndexAndPageSize,
  entriesStart,
  entriesEnd,
  totalData,
  totalPages,
  currentPage,
  handlePageChange,
  handleClose,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "1000px",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={openBoard}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <MDBox
            mt={-7}
            color="white"
            bgColor="info"
            variant="gradient"
            borderRadius="lg"
            p={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Typography id="modal-modal-title" component="h2">
              Carnets del usuario:{` ${name}`}
            </Typography>
            <Icon
              sx={{
                fontSize: "2em",
                stroke: "currentColor",
                strokeWidth: "2px",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={handleClose}
            >
              close
            </Icon>
          </MDBox>
          <Divider variant="middle" />
          <DataTable
            table={{
              columns: [
                { Header: "Carnet", accessor: "type_carnet" },
                { Header: "estado", accessor: "status" },
                { Header: "creado", accessor: "created" },
                { Header: "vigencia", accessor: "expires_in" },
                { Header: "actualizado", accessor: "updated_at" },
                { Header: "descargar", accessor: "view" },
              ],
              rows: dataCard
                ? dataCard.map((card) => {
                    return {
                      type_carnet: card.card_type_name,
                      id: card.id,
                      status:
                        card.status === "active" ? (
                          <MDBadge badgeContent="Activo" size="xs" container color="success" />
                        ) : (
                          <MDBadge badgeContent="Inactivo" size="xs" container color="error" />
                        ),
                      created: new Date(card.created).toISOString().slice(0, 10),
                      expires_in: new Date(card.expires_in).toISOString().slice(0, 10),
                      updated_at: new Date(card.updated_at).toISOString().slice(0, 10),
                      view: (
                        <a href={`${process.env.REACT_APP_API_URL}/cards/card_file/${card.id}`}>
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
          ) : dataCard?.length === 0 ? (
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
        </Card>
      </Modal>
    </>
  );
}
