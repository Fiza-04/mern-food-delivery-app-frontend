import { Restaurant } from "../../types";
import RestaurantCards from "./RestaurantCards";

type Props = {
  restaurants: Restaurant[] | undefined;
};

const RestaurantsDisplay = ({ restaurants }: Props) => {
  console.log("restaurantsDisplay => ", restaurants);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-10">
      {restaurants?.map((restaurant, index) => (
        <RestaurantCards key={index} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantsDisplay;
