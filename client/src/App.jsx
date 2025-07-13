import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Goals from "./pages/Goals";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
