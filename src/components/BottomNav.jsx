import React, { useState } from "react";
import { TbPhone } from "react-icons/tb";
import { CgProfile, CgDialpad } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { RiRadioButtonLine } from "react-icons/ri";
import "../css/BottomNav.css";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";

const BottomNav = (props) => {
  const [isActive, setIsActive] = useState("");
  const { missedCallCount } = props;

  const navigate = useNavigate();

  function handleClick(route) {
    navigate(`/${route}`);
    setIsActive(route);
  }

  return (
    <div className="bottomNavContainer">
      <button
        className="navButton"
        onClick={() => {
          handleClick("");
          props.setDetailOpen(false);
        }}
      >
        <Badge
          badgeContent={missedCallCount}
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "#E41b1b",
            },
          }}
        >
          <TbPhone className={isActive === "" ? "activeIcon" : "icon"} />
        </Badge>
      </button>
      <button className="navButton">
        <CgProfile className={isActive === "profile" ? "activeIcon" : "icon"} />
      </button>
      <button className="dialpad">
        <CgDialpad style={{ fontSize: "50px" }} />
      </button>
      <button className="navButton">
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
