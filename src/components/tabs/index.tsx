import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  return (
    <div>
      <div className="flex justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 transition-colors duration-300 ease-in-out ${
              activeTab === tab.label ? "text-white font-bold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`transition-opacity duration-300 ease-in-out ${
              activeTab === tab.label ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeTab === tab.label && tab.content}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Tabs;
