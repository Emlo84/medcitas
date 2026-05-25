"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ items, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || "");

  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      {/* Tab buttons */}
      <div className="flex border-b border-neutral-200">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
              activeTab === item.id
                ? "text-primary-500 border-b-2 border-primary-500"
                : "text-neutral-600 hover:text-neutral-900"
            )}
            aria-selected={activeTab === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">{activeContent}</div>
    </div>
  );
}
