"use client";

import React, { memo, useState } from "react";

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultActiveKey?: string;
}

const WorkTab: React.FC<TabsProps> = ({ tabs, defaultActiveKey }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0]?.key);

  const activeTab = tabs.find((tab) => tab.key === activeKey);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveKey(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition cursor-pointer
              ${
                activeKey === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">{activeTab?.content}</div>
    </div>
  );
};

export default memo(WorkTab);
