import CuisineScrollbar from "../components/HomePageComponents/CuisineScrollbar";
import IntroHeader from "../components/HomePageComponents/IntroHeader";
import RestaurantsDisplay from "../components/HomePageComponents/RestaurantsDisplay";

const HomePage = () => {
  return (
    <div>
      {/* one deign image */}
      <IntroHeader />
      {/* vertical scroll bar for filter */}
      <div className="mb-10">
        <CuisineScrollbar />
      </div>
      {/* optional (more filters) */}
      {/* restaurant cards */}
      <div className="">
        <RestaurantsDisplay />
      </div>
    </div>
  );
};

export default HomePage;
