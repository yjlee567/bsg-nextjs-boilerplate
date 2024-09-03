import createCombinedStore from "../createStore";

interface Props {
  isLoading: boolean;
  collapsed: boolean;
  expandedNavItems: string[];
  setIsLoading: (isLoading: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
  setExpandedNavItems: (items: string[]) => void;
}

const useGlobalSettingStore = createCombinedStore<Props>(set => ({
  isLoading: false,
  collapsed: false,
  expandedNavItems: [],
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setCollapsed: (collapsed: boolean) => set({ collapsed }),
  setExpandedNavItems: (items: string[]) => set({ expandedNavItems: items }),
}));

export default useGlobalSettingStore;
