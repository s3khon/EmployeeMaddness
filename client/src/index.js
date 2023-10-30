import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import LayoutEmployee from "./Pages/Layout/LayoutEmployee";
import LayoutEquipment from "./Pages/Layout/LayoutEquipment";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import Robert from "./Pages/Robert";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import Missing from "./Pages/Missing";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutEmployee />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/robert",
        element: <Robert />,
      },
      {
        path: "/missing",
        element: <Missing />,
      },
    ],
  },
  {
    path: "/equipments",
    element: <LayoutEquipment/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/equipments",
        element: <EquipmentList />,
      },
      {
        path: "/equipments/create",
        element: <EquipmentCreator />,
      },
      {
        path: "/equipments/update/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/equipments/table-test",
        element: <TableTest />,
      },
      {
        path: "/equipments/form-test",
        element: <FormTest />,
      },
    ],
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
