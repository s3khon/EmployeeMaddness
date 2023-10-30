import { Link } from "react-router-dom";
import "./EquipmentTable.css";
import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import EquipmentUpdater from "../../Pages/EquipmentUpdater";

const equipmentsPerPage = 10;

const EquipmentTable = ({
  equipments,
  onDelete,
  gotUpdated,
  setGotUpdated,
  currentPage,
  setCurrentPage,
}) => {
  // for pagination:
  const [currentEquipments, setCurrentEquipments] = useState(equipments);

  const indexOfLastEquipment = currentPage * equipmentsPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - equipmentsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    if (equipments.length < indexOfFirstEquipment) {
      setCurrentPage(1);
    }
    setCurrentEquipments(
      equipments.slice(indexOfFirstEquipment, indexOfLastEquipment)
    );
  }, [currentPage, equipments]);

  const handleUpdateBtnClick = (id) => {
    setUpdateId(id);
  };

  return (
    <div className="EquipmentTable">
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Type </th>
            <th> Amount </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currentEquipments &&
            currentEquipments.map((equipment) => (
              <tr key={equipment._id}>
                <td>{equipment.name}</td>
                <td>{equipment.type}</td>
                <td>{equipment.amount}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleUpdateBtnClick(equipment._id)}
                  >
                    {" "}
                    Update{" "}
                  </button>

                  <button type="button" onClick={() => onDelete(equipment._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={equipmentsPerPage}
        totalItems={equipments.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {updateId && (
        <EquipmentUpdater
          updateId={updateId}
          setUpdateId={setUpdateId}
          gotUpdated={gotUpdated}
          setGotUpdated={setGotUpdated}
        />
      )}
    </div>
  );
};

export default EquipmentTable;

/*
// for redirecting to other page in case of updating: 
    <Link to={`/equipments/update/${equipment._id}`}>
        <button type="button"> Update </button>
    </Link>
*/
