export const AdminManListService = async (pageIndex) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins?page=${pageIndex}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const { payload } = await response.json();
    return { payload };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const AdminManPermisionsListService = async (pageIndex) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/permissions?page=${pageIndex}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const { payload } = await response.json();
    return { payload };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const AdminManByIDService = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/rol/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { payload } = await response.json();
    return { payload };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const AdminManCreateService = async (payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data },
      } = result;
      console.log(payload);
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

export const AdminManUpdateService = async (id, payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(response.body);
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data },
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

export const AdminManDeleteService = async (id, payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/delete/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    const { success, code } = result;
    if (success === true) {
      const {
        payload: { data },
      } = result;
      console.log(payload);
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
