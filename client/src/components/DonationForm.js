// src/components/DonationForm/DonationForm.js

import React, { useState } from "react";

const DonationForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the donation details up to the parent component
    onSubmit({ amount: Number(amount), nickname });
    setAmount("");
    setNickname("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <label htmlFor="amount" className="mb-2 font-semibold">
          Donation Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="amount"
            name="amount"
            className="pl-7 p-2 border border-gray-300 rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm"
            placeholder="0"
            min="0"
            step="1" // This allows only integers
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))} // Allow only digits
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="nickname" className="mb-2 font-semibold">
          Your Nickname
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          className="p-2 border border-gray-300 rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm"
          placeholder="Anonymous"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
      >
        Donate
      </button>
    </form>
  );
};

export default DonationForm;
