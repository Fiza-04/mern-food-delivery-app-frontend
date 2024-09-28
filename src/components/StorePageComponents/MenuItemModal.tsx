import { Dialog, DialogContent, DialogTitle, DialogClose } from "../ui/dialog"; // Adjust import path as needed
import item from "../../assets/images/food.jpeg";
import { Button } from "../ui/button";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemIndex: number | null;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({
  isOpen,
  onClose,
  itemIndex,
}) => {
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(0);

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
    <Dialog open={isOpen} onOpenChange={onClose} key={itemIndex}>
      <DialogContent
        style={{ maxWidth: "850px", width: "90vw", height: "70vh" }}
        className="flex flex-row space-x-2"
      >
        <div className="w-[50%]">
          <img
            src={item}
            className="w-full h-full object-cover  rounded-l-[10px] cursor-pointer"
          />
        </div>
        <div
          className="w-[50%] space-y-3 overflow-y-auto h-[65vh]"
          style={{
            scrollbarWidth: "none", // Hide scrollbar in Firefox
            msOverflowStyle: "none", // Hide scrollbar in IE/Edge
          }}
        >
          <style>
            {`
            /* Hide scrollbar for Chrome, Safari, and Opera */
            .pt-5::-webkit-scrollbar {
              display: none;
            }
            `}
          </style>
          <DialogTitle className="whitespace-nowrap text-3xl font-medium tracking-wide">
            Flames Original Salad
          </DialogTitle>
          <p className="pt-1">
            <span className="text-green-700 text-xl font-semibold">
              &#163;6.39
            </span>{" "}
            • <span className="text-slate-500">30 - 45 min</span>
          </p>
          <p className="text-[15px] text-zinc-500 flex text-justify pt-5">
            The Flames Original Salad is a fresh and vibrant mix of crisp
            greens, juicy tomatoes, and cucumbers, topped with shredded carrots
            and red onions. It is served with a tangy house vinaigrette
            dressing, perfectly balancing flavors and textures. A healthy and
            satisfying option, it's great as a side or a light meal on its own.
          </p>
          <div className="pt-3">
            {click ? (
              <div className="flex flex-row space-x-4 w-fit bg-slate-100 px-3 py-[3px] rounded-full">
                <Minus
                  onClick={() => handlClick("minus")}
                  size={19}
                  className="pt-1 cursor-pointer"
                />
                <p className="text-[16px]">{count}</p>
                <Plus
                  onClick={() => handlClick("plus")}
                  size={19}
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
          <div className="flex flex-col space-y-3 pt-5">
            <Button className="py-5 text-base font-normal">
              Add To Basket • ({count} items)
            </Button>
            <Button className="py-5 text-base font-normal">Go To Basket</Button>
          </div>
        </div>
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemModal;
