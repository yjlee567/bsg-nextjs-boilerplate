import Nav from "./Nav";
import { AdminIcon, Logo, ProfileIcon } from "@/layout/shared";

const Header = () => {
  return (
    <header className="h-16 flex w-full items-center justify-between px-6 border-b">
      <Logo />
      <Nav />
      <div className="flex items-center gap-2">
        <AdminIcon />
        <ProfileIcon />
      </div>
    </header>
  );
};

export default Header;
