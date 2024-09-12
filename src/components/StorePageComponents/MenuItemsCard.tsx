import { useState } from "react";
import item from "../../assets/images/food.jpeg";
import { Minus, Plus } from "lucide-react";

interface MenuItemCardProps {
  onClick: () => void;
}

const MenuItemsCard: React.FC<MenuItemCardProps> = ({ onClick }) => {
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(0);

  const style: React.CSSProperties = {
    display: "-webkit-box", // Workaround for TypeScript
    WebkitBoxOrient: "vertical", // Workaround for TypeScript
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
  };

  const handlClick = (type: string) => {
    if (!click && type === "") {
      setClick(true);
      setCount(1);
    } else if (type === "minus") {
      if (count === 1) {
        setClick(false);
        setCount(0);
      }
      setCount(count - 1);
    } else if (type === "plus") {
      setCount(count + 1);
    }
  };

  return (
    <div className="flex flex-row border border-slate-200 space-x-7 rounded-[10px]">
      <div className="flex flex-col p-4 space-y-1">
        {/* menuitem name */}
        <div className="flex flex-row space-x-5">
          <h1
            className="text-[18px] font-medium cursor-pointer"
            onClick={onClick}
          >
            Flames Original Salad
          </h1>

          <div>
            {click ? (
              <div className="flex flex-row space-x-3 bg-slate-100 px-2 py-[3px] rounded-full">
                <Minus
                  onClick={() => handlClick("minus")}
                  size={17}
                  className="pt-1 cursor-pointer"
                />
                <p className="text-[15px]">{count}</p>
                <Plus
                  onClick={() => handlClick("plus")}
                  size={17}
                  className="pt-1 cursor-pointer"
                />
              </div>
            ) : (
              <Plus
                className="cursor-pointer w-fit h-fit rounded-full p-1 bg-slate-100  hover:bg-slate-200"
                size={18}
                onClick={() => handlClick("")}
              />
            )}
          </div>
        </div>
        {/* price and delivery time*/}
        <p>
          &#163;6.39 • <span className="text-slate-500">30 - 45 min</span>
        </p>
        {/* description */}
        <p
          style={style}
          className="text-[14px] text-zinc-500 tracking-wide cursor-pointer"
          onClick={onClick}
        >
          The Flames Original Salad is a fresh and vibrant mix of crisp greens,
          juicy tomatoes, and cucumbers, topped with shredded carrots and red
          onions. It is served with a tangy house vinaigrette dressing,
          perfectly balancing flavors and textures. A healthy and satisfying
          option, it's great as a side or a light meal on its own.
        </p>
      </div>
      {/* image */}
      <div className="w-[30%]">
        <div className="flex w-36 h-36 ">
          <img
            src={item}
            className="w-full h-full object-cover  rounded-r-[10px] cursor-pointer"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemsCard;
