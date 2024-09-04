import BusinessSection from "../components/HomPageComponents/BusinessSection";
import HeroCard from "../components/HomPageComponents/HeroCard";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <HeroCard />
      <BusinessSection />
    </div>
  );
};

export default HomePage;
