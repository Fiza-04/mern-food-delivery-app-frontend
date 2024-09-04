import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNav = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-[300px]">
        <SheetHeader></SheetHeader>
        <SheetTitle className="mb-5 flex flex-col space-y-1">
          <span>Welcome to</span>
          <span className="text-[25px] text-green-400">
            NomNom<span className="text-green-600 font-bold">Now</span>
          </span>
        </SheetTitle>
        <Separator className="bg-zinc-100" />
        <SheetDescription className="flex flex-col mt-5">
          <div className="flex flex-col space-y-2">
            <Button
              className="bg-black hover:bg-zinc-900 text-[18px] font-normal py-7  shadow-none"
              onClick={() => loginWithRedirect()}
            >
              Sign Up
            </Button>
            <Button
              className="bg-zinc-100 hover:bg-zinc-200 text-black text-[18px] py-7 shadow-none"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </Button>
          </div>
          <div className="flex flex-col space-y-4 mt-6 text-black text-[15px] font-medium">
            <Link to="/">Create a business account</Link>
            <Link to="/">Add your business</Link>
            <Link to="/">Sign up to deliver</Link>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
