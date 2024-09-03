"use client";

import { useGlobalSettingStore } from "@/store";

const useGlobalSetting = () => {
  const isLoading = useGlobalSettingStore(state => state.isLoading);
  const collapsed = useGlobalSettingStore(state => state.collapsed);
  const expandedNavItems = useGlobalSettingStore(state => state.expandedNavItems);
  const updateGlobalLoading = useGlobalSettingStore(state => state.setIsLoading);
  const setCollapsed = useGlobalSettingStore(state => state.setCollapsed);
  const setExpandedNavItems = useGlobalSettingStore(state => state.setExpandedNavItems);

  return {
    isLoading,
    collapsed,
    expandedNavItems,
    updateGlobalLoading,
    setCollapsed,
    setExpandedNavItems,
  };
};

export default useGlobalSetting;
