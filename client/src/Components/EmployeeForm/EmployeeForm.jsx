import React, { useEffect, useState } from "react";
import Loading from "../Loading";

const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  setEmployee,
}) => {
  const initEquipments = employee ? employee.equipments : [];

  console.log("test"); 

  const [isListShown, setIsListShown] = useState(false);
  const [equipmentsLoading, setEquipmentsLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);
  const [chosenEquipments, setChosenEquipments] = useState(initEquipments);

  const fetchEquipments = () => {
    return fetch("/api/equipments/").then((res) => res.json());
  };

  useEffect(() => {
    fetchEquipments().then((data) => {
      setEquipments(data);
      setEquipmentsLoading(false);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];
    const employeeFormData = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    const employee = {
      ...employeeFormData,
      equipments: chosenEquipments,
    };
    return onSave(employee);
  };

  const handleCheckboxClick = (equipment) => {
    if (chosenEquipments.some((item) => item.name === equipment.name)) {
      setChosenEquipments((prev) =>
        prev.filter((item) => item.name !== equipment.name)
      );
    } else {
      setChosenEquipments((prev) => [
        ...prev,
        { name: equipment.name, amount: 1 },
      ]);
    }
  };

  const handleInputAmountChange = (equipment, event) => {
    setChosenEquipments((prev) =>
      prev.map((item) => {
        if (item.name === equipment.name) {
          return {
            name: item.name,
            amount: event.target.value,
          };
        } else {
          return item;
        }
      })
    );
  };

  const updateEmployee = (employee) => {
    return fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json());
  };

  const handleSaveEqButton = (employee) => {
    if (employee !== undefined) {
      const updatedEmployee = {
        ...employee,
        equipments: chosenEquipments,
      };
      updateEmployee(updatedEmployee)
        .then(setIsListShown(false))
        .catch((error) => console.log(error));
      setEmployee((prev) => ({ ...prev, equipments: chosenEquipments }));
    }
  };

  const getDefaultValue = (equipment) => {
    return chosenEquipments.reduce((acc, item) => {
      if (item.name === equipment.name) {
        acc = item.amount;
        return acc;
      } else {
        return acc;
      }
    }, 0);
  };

  if (equipmentsLoading) {
    return <Loading />;
  }

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      {/*Choosing equipments for employees */}

      <div className="dropdown">
        <button type="button" onClick={() => setIsListShown(!isListShown)}>
          Employee's equipments
        </button>
        {isListShown && (
          <div className="dropdown-list">
            <div className="dropdown-heading">
              <div> Assign Equipments </div>
              {chosenEquipments.length !== 0 && (
                <div className="dropdown-amount"> Amount: </div>
              )}
            </div>
            {equipments.map((equipment) => {
              return (
                <div key={equipment._id} className="dropdown-item">
                  <input
                    type="checkbox"
                    defaultChecked={chosenEquipments.some(
                      (item) => item.name === equipment.name
                    )}
                    onClick={() => handleCheckboxClick(equipment)}
                  />
                  <div>{equipment.name}</div>
                  <div className="dropdown-amount">
                    {chosenEquipments.some(
                      (item) => item.name === equipment.name
                    ) && (
                      <input
                        className="dropdown-amount-input"
                        type="text"
                        defaultValue={getDefaultValue(equipment)}
                        onChange={(event) =>
                          handleInputAmountChange(equipment, event)
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div className="dropdown-button">
              <button
                type="button"
                onClick={() => handleSaveEqButton(employee)}
              >
                Save equipments
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
