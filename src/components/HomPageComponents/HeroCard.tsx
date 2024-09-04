const HeroCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md py-8 flex flex-col text-center -mt-20">
      <h1 className="text-[40px] font-semibold text-green-400">
        Craving. <span className="text-green-600">Click.</span>
        <span className="text-green-800"> Nom.</span>
      </h1>
      <span className="pt-3 text-[14px] font-normal">
        Nom-worthy meals, just a click away!
      </span>
    </div>
  );
};

export default HeroCard;
