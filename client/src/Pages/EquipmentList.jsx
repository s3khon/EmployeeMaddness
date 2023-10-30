import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fetchEquipments = (signal) => {
  return fetch("/api/equipments", { signal }).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [gotUpdated, setGotUpdated] = useState(false);

  // for pagination:
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    deleteEquipment(id).catch((err) => {
      console.log(err);
    });
    setData((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchEquipments(controller.signal)
      .then((equipments) => {
        setLoading(false);
        setData(equipments);
        setGotUpdated(false); 
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, [gotUpdated, currentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <EquipmentTable
      equipments={data}
      onDelete={handleDelete}
      gotUpdated={gotUpdated}
      setGotUpdated={setGotUpdated}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default EquipmentList;
