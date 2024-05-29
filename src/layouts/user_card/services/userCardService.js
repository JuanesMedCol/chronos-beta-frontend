/*
*/
import React from "react";

const getCardUsers = async (pageIndex) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + `/jobs?page=${pageIndex}`);
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        data
      } = result;
      return { data };
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

const getCard = async (id, pageIndex) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/cards/cards_per_user/${id}?page=${pageIndex}`
    );
    // const { users } = await response.json();
    const { data, last_page, total, from, to } = await response.json();
    //const { data, last_page, total, from, to } = users;
    return { data, last_page, total, from, to };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};
const editUserCard = async (id, editTypeCard) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/card_users/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTypeCard),
    });
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      console.log(result);
      return result;
    } else if (success === false) {
      const message = "Error del servidor al realizar la solicitud";
      const status = false;
      return { status, message };
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    const message = "Error del servidor al realizar la solicitud";
    const status = false;
    return { status, message };
  }
};

export { getCardUsers, getCard, editUserCard };
