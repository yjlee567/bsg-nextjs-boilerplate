import { PortalIcon, ProfileIcon } from "@/layout/shared";

interface Props {
  title?: string;
}

const Header = ({ title }: Props) => {
  return (
    <header className="flex h-14 items-center gap-4 sticky top-0 left-0 shrink-0 bg-white px-4 lg:h-16 lg:px-6 z-[1]">
      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <PortalIcon />
        <ProfileIcon />
      </div>
    </header>
  );
};

export default Header;
