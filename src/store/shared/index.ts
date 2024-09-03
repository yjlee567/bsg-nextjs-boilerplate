import { PageParams } from "@/types/ui";

export interface PageParamsProps {
  pageParams: PageParams;
  setPageParams: (pageParams: Partial<PageParams>) => void;
}

export const initPageParams: PageParams = {
  total: 0,
  page: 1,
  perPage: 10,
};

export interface SearchParamsProps {
  isSearched: boolean;
  searchParams: object | null;
  setSearchParams: (filter: object | null) => void;
  setIsSearched: (isSearched: boolean) => void;
}