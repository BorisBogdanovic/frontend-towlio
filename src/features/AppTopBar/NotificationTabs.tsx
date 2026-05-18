type Tab = "all" | "unread";

interface Props {
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
}

const baseClasses = "flex-1 cursor-pointer py-2 text-sm font-medium transition";

const NotificationTabs = ({ activeTab, onChangeTab }: Props) => {
  const renderTab = (tab: Tab, label: string) => {
    const isActive = activeTab === tab;

    return (
      <button
        key={tab}
        onClick={() => onChangeTab(tab)}
        className={`${baseClasses} ${
          isActive
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-400 hover:text-gray-700"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex border-t border-gray-100">
      {renderTab("all", "All")}
      {renderTab("unread", "Unread")}
    </div>
  );
};

export default NotificationTabs;
