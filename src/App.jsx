import ReactDOM from "react-dom/client";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Calls from "./pages/Calls.jsx";

const queryClient = new QueryClient();

export default function App() {
  const checkMissedCalls = () => {
    if (!window.localStorage.getItem("missCallCount")) {
      return undefined;
    }
    return JSON.parse(window.localStorage.getItem("missCallCount"));
  };
  const [count, setCount] = useState(() => checkMissedCalls());
  const [missedCallCount, setMissedCallCount] = useState(count);

  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Calls
                  missedCallCount={missedCallCount}
                  setMissedCallCount={setMissedCallCount}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
