import React from "react";

const CampaignCard = ({ campaign, onDonate }) => {
  const goalAmount = Number(campaign.goal_usd);
  const raisedAmount = Number(campaign.amount_raised);
  const percentRaised = Math.min((raisedAmount / goalAmount) * 100, 100);

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-4 hover:scale-105 duration-300 hover:shadow-indigo-200">
      <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
      <p className="text-gray-600 mb-4">{campaign.description}</p>
      <div className="mb-4 font-semibold">
        <div className="flex sm:flex-row flex-col justify-between">
          <div className="text-sm text-gray-500">
            Raised: ${raisedAmount.toFixed()}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            Goal: ${goalAmount.toFixed()}
          </div>
        </div>

        <div className="w-full bg-neutral-200 rounded-full h-4">
          <div
            className="bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-white rounded-l-full"
            style={{ width: `${percentRaised}%` }}
          >
            {percentRaised.toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center mt-4 ">
        <button
          onClick={() => onDonate(campaign)}
          className="w-full max-w-[160px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-8 rounded"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
