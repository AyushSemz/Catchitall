import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and Components
import Authenticate from "./pages/Authenticate";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";

// Intercept fetch requests
const originalFetch = window.fetch;

window.fetch = async function (resource, init) {
  // Local backend
  const serverUrl = "http://localhost:5000/";

  // If the URL is already absolute, don't modify it
  if (!resource.startsWith("http")) {
    resource = serverUrl + resource.replace(/^\//, "");
  }

  const response = await originalFetch(resource, init);

  // Logout if token expired
  if (response.status === 401) {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return response;
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Authenticate />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
