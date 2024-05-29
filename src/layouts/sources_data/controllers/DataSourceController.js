/*
*/
import DataTable from "examples/Tables/DataTable";
import viewSource from "assets/images/ver_fuente.svg";
import editSource from "assets/images/edit_fuente.svg";
import deleteSource from "assets/images/delete_fuente.svg";
import closeImg from "assets/images/close_X.svg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import MDInput from "components/MDInput";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import {
  createSource,
  getSourceTypes,
  getSources,
  updateSource,
} from "../services/dataSourceService";
import ListDataSource from "../modules/ListDataSource";
import { SourceDelete } from "../modules/SourceDelete";
import { SourceNew } from "../modules/SourceNew";
import { SourceEdit } from "../modules/SourceEdit";
import { getCardTypes } from "layouts/card_type/services/cardTypeService";

export default function DataSourceController() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [sourceTypes, setSourceTypes] = useState([]);
  const [carnetTypes, setCarnetTypes] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [recoveredData, setRecoveredData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [newData, setNewData] = useState({});
  const [infoDelete, setInfoDelete] = useState({});
  const [sourceList, setSourceList] = useState();
  const [defaultData, setDefaultData] = useState({});
  const [isFormModified, setIsFormModified] = useState(false);

  const requestSources = async () => {
    try {
      const result = await getSources();
      const { fuentes, totalFuentes } = result;
      console.log(fuentes);
      //console.log(`${pageIndex} - ${pageSize}`);
      await setSourceList(fuentes);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  const requestSourceTypes = async (pageIndex) => {
    const result = await getSourceTypes(pageIndex);

    if (result.status !== false) {
      const { data, last_page, total, from, to } = result;
      await setSourceTypes(data);
    } else {
      setErrorAlert("Error al consultar al servidor");
    }
  };
  const requestCarnetTypes = async (pageIndex) => {
    const result = await getCardTypes(pageIndex);

    if (result.status !== false) {
      const { data, last_page, total, from, to } = result;
      await setCarnetTypes(data);
    } else {
      setErrorAlert("Error al consultar al servidor");
    }

    //console.log(data);
  };
  const requestSourceNew = async (data) => {
    try {
      const result = await createSource(data);
      if (result.success !== false) {
        setIsAlert(false);
        handleCloseNew();
        //const { message, last_page, total, from, to } = result;
      } else {
        setIsAlert(true);
        if (result.message === "Archivo CSV no encontrado") {
          setErrorAlert("Archivo CSV no encontrado");
        } else if (result.message === "type_card not found") {
          setErrorAlert("El tipo de carnet no existe");
        } else {
          setErrorAlert("Fallo al procesar el archivo");
        }
        //setError("Error al consultar al servidor");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const requestSourceEdit = async (id, data) => {
    try {
      const result = await updateSource(id, data);
      const { fuentes } = result;
      console.log(fuentes);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleOpenEdit = (event) => {
    //console.log(event.currentTarget.dataset);
    //console.log(event.target.dataset.nombre);
    event.preventDefault();
    setOpenEdit(true);
    setIsDisabled(event.currentTarget.dataset.id === "view" ? true : false);
    const { dataset } = event.currentTarget;
    const data = {
      id: dataset.identificador,
      nombre: dataset.fuente,
      url: dataset.url,
      estado: dataset.estado,
      usuarios: dataset.usuarios,
      fecha_de_generacion: dataset.fechac,
      perfil: dataset.perfil,
      programa: dataset.programa,
    };

    setRecoveredData(data);
    setEditedData(data);
    console.log(data);
  };

  const handleOpenNew = async (event) => {
    //console.log(event.currentTarget.dataset);
    //console.log(event.target.dataset.nombre);
    event.preventDefault();
    setIsDisabled(false);
    //const { dataset } = event.currentTarget;
    const data = {
      name: "",
      source: "",
      perfil: "",
      created: "",
    };
    setDefaultData(data);
    await requestSourceTypes(1);
    await requestCarnetTypes(1);
    setNewData(data);
    setOpenNew(true);
    console.log(data);
  };

  const handleClickDelete = (event) => {
    event.preventDefault();

    const { dataset } = event.currentTarget;
    const data = {
      id: dataset.identificador,
      nombre: dataset.fuente,
      url: dataset.url,
      estado: dataset.estado,
      usuarios: dataset.usuarios,
      fecha_de_generacion: dataset.fechac,
      perfil: dataset.perfil,
      programa: dataset.programa,
    };
    setInfoDelete(data);
    setOpenDelete(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseNew = () => setOpenNew(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const header = [{}];

  const getFieldValue = (fieldName) => {
    return editedData[fieldName];
  };

  const getFieldValueNew = (fieldName) => {
    return newData[fieldName];
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedData({
      ...editedData,
      [fieldName]: value,
    });
    console.log(value);
  };

  const handleFieldChangeNew = (fieldName, value) => {
    setNewData({
      ...newData,
      [fieldName]: value,
    });
    console.log(value);
  };

  useEffect(() => {
    // Comprueba si algún campo ha cambiado desde los valores iniciales
    const hasFormChanged = Object.keys(editedData).some(
      (fieldName) => editedData[fieldName] !== recoveredData[fieldName]
    );

    const isAnyFieldEmpty = Object.values(editedData).some((value) => value === "");

    setIsFormModified(!isAnyFieldEmpty && hasFormChanged);
    console.log(!isAnyFieldEmpty && hasFormChanged);
  }, [editedData]);

  useEffect(() => {
    // Comprueba si algún campo ha cambiado desde los valores iniciales
    //const hasFormChanged = Object.keys(newData).some((fieldName) => newData[fieldName] !== "");
    const requiredFields = ["name", "source", "perfil", "created"];
    const someFieldIsEmpty = requiredFields.some((fieldName) => !newData[fieldName]);
    setIsFormModified(someFieldIsEmpty);
    console.log(someFieldIsEmpty);
  }, [newData]);

  useEffect(() => {
    requestSources();
    console.log("Hola world");
  }, []);

  function convertValuesToString(objeto) {
    const convertedObject = {};

    for (const clave in objeto) {
      if (objeto.hasOwnProperty(clave)) {
        convertedObject[clave] = String(objeto[clave]);
      }
    }

    return convertedObject;
  }
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const convertedObject = convertValuesToString(editedData);
    // Realiza la acción de enviar el formulario aquí
    console.log("Formulario enviado:", editedData);
    console.log("Formulario convertido a string:", convertedObject);
    requestSourceEdit(editedData.id, editedData);
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    setIsAlert(false);
    setErrorAlert("");
    setSpinner(true);
    if (newData.name === "Archivo CSV") {
      const formData = new FormData();
      formData.append("name", newData.name);
      formData.append("source", newData.source);
      formData.append("perfil", newData.perfil);
      const file = getFieldValueNew("source").type;

      if (file === "text/csv") {
        // El archivo es un archivo CSV, puedes realizar acciones con él.
        console.log("Archivo CSV válido:", file);
        console.log(formData);
        requestSourceNew(formData);
      } else {
        setIsAlert(true);
        setSpinner(false);
        setErrorAlert("Por favor, selecciona un archivo CSV");
        // El archivo no es de tipo CSV, realiza la lógica de manejo de error.
        console.error("Por favor, selecciona un archivo CSV.");
      }
    }
    //const convertedObject = convertValuesToString(newData);
    // Realiza la acción de enviar el formulario aquí
    console.log("Formulario enviado:", newData);
    //console.log("Formulario convertido a string:", convertedObject);
    //requestSourceNew(newData);
    setSpinner(false);
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    console.log(`hi la id a eliminar es ${infoDelete.id}`);
    handleCloseDelete();
  };
  return (
    <>
      <SourceNew
        open={openNew}
        handleClose={handleCloseNew}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        isAlert={isAlert}
        errorAlert={errorAlert}
        spinner={spinner}
        getFieldValue={getFieldValueNew}
        sourceTypes={sourceTypes}
        carnetTypes={carnetTypes}
        handleFieldChange={handleFieldChangeNew}
        handleSubmit={handleSubmitNew}
      />
      <SourceEdit
        open={openEdit}
        handleClose={handleCloseEdit}
        isFormModified={isFormModified}
        isDisabled={isDisabled}
        getFieldValue={getFieldValue}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmitEdit}
      />
      <SourceDelete
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        infoDelete={infoDelete}
        handleSubmitDelete={handleSubmitDelete}
      ></SourceDelete>
      <ListDataSource
        handleOpenNew={handleOpenNew}
        sourceList={sourceList}
        handleOpenEdit={handleOpenEdit}
        handleClickDelete={handleClickDelete}
      ></ListDataSource>
    </>
  );
}
