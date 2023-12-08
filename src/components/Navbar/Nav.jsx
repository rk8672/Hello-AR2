import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

import Logout from "../../images/power-off.png";
import Dashboard from "../../images/Dashboard.png";

import "./DesktopNav.css";

const NavigationBar = () => {
  const { logout } = useAuth();

  return (
    <>
    <div className="sidebar  h-100">
      <div className="logo d-flex justify-content-center mb-4">Logo</div>

      <div className="nav-links d-flex flex-column justify-content-start">
        <div className="">
         
          <NavLink to="/SongList" className="link">
            <img
              src={Dashboard}
              alt="Home"
              style={{ width: "20px", height: "auto" }}
            />
           <span className="px-3">Songs</span>
          </NavLink>
        </div>

        <div className="mt-auto">
          <NavLink
            to="/"
            className="link"
            onClick={() => {
              logout();
            }}
          >
            <img
              src={Logout}
              alt="Logout"
              style={{ width: "20px", height: "auto" }}
            />
            <span className="px-3">Logout</span>
          </NavLink>
        </div>
      </div>
    </div>

    <div className="content">{/* Content components go here */}</div>
    </>
  );
};

export default NavigationBar;
