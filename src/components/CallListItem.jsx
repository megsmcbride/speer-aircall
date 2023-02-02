import React from "react";
import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc";
import "../css/CallListItem.css";

const CallListItem = (props) => {
  const fullDate = new Date(props.created_at);
  const date = fullDate.toLocaleString().slice(0, 9);
  const time = fullDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  +fullDate.toLocaleTimeString().slice(8);

  return (
    <div>
      <div className="date">{date}</div>
      <div
        className="call-container"
        onClick={() => {
          props.setDetailOpen(true);
          props.setCallDetails(props);
        }}
      >
        <div className="call-icon">
          {props.direction === "inbound" && props.call_type !== "missed" && (
            <VscCallIncoming size="20px" />
          )}
          {props.direction === "outbound" && <VscCallOutgoing size="20px" />}
        </div>
        <div className="call-info-mid">
          <p
            className={props.call_type === "missed" ? "callerMissed" : "caller"}
          >
            {props.from === undefined ? "Unknown" : props.from}
          </p>
          <p className="via">
            called from {props.via === undefined ? "Unknown" : props.via}
          </p>
        </div>
        <div className="call-info-right">
          <p className="time">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default CallListItem;
