import { useRef } from "react";
import hotpot from "../../assets/images/hotpot.png";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CuisineScrollbar = () => {
  const scrollRef = useRef<HTMLUListElement>(null);

  // Scroll function
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <button
        className="absolute left-0 z-10 p-1 text-white bg-green-500 rounded-full -translate-y-6 top-1/2"
        onClick={() => scroll(-200)} // Scroll left by 200px
      >
        <ArrowLeft size={22} />
      </button>

      {/* Scrollable container */}
      <div className="overflow-x-hidden w-full px-10">
        <ul
          className="flex flex-row space-x-9 overflow-x-hidden whitespace-nowrap w-[100%]"
          ref={scrollRef}
        >
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <li key={index} className="inline-flex">
                <div key={index} className="flex flex-col w-24 space-y-2">
                  <img
                    src={hotpot}
                    className="w-24 h-24 object-cover"
                    alt="Hot Pot"
                  />
                  <p className="text-[15px] font-medium text-center text-slate-800">
                    Hot Pot
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 z-10 p-1 text-white bg-green-500 rounded-full -translate-y-6 top-1/2"
        onClick={() => scroll(200)} // Scroll right by 200px
      >
        <ArrowRight size={22} />
      </button>
    </div>
  );
};

export default CuisineScrollbar;
