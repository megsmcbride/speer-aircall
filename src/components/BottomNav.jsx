import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CgProfile, CgDialpad } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { RiRadioButtonLine } from "react-icons/ri";
import "../css/BottomNav.css";
// import { useNavigate } from "react-router-dom"

const BottomNav = () => {
  // const navigate = useNavigate()

  // function handleClick(route) {
  //   navigate(`/${route}`)
  // }

  return (
    <div className="bottomNavContainer">
      <button>
        <BsFillTelephoneFill className="icon" />
      </button>
      <button>
        <CgProfile className="icon" />
      </button>
      <button className="dialpad">
        <CgDialpad style={{ fontSize: "50px" }} />
      </button>
      <button>
        <IoIosSettings className="icon" />
      </button>
      <button>
        <RiRadioButtonLine className="icon" />
      </button>
    </div>
  );
};

export default BottomNav;
