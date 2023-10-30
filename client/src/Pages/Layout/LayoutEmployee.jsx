import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <div className="page-switching">
            <Link to="/">
              {" "}
              <button className="page-button"> Employees </button>{" "}
            </Link>
            <Link to="/equipments">
              {" "}
              <button className="page-button"> Equipments </button>{" "}
            </Link>
          </div>
        </li>
        <li>
          <Link to="/create">
            <button type="button" className="create-button">
              Create Employee
            </button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
