import React, { useState } from "react";
import axios from "axios";

const AddCampaignForm = ({ token, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "http://localhost:3001/addCampaign",
        { name, description, goalUsd: parseFloat(goal) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Campaign added successfully!");
      // Reset form after successful submission
      setName("");
      setDescription("");
      setGoal("");
      onClose(); // close modal
    } catch (err) {
      setError("Failed to add campaign. Please try again.");
      console.error("Add campaign error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleAddCampaign}
        className="flex flex-col w-full max-w-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Campaign Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Campaign Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Campaign Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="goal"
          >
            Goal Amount ($)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="goal"
            type="number"
            min="1"
            step="0.01"
            placeholder="Goal Amount"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </div>

        <button
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Campaign
        </button>

        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </form>
    </div>
  );
};

export default AddCampaignForm;
