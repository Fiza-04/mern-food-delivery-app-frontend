import { Ellipsis, Heart } from "lucide-react";
import food from "../../assets/images/food.jpeg";
import landing from "../../assets/images/landing-main.jpg";

const StoreHeader = () => {
  return (
    <div>
      <div
        className="w-full hidden md:block md:h-60  bg-cover bg-right bg-no-repeat rounded-[15px] mb-10"
        style={{ backgroundImage: `url(${landing})` }}
      >
        <div className=" absolute top-64 left-28  w-24 h-24 border-[3px] border-white rounded-full">
          <img src={food} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <div className="flex flex-row justify-between -mt-3">
        <div className="flex flex-col text-black font-semibold md:text-3xl lg:text-4xl lg:leading-relaxed">
          Chocoberry
          <p className="text-[17px] font-normal">
            4.3 ☆ &#163;3.5 Delivery Fee •{" "}
            <span className="text-slate-500">Delivered in 30 - 45 min</span>
          </p>
        </div>
        <div className="flex flex-row space-x-6">
          <Heart
            className="bg-slate-100 hover:bg-slate-200 hover:fill-white p-2 rounded-full cursor-pointer"
            size={35}
          />
          <Ellipsis
            className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full cursor-pointer"
            size={35}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
