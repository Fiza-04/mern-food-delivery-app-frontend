import { Heart } from "lucide-react";
import food from "../../assets/images/food.jpeg";
import { useNavigate } from "react-router-dom";

const RestaurantCards = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/restaurant");
  };

  return (
    <div className="flex flex-col w-full cursor-pointer" onClick={handleClick}>
      <div
        className="w-full h-32 bg-cover bg-center  rounded-t-[10px]  bg-no-repeat"
        style={{ backgroundImage: `url(${food})` }}
      >
        {/* <img
          src={food}
          className="w-full h-full object-cover rounded-t-[10px]"
        /> */}
        <div className="flex justify-end p-3">
          <Heart className="text-white cursor-pointer hover:fill-white" />
        </div>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <div className="flex flex-col">
          <h1 className="text-[17px] font-medium">Chocoberry</h1>
          <p className="font-normal lg:text-[14px] text-[13px]">
            &#163;3.29 Delivery Fee{" "}
            <span className="text-slate-600">• 35 - 50 min</span>
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
