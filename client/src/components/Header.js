import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, onLogout, onOpenAddCampaignModal }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/"); // Redirecionar para a página inicial após o logout
  };

  const handleAddCampaignClick = () => {
    onOpenAddCampaignModal(); // Abrir o modal de adicionar campanha
  };

  return (
    <header className="flex bg-indigo-600 text-white p-4 text-lg font-bold justify-center">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-white no-underline sm:mb-0 mb-8">
          Crowdfunding App
        </Link>
        <nav className="flex">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleAddCampaignClick}
                className="bg-white hover:bg-white/80 text-indigo-700 font-bold py-2 px-4 rounded duration-150"
              >
                Add Campaign
              </button>
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 hover:bg-red-700 ml-5 text-white font-bold py-2 px-4 rounded duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white hover:bg-white/80 duration-300 text-indigo-500 font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
