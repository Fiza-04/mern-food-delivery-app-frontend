import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../types";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCards = ({ restaurant }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant._id}`);
  };

  return (
    <div className="flex flex-col w-full cursor-pointer" onClick={handleClick}>
      <div
        className="w-full h-32 bg-cover bg-center  rounded-t-[10px]  bg-no-repeat"
        style={{ backgroundImage: `url(${restaurant.imageFile})` }}
      >
        <div className="flex justify-end p-3">
          <Heart className="text-white cursor-pointer hover:fill-white" />
        </div>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <div className="flex flex-col">
          <h1 className="text-[17px] font-medium">
            {restaurant.restaurantName}
          </h1>
          <p className="font-normal lg:text-[14px] text-[13px]">
            &#163;{(restaurant.deliveryPrice / 10).toFixed(2)} Delivery Fee
            <span className="text-slate-600">
              &#160;• {restaurant.estimatedDeliveryTime - 10} -&#160;
              {restaurant.estimatedDeliveryTime} min
            </span>
          </p>
        </div>
        <div className="bg-slate-200 flex justify-center items-center h-8 w-8 mt-2 rounded-full text-[14px] font-medium">
          4.3
        </div>
      </div>
    </div>
  );
};

export default RestaurantCards;
