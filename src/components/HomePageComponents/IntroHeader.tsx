import { Button } from "../ui/button";
import landing from "../../assets/images/landing-main.jpg";

const IntroHeader = () => {
  return (
    <div className="-mt-6">
      {/* one deign image */}
      <div
        className="w-full hidden md:block md:h-72 lg:h-96 bg-cover bg-right bg-no-repeat rounded-[10px] mb-10"
        style={{ backgroundImage: `url(${landing})` }}
      >
        <div className="flex items-center  h-full rounded-[10px]">
          <h1 className="text-white md:text-3xl lg:text-5xl p-20 lg:leading-relaxed">
            Order your Favorite Food <br />
            <span className="font-semibold">Now !!!</span>
            <div>
              <Button className="md:text-base lg:text-lg font-normal md:mt-5 text-green-950 bg-green-400 md:px-5 lg:px-7 py-6 rounded-[10px] hover:bg-green-500">
                Get Exciting Offers
              </Button>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default IntroHeader;
