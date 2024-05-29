export const UserListService = async (pageIndex) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users?page=${pageIndex}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const { payload } = await response.json();
    console.log(payload);
    return { payload };
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const UserByIDService = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/user/${id}`, {
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

/*export const UserCreateService = async (payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await response.json();
    const { success, code, data } = result;
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
};*/

export const UserCreateService = async (prueba) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prueba),
    });
    const result = await response.json();
    console.log(result);
    const { success, code, payload } = result;

    if (success === true) {
      console.log(result);
    } else if (success === false) {
      console.log(result);
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

export const UserUpdateService = async (id, payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    const { success, code, data } = result;
    console.log(result);
    if (success === true) {
      const {
        payload: { data },
      } = result;
      return { data };
      console.log(data);
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

export const UserDeleteService = async (id, payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/delete/${id}`, {
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
