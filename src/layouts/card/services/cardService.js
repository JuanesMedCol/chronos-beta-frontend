/*
*/
import React from "react";

const getCard = async (id, pageIndex) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cards/cards_per_user/${id}?page=${pageIndex}`
    );
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

export { getCard };
