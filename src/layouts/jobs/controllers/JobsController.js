import JobsList from "../modules/JobsList";
import {
    JobsListService,

  } from "../services/JobsService";

 export function JobsController() {
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

  const requestJobsList = async (pageIndex) => {
    const result = await JobsListService(pageIndex);
    if (result) {
      const { payload } = result;
      await setJobsList(payload.data);
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
    requestJobsList(currentPage === 1 ? currentPage : (currentPage - 1) * paginaSize + 1);
  }, [currentPage]);

  return (
    <>
      <JobsList
        handleList={requestJobsList}
        error={error}
        pageIndexAndPageSize={pageIndexAndPageSize}
        entriesStart={entriesStart}
        entriesEnd={entriesEnd}
        totalData={totalData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
}