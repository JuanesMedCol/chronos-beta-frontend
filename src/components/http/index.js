import { toast } from "react-toastify";
import { HTTPErrorCode } from "HTTPErrorCode";

const authUser = JSON.parse(localStorage.getItem("user") || "{}");

const headers = {
  "Content-Type": "application/json",
  //Authorization: authUser.jwt !== undefined ? "Bearer " + authUser.jwt : "",
};
/*
const headerFormData = {
  Authorization: authUser.jwt !== undefined ? "Bearer " + authUser.jwt : "",
};

const setHeaderAuthorization = function (jwt) {
  headers.Authorization = "Bearer " + jwt;
  headerFormData.Authorization = "Bearer " + jwt;
};
*/
export let turnoff = false;

export const resetTurnoff = (turnoff = false);

const get = async (url) => {
  const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    if (response.status) {
      toast.warn(
        "======== ERROR " + response.status + " ========\n" + HTTPErrorCode[response.status],
        {
          position: "bottom-center",
          closeButton: false,
          pauseOnHover: false,
          theme: "dark",
          hideProgressBar: true,
          autoClose: 3500,
        }
      );
      response.status === 401 ? (turnoff = true) : (turnoff = false);
    } else if (response.type) {
      toast.warn("======== ERROR NAN ========\n" + response.type, {
        position: "bottom-center",
        closeButton: false,
        pauseOnHover: false,
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3500,
      });
    } else {
      throw new Error("El error no pudo ser desplegado");
    }
  }
  return await response.json();
};

const post = async (url, body, isFormData = false) => {
  //console.log('Valor de formData: ', isFormData);
  const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
    method: "POST",
    headers: isFormData ? headerFormData : headers,
    body,
  });

  if (!response.ok) {
    if (response.status) {
      toast.warn(
        "======== ERROR " + response.status + " ========\n" + HTTPErrorCode[response.status],
        {
          position: "bottom-center",
          closeButton: false,
          pauseOnHover: false,
          theme: "dark",
          hideProgressBar: true,
          autoClose: 3500,
        }
      );
      response.status === 401 ? (turnoff = true) : (turnoff = false);
    } else if (response.type) {
      toast.warn("======== ERROR NAN ========\n" + response.type, {
        position: "bottom-center",
        closeButton: false,
        pauseOnHover: false,
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3500,
      });
    } else {
      throw new Error("El error no pudo ser desplegado");
    }
  }

  return await response.json();
};

const put = async (url, body, isFormData = false) => {
  const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
    method: "PUT",
    headers: isFormData ? headerFormData : headers,
    body,
  });

  if (!response.ok) {
    if (response.status) {
      toast.warn(
        "======== ERROR " + response.status + " ========\n" + HTTPErrorCode[response.status],
        {
          position: "bottom-center",
          closeButton: false,
          pauseOnHover: false,
          theme: "dark",
          hideProgressBar: true,
          autoClose: 3500,
        }
      );
      response.status === 401 ? (turnoff = true) : (turnoff = false);
    } else if (response.type) {
      toast.warn("======== ERROR NAN ========\n" + response.type, {
        position: "bottom-center",
        closeButton: false,
        pauseOnHover: false,
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3500,
      });
    } else {
      throw new Error("El error no pudo ser desplegado");
    }
  }

  return await response.json();
};

const _delete = async (url) => {
  const response = await fetch(process.env.REACT_APP_BASE_URL + url, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    if (response.status) {
      toast.warn(
        "======== ERROR " + response.status + " ========\n" + HTTPErrorCode[response.status],
        {
          position: "bottom-center",
          closeButton: false,
          pauseOnHover: false,
          theme: "dark",
          hideProgressBar: true,
          autoClose: 3500,
        }
      );
      response.status === 401 ? (turnoff = true) : (turnoff = false);
    } else if (response.type) {
      toast.warn("======== ERROR NAN ========\n" + response.type, {
        position: "bottom-center",
        closeButton: false,
        pauseOnHover: false,
        theme: "dark",
        hideProgressBar: true,
        autoClose: 3500,
      });
    } else {
      throw new Error("El error no pudo ser desplegado");
    }
  }

  return await response.json();
};

export const http = {
  get,
  post,
  put,
  delete: _delete,
  setHeaderAuthorization,
};
