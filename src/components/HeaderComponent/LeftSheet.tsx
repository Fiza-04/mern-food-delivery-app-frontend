import {
  Heart,
  Menu,
  ReceiptText,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const LeftSheet = () => {
  const { user, logout } = useAuth0();

  const btnData = [
    {
      title: "Orders",
      icon: <ReceiptText size={20} className="mt-[1px]" />,
      link: "/",
    },
    {
      title: "Favourites",
      icon: <Heart size={20} className="mt-[1px]" />,
      link: "/",
    },
    {
      title: "Basket",
      icon: <ShoppingCart size={20} className="mt-[1px]" />,
      link: "/",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="mt-1 text-green-700" size={22} />
      </SheetTrigger>
      <SheetContent className="w-[300px]" side="left">
        <SheetHeader></SheetHeader>
        <SheetDescription className="flex flex-col mt-5">
          <div className="flex flex-col space-y-5">
            <Link to="/user-profile" className="flex flex-row space-x-5">
              <UserRound
                className="text-slate-400 bg-slate-200 p-2 rounded-full"
                size={50}
              />
              <div className="flex flex-col space-y-2">
                <span className="text-[20px] text-black font-semibold">
                  {user?.name ? user.name : "New User"}
                </span>
                <span className="text-slate-500 text-[14px] tracking-wide font-normal">
                  {user?.email}
                </span>
              </div>
            </Link>
            <Link
              to="/"
              className="text-green-700 hover:text-green-500 text-[14px] tracking-wide font-normal"
            >
              Manage your Account
            </Link>
          </div>
          <Separator className="bg-green-200 mt-5" />

          <div className="flex flex-col space-y-7 mt-10 text-black text-[19px]">
            {btnData.map((item) => (
              <div className="flex flex-row space-x-5">
                {item.icon}
                <Link to={item.link}>{item.title}</Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-6 mt-6 text-black text-[16px] font-medium">
            <Separator className="bg-green-200 mt-7 mb-5" />
            <Link to="/">Create a business account</Link>
            <Link to="/">Add your business</Link>
            <Link to="/">Sign up to deliver</Link>
          </div>
          <Button
            className="mt-16 bg-black hover:bg-zinc-950 text-[15px] font-normal py-6  shadow-none"
            onClick={() => logout()}
          >
            Sign Out
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default LeftSheet;
