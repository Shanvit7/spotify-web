const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  const handleTabChange = (label: string) => () => setActiveTab(label);
  return (
    <div>
      <div className="flex justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 transition-colors duration-300 ease-in-out ${
              activeTab === tab.label ? "text-white font-bold" : "text-gray-500"
            }`}
            onClick={handleTabChange(tab?.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
