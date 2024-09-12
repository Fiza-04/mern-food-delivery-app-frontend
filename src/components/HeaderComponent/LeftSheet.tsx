import React from "react";
import {
  ChartNoAxesColumn,
  CookingPot,
  Heart,
  Home,
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
import { useAccount } from "../../context/AccountProvider";
import { useGetCurrentUser } from "../../api/user.api";

const LeftSheet = () => {
  const { logout } = useAuth0();
  const { state, dispatch } = useAccount();
  const { currentUser } = useGetCurrentUser();

  const userAccData = [
    {
      title: "Home",
      icon: <Home size={20} className="mt-[1px]" />,
      link: "/",
    },
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

  const businessAccData = [
    {
      title: "Your Restaurant",
      icon: <Home size={20} className="mt-[1px]" />,
      link: "/manage-restaurant",
    },
    {
      title: "Menu",
      icon: <CookingPot size={20} className="mt-[1px]" />,
      link: "/add-menu",
    },
    {
      title: "Orders",
      icon: <ReceiptText size={20} className="mt-[1px]" />,
      link: "/manage-orders",
    },
    {
      title: "Statistics",
      icon: <ChartNoAxesColumn size={20} className="mt-[1px]" />,
      link: "/stats",
    },
  ];

  const handleAccounts = () => {
    dispatch({ type: "TOGGLE_ACCOUNT_TYPE" });
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="mt-1 text-green-700" size={22} />
      </SheetTrigger>
      <SheetContent className="w-[300px]" side="left">
        <SheetHeader></SheetHeader>
        <SheetDescription className="flex flex-col mt-5">
          <Link to="/user-profile" className="flex flex-col space-y-5">
            <div className="flex flex-row space-x-5">
              <UserRound
                className="text-slate-400 bg-slate-200 p-2 rounded-full"
                size={50}
              />
              <div className="flex flex-col space-y-2">
                <span className="text-[20px] text-black font-semibold">
                  {currentUser?.name || "New User"}
                </span>
                <span className="text-slate-500 text-[14px] tracking-wide font-normal">
                  {currentUser?.email}
                </span>
              </div>
            </div>
            <div className="text-green-700 hover:text-green-500 text-[14px] tracking-wide font-normal">
              Manage your Account
            </div>
          </Link>
          <Separator className="bg-green-200 mt-5" />

          <div className="flex flex-col space-y-7 mt-10 text-black text-[19px]">
            {(state.accountType ? businessAccData : userAccData).map((item) => (
              <Link
                to={item.link}
                key={item.title}
                className="flex flex-row space-x-5"
              >
                {item.icon}
                <div>{item.title}</div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-6 mt-6 text-black text-[16px] font-medium">
            <Separator className="bg-green-200 mt-7 mb-5" />
            <p className="cursor-pointer" onClick={handleAccounts}>
              {state.accountType ? (
                <Link to="/">Go Back to Buying Account</Link>
              ) : (
                <Link to="/manage-restaurant">Add your business</Link>
              )}
            </p>
            <Link to="/">Sign up to deliver</Link>
          </div>
          <Button
            className="mt-16 bg-black hover:bg-zinc-950 text-[15px] font-normal py-6 shadow-none"
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
