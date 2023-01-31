import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calls from "./pages/Calls.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
// import Status from "./components/Status";
// import Profile from "./pages/Profile";
// import Keypad from "./pages/Keypad";
const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Calls />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
