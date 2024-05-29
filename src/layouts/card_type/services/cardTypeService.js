import React from "react";
//import { useAuth } from "../../../context/index";
//const { token, login, logout } = useAuth();
const getCardTypes = async (pageIndex) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/card_types?page=${pageIndex}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    //console.log(token);
    // const { users } = await response.json();
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
/*
const createCardTypes = async (newCardType) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/card_types/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCardType),
      }
    );
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data },
      } = result;
      console.log(result);
      return { data };
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
*/
const createCardTypes = async (newCardType) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/card_types/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCardType),
    });
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data },
      } = result;
      console.log(result);
      return { data };
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
const updatedCardTypes = async (id, editTypeCard) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/card_types/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTypeCard),
    });
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data },
      } = result;
      console.log(result);
      return { data };
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

const deleteCardTypes = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/card_types/delete/${id}`);
    // const { users } = await response.json();
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      console.log("Se elimino exitosamente el tipo de carnet");
      const message = "eliminado exitosamente";
      const status = true;
      return { status, message };
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

export { getCardTypes, createCardTypes, updatedCardTypes, deleteCardTypes };
