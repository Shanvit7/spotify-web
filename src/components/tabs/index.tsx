const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  const handleTabChange = (label: string) => () => setActiveTab(label);
  return (
    <div>
      <div className="flex gap-4 items-center justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`py-2 transition-colors duration-300 ease-in-out font-bold ${
              activeTab === tab.label ? "text-white" : "text-gray-500"
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
