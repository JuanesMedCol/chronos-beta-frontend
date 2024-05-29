/*
*/
const getSources = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/data/fuente`);
    const { fuentes, totalFuentes } = await response.json();
    return { fuentes, totalFuentes };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};
const getSourceTypes = async (pageIndex) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sources?page=${pageIndex}`);
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
const createSource = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sources/upload_file`, {
      method: "POST", // Usa 'PUT' para actualizar un recurso existente.
      //headers: {
      //"Content-Type": "application/json",
      //},
      body: data, // Convierte el objeto 'data' a una cadena JSON y envíalo en el cuerpo de la solicitud.
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};
const updateSource = async (id, data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/data/fuente/edit?id=${id}`, {
      method: "PUT", // Usa 'PUT' para actualizar un recurso existente.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convierte el objeto 'data' a una cadena JSON y envíalo en el cuerpo de la solicitud.
    });
    const { fuentes } = await response.json();
    console.log(fuentes);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export { getSources, createSource, updateSource, getSourceTypes };
