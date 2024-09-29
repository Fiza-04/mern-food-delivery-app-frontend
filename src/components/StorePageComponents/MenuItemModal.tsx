import { Dialog, DialogContent, DialogTitle, DialogClose } from "../ui/dialog"; // Adjust import path as needed
import { Button } from "../ui/button";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { MenuItem } from "../../types";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

type MenuItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: MenuItem | null;
  flag: number;
};

const MenuItemModal = ({ isOpen, onClose, data, flag }: MenuItemModalProps) => {
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(0);

  const handlClick = (type: string) => {
    // if (flag === 0) return;
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

  const CountBtn = () => {
    return (
      <div className={`pt-3 ${flag === 0 ? "pointer-events-none" : ""}`}>
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
            className={`cursor-pointer w-fit h-fit rounded-full p-1 bg-slate-100 hover:bg-slate-200 ${
              flag === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            size={19}
            onClick={() => handlClick("")}
          />
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} key={data?._id}>
      <DialogContent
        style={{ maxWidth: "850px", width: "90vw", height: "70vh" }}
        className="flex flex-row space-x-2"
      >
        <div className="w-[50%]">
          <img
            src={data?.menuItemImageFile}
            className="w-full h-2/3 object-cover  rounded-l-[10px] cursor-pointer"
          />
          <CountBtn />

          <div className="flex flex-col space-y-3 pt-5">
            <Button
              className={`py-5 text-base font-normal ${
                flag === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Add To Basket • ({count} items)
            </Button>
            <Button
              className={`py-5 text-base font-normal ${
                flag === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Go To Basket
            </Button>
          </div>
        </div>
        <div
          className="w-[50%] space-y-3 overflow-y-auto h-[65vh]"
          style={{
            scrollbarWidth: "none", // Hide scrollbar in Firefox
            msOverflowStyle: "none", // Hide scrollbar in IE/Edge
          }}
        >
          <DialogTitle className="whitespace-nowrap text-3xl font-medium tracking-wide">
            {data?.itemName}
          </DialogTitle>
          <p className="pt-1">
            <span className="text-green-700 text-xl font-semibold">
              &#163;{data?.itemPrice}
            </span>{" "}
            • <span className="text-slate-500">30 - 45 min</span>
          </p>
          <div className="flex flex-col overflow-y-auto scrollbar-hide">
            <p className="text-[15px] text-zinc-500 flex text-justify pt-5 mb-3">
              {data?.itemDescription}
            </p>
            <Separator />
            <div className="flex flex-col py-3">
              <h1 className="text-xl font-semibold">Add On</h1>
              {data?.extras ? (
                <Table>
                  {data?.extras?.map((item) => (
                    <TableBody>
                      <TableRow>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          <CountBtn />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              ) : (
                "No Add Ons"
              )}
            </div>
          </div>
        </div>
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemModal;
