import { useEffect } from "react";
import { useState } from "react";
//import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm/EquipmentForm";
import Loading from "../Components/Loading";

const updateEquipment = (equipment) => {
  return fetch(`/api/equipments/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipments/${id}`).then((res) => res.json());
};

const EquipmentUpdater = ({
  updateId,
  setUpdateId,
  gotUpdated,
  setGotUpdated,
}) => {
  // const { id } = useParams();
  // const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(true);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(updateId)
      .then((equipment) => {
        setEquipment(equipment);
        setEquipmentLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [updateId]);

  const handleUpdateEquipment = (equipment) => {
    setUpdateLoading(true);
    updateEquipment(equipment)
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

  if (equipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment}
      onSave={handleUpdateEquipment}
      disabled={updateLoading}
      onCancel={() => setUpdateId(null)}
    />
  );
};

export default EquipmentUpdater;
