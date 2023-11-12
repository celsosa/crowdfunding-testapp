// src/components/CampaignList/CampaignList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CampaignCard from "./CampaignCard";
import Modal from "./Modal";
import DonationForm from "./DonationForm";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError("");
      try {
        // Replace '/api/campaigns' with your actual endpoint
        const response = await axios.get("http://localhost:3001/api/campaigns");
        setCampaigns(response.data);
      } catch (err) {
        setError("Failed to load campaigns. Please try again later.");
        console.error("There was an error fetching the campaigns:", err);
      }
      setLoading(false);
    };

    fetchCampaigns();
  }, []);

  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleDonationSubmit = async (donationData) => {
    const { amount, nickname } = donationData; // Desestruturação para obter os valores individuais
    try {
      const response = await axios.post("http://localhost:3001/donate", {
        campaignId: selectedCampaign.id,
        amount: Number(amount), // Converte a quantidade para um número, se for uma string
        donatorNickname: nickname || "Anonymous", // Usa o apelido do doador, se fornecido
      });
      console.log(response.data);
      setSelectedCampaign(null); // Fecha o modal após a doação
    } catch (error) {
      console.error("Error making donation:", error);
    }
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(campaigns);

  return (
    <div className="w-full  mx-auto p-8 max-w-[1600px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onDonate={handleDonateClick}
          />
        ))}
      </div>
      {selectedCampaign && (
        <Modal
          title={`Donate to ${selectedCampaign.name}`}
          onClose={() => setSelectedCampaign(null)}
        >
          <DonationForm onSubmit={handleDonationSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default CampaignList;
