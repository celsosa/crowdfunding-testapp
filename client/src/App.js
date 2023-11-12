import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CampaignList from "./components/CampaignList";
import AdminLogin from "./components/AdminLogin";
import Modal from "./components/Modal"; // Certifique-se de ter este componente
import AddCampaignForm from "./components/AddCampaignForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const handleLoginSuccess = (loginToken) => {
    setIsLoggedIn(true);
    setToken(loginToken);
    setShowAddCampaignModal(false); // Fechar modal após o login, se estiver aberto
    localStorage.setItem("token", loginToken);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    setShowAddCampaignModal(false); // Fechar modal após o logout, se estiver aberto
    localStorage.removeItem("token");
  };

  const handleOpenAddCampaignModal = () => {
    setShowAddCampaignModal(true);
  };

  const handleCloseAddCampaignModal = () => {
    setShowAddCampaignModal(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onOpenAddCampaignModal={handleOpenAddCampaignModal}
        />
        <Routes>
          <Route path="/" element={<CampaignList />} />
          <Route
            path="/login"
            element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
        {isLoggedIn && showAddCampaignModal && (
          <Modal title="Add New Campaign" onClose={handleCloseAddCampaignModal}>
            <AddCampaignForm
              token={token}
              onClose={handleCloseAddCampaignModal}
            />
          </Modal>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
