import ReactDOM from "react-dom/client";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Calls from "./pages/Calls.jsx";
import BottomNav from "./components/BottomNav.jsx";
// import Status from "./components/Status";
// import Profile from "./pages/Profile";
// import Keypad from "./pages/Keypad";
const queryClient = new QueryClient();

export default function App() {
  const [ missedCount, setMissedCount ] = useState(null)
  
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Calls setMissedCount={setMissedCount} />}></Route>
          </Routes>
            <div className="bottomNav">
              <BottomNav missedCount={missedCount}/>
            </div>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
