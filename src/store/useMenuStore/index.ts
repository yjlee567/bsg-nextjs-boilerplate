import createCombinedStore from "../createStore";
import { ProgramMenu as ProgramMenuType } from "@/types/layout";
import { DropdownItems } from "@/types/ui";

interface ProgramMenu {
  navMenu: ProgramMenuType[];
  accountMenu: DropdownItems;
}

interface ProgramLoaded {
  isLoadedNav: boolean;
}

interface Props extends ProgramMenu, ProgramLoaded {
  setMenu: (menu: Partial<ProgramMenu>) => void;
  setLoaded: (loading: Partial<ProgramLoaded>) => void;
}

const useMenuStore = createCombinedStore<Props>(set => ({
  accountMenu: [],
  navMenu: [],
  isLoadedNav: false,
  setMenu: menu => set(state => ({ ...state, ...menu })),
  setLoaded: loading => set(state => ({ ...state, ...loading })),
}));

export default useMenuStore;
