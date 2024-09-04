import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-green-600 h-32 md:h-20 mt-10 px-10 pt-7 md:flex md:flex-row md:justify-between">
      {/* Social Media Icons */}
      <div className="flex flex-row space-x-8 text-[25px] text-white justify-center md:justify-start mb-0 md:mb-0">
        <div className="cursor-pointer hover:text-green-300">
          <TwitterIcon />
        </div>
        <div className="cursor-pointer hover:text-green-300">
          <FacebookIcon />
        </div>
        <div className="cursor-pointer hover:text-green-300">
          <InstagramIcon />
        </div>
      </div>

      {/* Centered Logo (on small screens) */}
      <Link
        to="/"
        className="text-[27px] font-medium text-green-400 hidden md:block mb-4 -mt-1"
      >
        NomNom<span className="font-bold text-green-700">Now</span>
      </Link>

      {/* Privacy Policy and Terms & Conditions Links */}
      <div className="flex-row text-white text-[17px] font-normal text-center justify-center md:justify-end space-x-9  pt-3 md:pt-0">
        <Link to="/" className="hover:text-green-300">
          Privacy Policy
        </Link>
        <Link to="/" className="hover:text-green-300">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
};

export default Footer;
