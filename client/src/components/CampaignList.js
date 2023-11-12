// src/components/CampaignList/CampaignList.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CampaignCard from "./CampaignCard";
import Modal from "./Modal";
import DonationForm from "./DonationForm";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useCallback ensures that the function is not recreated on every render
  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3001/api/campaigns");
      setCampaigns(response.data);
    } catch (err) {
      setError("Failed to load campaigns. Please try again later.");
      console.error("There was an error fetching the campaigns:", err);
    }
    setLoading(false);
  }, []);

  // Initial fetch for campaigns
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleDonationSubmit = async (donationData) => {
    const { amount, nickname } = donationData; // Destructure to get individual values
    try {
      await axios.post("http://localhost:3001/donate", {
        campaignId: selectedCampaign.id,
        amount: Number(amount), // Ensure amount is a number
        donatorNickname: nickname || "Anonymous", // Use donor's nickname if provided
      });
      setSelectedCampaign(null); // Close modal after donation
      fetchCampaigns(); // Refresh the list of campaigns
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

  return (
    <div className="w-full mx-auto p-8 max-w-[1600px]">
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
          onClose={() => {
            setSelectedCampaign(null);
            fetchCampaigns(); // Refresh the list when modal is closed
          }}
        >
          <DonationForm onSubmit={handleDonationSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default CampaignList;
