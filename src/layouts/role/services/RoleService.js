/*
*/

export const RoleListService = async (pageIndex) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/roles?page=${pageIndex}`, {
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

export const RolePermisionsListService = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/permissions`, {
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

export const RoleByIDService = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/roles/rol/${id}`, {
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

export const RoleCreateService = async (payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/roles/create`, {
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

export const RoleUpdateService = async (id, payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/roles/edit/${id}`, {
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

export const RoleDeleteService = async (id, payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/roles/delete/${id}`, {
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
