import React, { useState } from "react";
// import CallDetails from "../components/CallDetails.jsx";
import "../css/Header.css"
import CallListItem from "../components/CallListItem.jsx";
import { useQuery } from "react-query";
import axios from "axios";
import Header from "../Header.jsx";
import { BiArchiveIn } from "react-icons/bi"


const Calls = () => {
  const [callData, setCallData] = useState({ calls: [] });
  const [filterCalls, setFilterCalls] = useState(true);

  const fetcher = () =>
    axios
      .get(
        "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities"
      )
      .then((res) => setCallData(res.data));

  const { data, loading, error } = useQuery("calls", fetcher);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  let calls;

  if (callData.length > 0 && filterCalls) {
    calls = callData
      .filter((call) => "direction" in call)
      .filter((call) => call.direction.includes("inbound"))
      .map((call) => {
        return <CallListItem key={call.id} {...call} />;
      });
  }
  if (callData.length > 0 && !filterCalls) {
    calls = callData.map((call) => {
      return <CallListItem key={call.id} {...call} />;
    });
  }

  return (
    <div>
      <div className="upperNav">
      <Header />
      <button onClick={() => setFilterCalls(true)}>Inbox</button>
      <button onClick={() => setFilterCalls(false)}>All Calls</button>

      </div>
      <div className="call-list-container">
        {filterCalls && <button>
          <BiArchiveIn />
          Archive All Calls</button>}
        {calls}
        </div>
    </div>
  );
};

export default Calls;
