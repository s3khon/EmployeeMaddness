import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import EmployeeUpdater from "../../Pages/EmployeeUpdater";

const employeesPerPage = 10;

const EmployeeTable = ({
  employees,
  onDelete,
  sortName,
  setSortName,
  levelFilterText,
  setLevelFilterText,
  positionFilterText,
  setPositionFilterText,
  gotUpdated,
  setGotUpdated,
  currentPage, 
  setCurrentPage,
}) => {
  // for pagination:
  const [currentEmployees, setCurrentEmployees] = useState(employees);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [updateId, setUpdateId] = useState(null);

  /*
  // part of the code for filtering in the frontend (additional changes in states is required):
  useEffect(() => {
    setFilteredEmployees((prev) =>
      employees.filter((employee) => {
        return (
          employee.level
            .toLowerCase()
            .startsWith(levelFilterText.toLowerCase()) &&
          employee.position
            .toLowerCase()
            .startsWith(positionFilterText.toLowerCase())
        );
      })
    );
  }, [levelFilterText, positionFilterText, employees]);
  */

  useEffect(() => {
    if (employees.length < indexOfFirstEmployee) {
      setCurrentPage(1);
    }

    setCurrentEmployees(
      employees.slice(indexOfFirstEmployee, indexOfLastEmployee)
    );
  }, [currentPage, employees]);

  const handleSortBtnClick = () => {
    setSortName((prev) => {
      if (prev === "none") {
        return "asc";
      } else if (prev === "desc") {
        return "asc";
      } else {
        return "desc";
      }
    });
  };

  const handleUpdateBtnClick = (id) => {
    setUpdateId(id);
  };

  const updateEmployeeAttendance = (employee) => {
    return fetch(`/api/attendance/${employee._id}`, {
      method: "PATCH",
    }).then((res) => res.json());
  };

  function handleCheckboxChange(employee) {
    updateEmployeeAttendance(employee);

    setCurrentEmployees((prev) => {
      return prev.map((item) => {
        return item._id === employee._id
          ? { ...item, present: !employee.present }
          : item;
      });
    });
  }

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>
              Name
              <button
                type="button"
                className="sort-button"
                style={{ marginLeft: "20px" }}
                onClick={() => handleSortBtnClick()}
              >
                {sortName === "none" ? (
                  <div>Sort ASC</div>
                ) : sortName === "asc" ? (
                  <div>{"ASC > DESC"}</div>
                ) : (
                  <div>{"DESC > ASC"}</div>
                )}
              </button>
            </th>
            <th>Present</th>
            <th>
              Level
              <input
                type="text"
                name="levelFilterText"
                value={levelFilterText}
                className="filter"
                placeholder="filter by level"
                onChange={(event) => setLevelFilterText(event.target.value)}
              />
            </th>
            <th>
              Position
              <input
                type="text"
                name="positionFilterText"
                value={positionFilterText}
                className="filter"
                placeholder="filter by position"
                onChange={(event) => setPositionFilterText(event.target.value)}
              />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currentEmployees &&
            currentEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={employee.present ? true : false}
                    onChange={() => handleCheckboxChange(employee)}
                  />
                </td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleUpdateBtnClick(employee._id)}
                  >
                    Update
                  </button>

                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={employeesPerPage}
        totalItems={employees.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {updateId && (
        <EmployeeUpdater
          updateId={updateId}
          setUpdateId={setUpdateId}
          gotUpdated={gotUpdated}
          setGotUpdated={setGotUpdated}
        />
      )}
    </div>
  );
};

export default EmployeeTable;

/*
// for navigation to another side for updating: 
<Link to={`/update/${employee._id}`}>
  <button type="button">Update</button>
</Link>
*/
