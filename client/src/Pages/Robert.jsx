import React, { useState, useEffect } from "react";
import Loading from "../Components/Loading"

const fetchEmployeesCalledRobert = () => {
  return fetch("/api/robert")
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

const Robert = () => {
  const [employeesCalledRobert, setEmployeesCalledRobert] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetchEmployeesCalledRobert()
      .then((data) => {
        setIsLoading(false); 
        setEmployeesCalledRobert(data)
      })
      .catch((err) => console.error(err));
  }, []);

  if (isLoading) {
    return <Loading/> 
  }

  return (
    <div>
      <h1> Employees called Robert:</h1>

      <table>
        <thead>
          <tr>
            <th>Name </th>
            <th>Level </th>
            <th>Position </th>
          </tr>
        </thead>
        <tbody>
          {employeesCalledRobert &&
            employeesCalledRobert.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level} </td>
                <td>{employee.position}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Robert;