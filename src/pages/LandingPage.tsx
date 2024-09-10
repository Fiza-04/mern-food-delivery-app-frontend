import { useAuth0 } from "@auth0/auth0-react";
import BusinessSection from "../components/LandingPageComponents/BusinessSection";
import HeroCard from "../components/LandingPageComponents/HeroCard";
import HomePage from "./HomePage";

const LandingPage = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated ? (
        <HomePage />
      ) : (
        <div className="flex flex-col gap-12">
          <HeroCard />
          <BusinessSection />
        </div>
      )}
    </>
  );
};

export default LandingPage;
