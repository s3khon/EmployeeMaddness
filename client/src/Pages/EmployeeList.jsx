import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (
  signal,
  sortName,
  levelFilterText,
  positionFilterText
) => {
  return fetch(
    `/api/employees?sort=${sortName}&levelFilter=${levelFilterText}&positionFilter=${positionFilterText}`,
    { signal }
  ).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [gotUpdated, setGotUpdated] = useState(false); 

  // for pagination: 
  const [currentPage, setCurrentPage] = useState(1);

  // for sorting names:
  const [sortName, setSortName] = useState("none");

  // for filtering level and position:
  const [levelFilterText, setLevelFilterText] = useState("");
  const [positionFilterText, setPositionFilterText] = useState("");

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });
    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(
      controller.signal,
      sortName,
      levelFilterText,
      positionFilterText
    )
      .then((employees) => {
        setLoading(false);
        console.log("fetch employees")
        setData(employees);
        setGotUpdated(false); 
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, [sortName, levelFilterText, positionFilterText, gotUpdated, currentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable
      employees={data}
      onDelete={handleDelete}
      sortName={sortName}
      setSortName={setSortName}
      levelFilterText={levelFilterText}
      setLevelFilterText={setLevelFilterText}
      positionFilterText={positionFilterText}
      setPositionFilterText={setPositionFilterText}
      gotUpdated={gotUpdated}
      setGotUpdated={setGotUpdated}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default EmployeeList;
