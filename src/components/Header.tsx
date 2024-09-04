import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { useAuth0 } from "@auth0/auth0-react";
import LeftSheet from "./HeaderComponent/LeftSheet";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="py-4 sticky top-0 bg-white z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-7">
          {isAuthenticated ? <LeftSheet /> : ""}
          <Link
            to="/"
            className="text-[27px] md:text-[20px] lg:text-[27px] font-medium text-green-400"
          >
            NomNom<span className="font-bold text-green-600">Now</span>
          </Link>
        </div>
        {!isAuthenticated ? (
          <div className="md:hidden">
            <MobileNav />
          </div>
        ) : (
          ""
        )}

        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
