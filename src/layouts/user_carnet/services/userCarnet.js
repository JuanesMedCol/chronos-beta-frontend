/*
*/
import React from "react";
import { date } from "yup";

const url = process.env.REACT_APP_API_URL;
const getCarnetUser = async (pageIndex) => {
  try {
    const response = await fetch(url + `/cards/get_more_info?page=${pageIndex}`);
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data, last_page, total, from, to },
      } = result;
      return { data, last_page, total, from, to };
    } else if (success === false) {
      const message = "Error del servidor al realizar la solicitud";
      const status = false;
      return { status, message };
      //throw new Error(`Error del servidor al realizar la solicitud`);
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    const message = "Error del servidor al realizar la solicitud";
    const status = false;
    return { status, message };
  }
};
const getUserId = async (idUser) => {
  try {
    const response = await fetch(url + `/card_users/card_user/${idUser}`);
    const { id, name, lastname, number_id, email, created_at } = await response.json();
    //console.log(name);
    return { id, name, lastname, number_id, email, created_at };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};
const getTypeCarnets = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_BASE_URL + `/card_types/`);
    const {
      payload: { data, last_page, total, from, to },
    } = await response.json();
    //console.log(name);
    return { data, last_page, total, from, to };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

const getCarnetUserFilterDate = async (
  pageIndex,
  pageSize,
  carnetbuscado,
  tipofiltro1,
  tipofiltro2,
  dateFrom,
  dateUntil
) => {
  try {
    let url = `/cards/cards_per_filter?page=${pageIndex}&pageSize=${pageSize}`;
    if (tipofiltro1 && tipofiltro1 !== "" && carnetbuscado && carnetbuscado !== "") {
      url += `&type_filter=${tipofiltro1}&search=${carnetbuscado}`;
    }
    /*
    if (carnetbuscado && carnetbuscado !== "") {
      url += `&search=${carnetbuscado}`;
    }
    */
    if (
      tipofiltro2 &&
      tipofiltro2 !== "" &&
      dateFrom &&
      dateFrom !== "" &&
      dateFrom !== "date" &&
      dateUntil &&
      dateUntil !== "" &&
      dateUntil !== "date"
    ) {
      url += `&type_date=${tipofiltro2}&dateFrom=${dateFrom}&dateUntil=${dateUntil}`;
    }
    /*
    if (dateFrom && dateFrom !== "" && dateFrom !== "date") {
      url += `&dateFrom=${dateFrom}`;
    }
    if (dateUntil && dateUntil !== "" && dateUntil !== "date") {
      url += `&dateUntil=${dateUntil}`;
    }
    */
    const response = await fetch(process.env.REACT_APP_API_URL + url);
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data, last_page, total, from, to },
      } = result;
      return { data, last_page, total, from, to, success };
    } else if (success === false) {
      const message = "Error del servidor al realizar la solicitud";
      const status = false;
      return { status, message };
      //throw new Error(`Error del servidor al realizar la solicitud`);*/
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    const message = "Error del servidor al realizar la solicitud";
    const status = false;
    return { status, message };
  }
};

export { getCarnetUser, getCarnetUserFilterDate, getUserId, getTypeCarnets };
