import { Link } from "react-router-dom";
import imageOne from "../../assets/images/business-acc.jpg";
import imageTwo from "../../assets/images/cooking.jpg";
import imageThree from "../../assets/images/delivery.jpg";

const BusinessSection = () => {
  const data = [
    {
      source: imageOne,
      className:
        "h-[300px] md:h-[170px] lg:h-[285px] object-cover object-bottom",
      text: "Create a business account",
    },
    {
      source: imageTwo,
      className:
        "h-[300px] md:h-[170px] lg:h-[285px] object-cover object-bottom",
      text: "Add your restaurant",
    },
    {
      source: imageThree,
      className:
        "h-[300px] md:h-[170px] lg:h-[285px] object-cover object-bottom",
      text: "Sign up to deliver",
    },
  ];

  return (
    <div className="grid space-y-3 md:grid-cols-3 md:space-y-0 gap-8  mt-10">
      {data.map((item) => (
        <Link to="/" className="flex flex-col">
          <img src={item.source} className={item.className} />
          <p className="underline text-[20px] font-semibold pt-4">
            {item.text}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default BusinessSection;
