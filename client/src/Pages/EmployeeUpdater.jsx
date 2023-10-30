import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const EmployeeUpdater = ({
  updateId,
  setUpdateId,
  gotUpdated,
  setGotUpdated,
}) => {
  // const { id } = useParams();
  // const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(updateId)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [updateId]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee)
      .then(() => {
        setGotUpdated(true);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
        setUpdateId(null);
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      setEmployee={setEmployee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => setUpdateId(null) }
    />
  );
};

export default EmployeeUpdater;
