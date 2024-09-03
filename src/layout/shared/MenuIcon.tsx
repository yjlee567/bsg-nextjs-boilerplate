import { Menu } from "lucide-react";
import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import Logo from "./Logo";
import Nav from "../DashboardLayout/components/Nav";

const MenuIcon = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-2">
          <Logo />
          <div className="flex-1">
            <Nav />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuIcon;
