import StopList from "../modules/StopList";
import {
    StopListService,
  } from "../services/HomepageService";

 export function HomepageController() {
  // Common Controllers
  const [isDisabled, setIsDisabled] = useState(false);
  const [defaultData, setDefaultData] = useState({});
  const [isFormModified, setIsFormModified] = useState(false);
  const [recoveredData, setRecoveredData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [newData, setNewData] = useState({});
  const [buildData, setBuildData] = useState({});
  const header = [{}];

  // Field Check

  const getFieldValueNew = (fieldName) => {
    return newData[fieldName];
  };

  const getFieldValue = (fieldName) => {
    return editedData[fieldName];
  };

  const handleFieldChangeNew = (fieldName, value) => {
    setNewData({
      ...newData,
      [fieldName]: value,
    });
    console.log(value);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedData({
      ...editedData,
      [fieldName]: value,
    });
    console.log(value);
  };

  // List Controllers

  const requestStopList = async (pageIndex) => {
    const result = await StopListService(pageIndex);
    if (result) {
      const { payload } = result;
      await setStopList(payload.data);
      await setTotalPages(payload.last_page);
      await setTotalData(payload.total);
      await setEntriesStart(payload.from);
      await setEntriesEnd(payload.to);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageIndexAndPageSize = async (pageSize) => {
    await setPaginaSize(pageSize);
    requestRoleList(currentPage === 1 ? currentPage : (currentPage - 1) * pageSize + 1);
  };

  useEffect(() => {
    requestStopList(currentPage === 1 ? currentPage : (currentPage - 1) * paginaSize + 1);
  }, [currentPage]);

  return (
    <>
      
    </>
  );
}