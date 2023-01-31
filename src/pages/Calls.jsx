import React, { useState } from "react";
// import CallDetails from "../components/CallDetails.jsx";
import CallListItem from "../components/CallListItem.jsx";
import { useQuery } from "react-query";
import axios from "axios";

const Calls = () => {
  const [callData, setCallData] = useState({ calls: [] });

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


  const [callDetails, setCallDetails] = useState({});

  let calls;


  if (callData.length > 0) {
    calls = callData.map((call) => {
      return <CallListItem key={call.id} {...call} />;
    });
  }

  return <div className="call-list-container">{calls}</div>;
};

export default Calls;
