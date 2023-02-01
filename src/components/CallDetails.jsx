import React from "react";
import axios from "axios";

const CallDetails = (props) => {
  const fullDate = new Date(props.created_at);
  const date = fullDate.toLocaleString().slice(0, 9);
  const time =
    fullDate.toLocaleTimeString().slice(0, 5) +
    fullDate.toLocaleTimeString().slice(8);
  const id = props.id;
  const isArchived = props.is_archived;

  console.log("hello", props);
  const handleArchive = () => {
    const updatedCalls = [];

    for (const call of props.callData.calls) {
      if (call.id === id) {
        const updatedCall = { ...call, is_archived: !isArchived };
        updatedCalls.push(updatedCall);
      }
      updatedCalls.push(call);
    }
    props.setCallData((prev) => ({ ...prev, calls: updatedCalls }));

    const url = "https://aircall-job.herokuapp.com/activities/" + id;

    axios
      .post(url, {
        is_archived: !isArchived,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e.response));

    props.setDetailOpen(false);
  };

  return (
    <div className="content">
      <div className="details-container">
        <h1 className="call-title">Call Details</h1>
        <div className="call-details">
          <p>
            {date} at {time}
          </p>
          <p>
            {props.call_type} {props.direction} call
          </p>
          <p>Duration: {props.duration}</p>
          <p>From: {props.from}</p>
          <p>To: {props.to}</p>
          <p>Via: {props.via}</p>
        </div>
        <div className="detail-buttons">
          <button className="back" onClick={() => props.setDetailOpen(false)}>
            Back
          </button>
          {props.is_archived ? (
            <button
              onClick={() => {
                handleArchive();
              }}
              className="archive"
            >
              Unarchive{" "}
            </button>
          ) : (
            <button
              onClick={() => {
                handleArchive();
              }}
              className="archive"
            >
              Archive
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallDetails;
