import { useGetAllRestaurants } from "../api/restaurant.api";
import CuisineScrollbar from "../components/HomePageComponents/CuisineScrollbar";
import IntroHeader from "../components/HomePageComponents/IntroHeader";
import RestaurantsDisplay from "../components/HomePageComponents/RestaurantsDisplay";
import notfound from "../assets/images/notfound.png";

const HomePage = () => {
  const { restaurants } = useGetAllRestaurants();

  return (
    <div>
      {/* one deign image */}
      <IntroHeader />

      {/* optional (more filters) */}
      {/* restaurant cards */}
      {restaurants?.length === 0 ? (
        <div className="flex  justify-center items-center space-x-5">
          <p className="text-3xl font-semibold text-slate-300">
            No restaurants have been added yet !!!
          </p>
          <img src={notfound} className="w-32" />
        </div>
      ) : (
        <>
          {/* vertical scroll bar for filter */}
          <div className="mb-10">
            <CuisineScrollbar />
          </div>
          <div className="">
            <RestaurantsDisplay restaurants={restaurants} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
