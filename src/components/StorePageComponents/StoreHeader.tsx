import food from "../../assets/images/food.jpeg";
import landing from "../../assets/images/landing-main.jpg";

const StoreHeader = () => {
  return (
    <div>
      <div
        className="w-full hidden md:block md:h-56  bg-cover bg-right bg-no-repeat rounded-[10px] mb-10"
        style={{ backgroundImage: `url(${landing})` }}
      >
        <div className=" absolute top-60 left-[47%] w-32 h-32 border-[3px] border-white rounded-full">
          <img src={food} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <div className="flex justify-center items-center pt-4">
        <div className="flex flex-col text-black font-medium md:text-3xl lg:text-4xl lg:leading-relaxed text-center">
          Chocoberry
          <p className="text-[17px] font-normal">
            4.3 ☆ &#163;3.5 Delivery Fee •{" "}
            <span className="text-slate-500">Delivered In 30 - 45 min</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
