export const JobsListService = 
    async (pageIndex) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + `/jobs?page=${pageIndex}`);
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