import landing from "../assets/images/landing.jpg";

const Hero = () => {
  return (
    <div>
      <img src={landing} className="w-full max-h-[500px] object-cover" />
    </div>
  );
};

export default Hero;
