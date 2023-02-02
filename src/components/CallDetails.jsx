import React from "react";
import axios from "axios";
import "regenerator-runtime/runtime";

const CallDetails = (props) => {
  const fullDate = new Date(props.created_at);
  const date = fullDate.toLocaleString().slice(0, 9);
  const time = fullDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const id = props.id;
  const isArchived = props.is_archived;
  const duration = new Date(props.duration * 1000).toISOString().slice(11, 19);

  const handleArchive = async () => {
    const updatedCalls = [];

    for (const call of props.callData) {
      if (call.id === id) {
        const updatedCall = { ...call, is_archived: !isArchived };
        updatedCalls.push(updatedCall);
      }
      updatedCalls.push(call);
    }
    props.setCallData((prev) => ({ ...prev, calls: updatedCalls }));
    props.setArchiveUpdated(true);

    const url =
      "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/" +
      id;

    await axios
      .patch(url, {
        is_archived: !isArchived,
      })
      .then((res) => {
        res;
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
          {props.call_type !== "missed" && <p> Duration: {duration}</p>}
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
              Unarchive
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
