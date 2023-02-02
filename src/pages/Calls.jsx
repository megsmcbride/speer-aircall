import React, { useEffect, useState } from "react";
import "../css/Header.css"
import CallListItem from "../components/CallListItem.jsx";
import { useQuery } from "react-query";
import axios from "axios";
import Header from "../Header.jsx";
import CallDetails from "../components/CallDetails.jsx";
import BottomNav from "../components/BottomNav.jsx";
import { FiArchive } from "react-icons/fi";
import "regenerator-runtime/runtime";

const Calls = (props) => {
  const [callData, setCallData] = useState({ calls: [] });
  const [detailOpen, setDetailOpen] = useState(false);
  const [callDetails, setCallDetails] = useState({});
  const [filterCalls, setFilterCalls] = useState("inbox");
  const [archiveUpdated, setArchiveUpdated] = useState(null);
  const { setMissedCallCount } = props;

  const fetcher = async () =>
    await axios
      .get(
        "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities"
      )
      .then((res) =>
        setCallData(
          res.data
            .filter((call) => call.direction)
            .filter((call) => call.call_type)
            .filter((call) => call.created_at)
        )
      );

  const { data, loading, error } = useQuery("calls", fetcher);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  let calls;

  if (callData.length > 0 && filterCalls === "inbox") {
    console.log(callData);
    calls = callData
      .filter((call) => call.direction === "inbound" && !call.is_archived)
      .filter((call) => call.call_type === "missed");
  } else if (callData.length > 0 && filterCalls === "all calls") {
    calls = callData.filter((call) => !call.is_archived);
  } else if (callData.length > 0 && filterCalls === "archived") {
    calls = callData.filter((call) => call.is_archived);
  }

  let filteredCallData;
  if (calls) {
    filteredCallData = calls.map((call) => {
      return (
        <CallListItem
          key={call.id}
          {...call}
          setDetailOpen={setDetailOpen}
          setCallDetails={setCallDetails}
        />
      );
    });
  }

  const checkMissedCalls = () => {
    let count = 0;
    if (callData.length > 0) {
      callData.map((call) => {
        console.log(call);
        if (call.call_type === "missed") {
          count++;
        }
      });
    }
    setMissedCallCount(count);
    console.log(count);
    window.localStorage.setItem("missedCallCount", JSON.stringify(count));
  };

  useEffect(() => {
    checkMissedCalls();
  }, [callData]);

  useEffect(() => {
    fetcher();
    setArchiveUpdated(null);
  }, [archiveUpdated, filterCalls]);

  console.log(callData);
  return (
    <div>
      <div className="upperNav">
        <Header />
        <div className="callTabs">
          <div>
            <button
              className={filterCalls === "inbox" ? "tabActive" : "tab"}
              onClick={() => {
                setFilterCalls("inbox");
                setDetailOpen(false);
              }}
            >
              <p>Inbox</p>
            </button>
            <button
              className={filterCalls === "all calls" ? "tabActive" : "tab"}
              onClick={() => {
                setFilterCalls("all calls");
                setDetailOpen(false);
              }}
            >
              <p>All Calls</p>
            </button>
          </div>

          <button
            className={filterCalls === "archived" ? "tabActive" : "tab"}
            onClick={() => {
              setFilterCalls("archived");
              setDetailOpen(false);
            }}
          >
            <FiArchive className="archiveIcon" />
          </button>
        </div>
      </div>
      {detailOpen ? (
        <CallDetails
          setDetailOpen={setDetailOpen}
          key={callDetails.id}
          {...callDetails}
          setCallData={setCallData}
          callData={callData}
          setArchiveUpdated={setArchiveUpdated}
        />
      ) : (
        <div className="call-list-container">{filteredCallData}</div>
      )}
      <div className="bottomNav">
        <BottomNav
          missedCallCount={props.missedCallCount}
          setDetailOpen={setDetailOpen}
        />
      </div>
    </div>
  );
};

export default Calls;
