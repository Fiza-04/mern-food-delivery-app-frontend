import { ChevronDown, MapPin, Search, ShoppingCart } from "lucide-react";
import { Input } from "../ui/input";

const UserMenu = () => {
  return (
    <div className="flex flex-row space-x-10 lg:space-x-20 items-center">
      <div className="flex flex-row space-x-1 items-center">
        <MapPin size={17} />
        <span className="whitespace-nowrap">10 Carlton Drive • Now</span>
        <ChevronDown size={15} className="mt-1" />
      </div>
      <div className="flex flex-row space-x-2">
        <Search size={20} className="mt-3" />
        <Input
          placeholder="Search your nom . . ."
          className="w-44 lg:w-96 h-10 rounded-full bg-slate-100 border-0 placeholder:tracking-wide  placeholder:text-slate-400"
        />
      </div>
      <ShoppingCart size={22} />
    </div>
  );
};

export default UserMenu;
