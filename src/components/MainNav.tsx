import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserMenu from "./LandingPageComponents/UserMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UserMenu />
      ) : (
        <div className="space-x-5">
          <Button
            variant="ghost"
            className="hover:bg-green-50 text-[15px] font-medium rounded-full shadow-sm shadow-green-100 px-9 py-5"
            onClick={async () => await loginWithRedirect()}
          >
            Log In
          </Button>
          <Button
            variant="ghost"
            className="bg-green-500 hover:bg-green-400 text-white hover:text-white text-[15px] font-medium rounded-full  px-7 py-5"
            onClick={async () => await loginWithRedirect()}
          >
            Sign Up
          </Button>
        </div>
      )}
    </span>
  );
};

export default MainNav;
