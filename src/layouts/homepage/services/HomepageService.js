export const HomeListService = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + `/stops`);
      const result = await response.json();
      const { success } = result;
      if (success === true) {
        const {
          data
        } = result;
        return { data };
      } else if (success === false) {
        const message = "Error del servidor al realizar la solicitud";
        const status = false;
        return { status, message };
      }
    } 
    catch (error) {
      console.error("Error al obtener datos:", error);
      const message = "Error del servidor al realizar la solicitud";
      const status = false;
      return { status, message };
    }
};

export const StatusService = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + `/status`);
      const result = await response.json();
      const { success } = result;
      if (success === true) {
        const {
          data
        } = result;
        return { data };
      } else if (success === false) {
        const message = "Error del servidor al realizar la solicitud";
        const status = false;
        return { status, message };
      }
    } 
    catch (error) {
      console.error("Error al obtener datos:", error);
      const message = "Error del servidor al realizar la solicitud";
      const status = false;
      return { status, message };
    }
};

export const HomeCreateService = async (prueba) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stops/create`, {
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

  export const HomeEditService = async (prueba) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stops/update/{$id}`, {
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
        const message = "Error del servidor al actualizar la solicitud";
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