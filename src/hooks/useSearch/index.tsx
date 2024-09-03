"use client";

import { useState } from "react";

const useSearch = <T extends object>(props?: T) => {
  const [state, setState] = useState<T & { isSearched: boolean }>({
    ...(props as T),
    isSearched: false,
  });

  const updateSearchWord = (obj: Partial<T>) => {
    setState(prev => ({
      ...prev,
      ...obj,
    }));
  };

  const updateIsSearched = (isSearched: boolean) => {
    setState(prev => ({
      ...prev,
      isSearched,
    }));
  };

  return {
    ...state,
    updateSearchWord,
    updateIsSearched,
  };
};

export default useSearch;
