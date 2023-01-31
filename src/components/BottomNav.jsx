import React, { useState } from "react";
import { TbPhone } from "react-icons/tb";
import { CgProfile, CgDialpad } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { RiRadioButtonLine } from "react-icons/ri";
import "../css/BottomNav.css";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [isActive, setIsActive] = useState("");

  const navigate = useNavigate();

  function handleClick(route) {
    navigate(`/${route}`);
    setIsActive(route);
  }

  return (
    <div className="bottomNavContainer">
      <button className="navButton" onClick={() => handleClick("")}>
        <TbPhone className={isActive === "" ? "activeIcon" : "icon"} />
      </button>
      <button className="navButton" onClick={() => handleClick("profile")}>
        <CgProfile className={isActive === "profile" ? "activeIcon" : "icon"} />
      </button>
      <button className="dialpad" onClick={() => handleClick("dial")}>
        <CgDialpad style={{ fontSize: "50px" }} />
      </button>
      <button className="navButton" onClick={() => handleClick("settings")}>
        <IoIosSettings
          className={isActive === "settings" ? "activeIcon" : "icon"}
        />
      </button>
      <button className="navButton">
        <RiRadioButtonLine
          className={isActive === "status" ? "activeIcon" : "icon"}
        />
      </button>
    </div>
  );
};

export default BottomNav;
