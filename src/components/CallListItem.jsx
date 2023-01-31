import React from "react";
import { VscCallIncoming, VscCallOutgoing, VscInfo } from "react-icons/vsc";

const CallListItem = (props) => {
  const fullDate = new Date(props.created_at);
  const date = fullDate.toLocaleString().slice(0, 9);
  const time =
    fullDate.toLocaleTimeString().slice(0, 5) +
    fullDate.toLocaleTimeString().slice(8);
  return (
    <div>
      <div className="date">{date}</div>
      <div className="call-container" onClick={() => {props.setDetailOpen(true); props.setCallDetails(props); }}>
        <div className="call-icon">
          {props.direction === "inbound" && <VscCallIncoming size="20px" />}
          {props.direction === "outbound" && <VscCallOutgoing size="20px" />}
        </div>
        <div className="call-info-mid">
          <p className="caller"> {props.from} </p>
          <p className="via">tried to call from {props.via}</p>
        </div>
        <div className="call-info-right">

          <p className="time">{time}</p>
        </div>
      </div>
    </div>
    
  );
};

export default CallListItem;
