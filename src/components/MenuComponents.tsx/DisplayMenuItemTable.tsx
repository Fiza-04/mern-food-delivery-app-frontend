import { Edit, List, Trash } from "lucide-react";
import { MenuItem } from "../../types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import ExtrasModal from "./ExtrasModal";
import { AspectRatio } from "../ui/aspect-ratio";
import MenuItemModal from "../StorePageComponents/MenuItemModal";
import AddMenuItemModal from "./AddMenuItemModal";

type Props = {
  data: MenuItem[];
  onDelete: (menuItemId: string, menuId: string) => void;
  onSave: (menuItemFormData: FormData) => void;
  isLoading: boolean;
};

type Extras = {
  name: string;
  price: number;
};

const DisplayMenuItemTable = ({ data, onDelete, onSave, isLoading }: Props) => {
  const [isExtrasModalOpen, setIsExtrasModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Extras[] | null>(null);

  const openModal = (item: MenuItem, flag: string) => {
    if (flag === "extras") {
      const extrasWithNumberPrices = item.extras.map((extra) => ({
        ...extra,
        price: Number(extra.price), // Convert price to number
      }));

      setIsExtrasModalOpen(true);
      setSelectedExtras(extrasWithNumberPrices);
    } else if (flag === "view") {
      setIsViewModalOpen(true);
      setSelectedItem(item);
    } else if (flag === "edit") {
      setIsEditModalOpen(true);
      setSelectedItem(item);
    }
  };

  const closeModal = (flag: string) => {
    if (flag === "extras") {
      setIsExtrasModalOpen(false);
      setSelectedExtras(null);
    } else if (flag === "view") {
      setIsViewModalOpen(false);
      setSelectedItem(null);
    } else if (flag === "edit") {
      setIsEditModalOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <>
      <Table>
        <TableCaption>Manage Your Menu</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Dish Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>No. of Extras</TableHead>
            <TableHead>Dish Price</TableHead>
            <TableHead>Active/Inactive</TableHead>
            <TableHead>Image</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ? data.map((item, index) => (
                <>
                  <TableRow key={index}>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell className="line-clamp-2 leading-[1.7rem] mt-2">
                      {item.itemDescription}
                    </TableCell>
                    <TableCell>
                      <span
                        onClick={() => openModal(item, "extras")}
                        className="cursor-pointer"
                      >
                        {item.extras.length}
                      </span>
                    </TableCell>
                    <TableCell>{item.itemPrice}</TableCell>
                    <TableCell>
                      {item.menuItemActive ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell className="w-72">
                      <AspectRatio ratio={7 / 2}>
                        <img
                          src={item.menuItemImageFile}
                          className="rounded-md object-cover h-full w-full"
                          alt="Preview"
                        />
                      </AspectRatio>
                    </TableCell>
                    <TableCell className="flex flex-row space-x-5">
                      <p
                        className="cursor-pointer"
                        onClick={() => openModal(item, "view")}
                      >
                        <List size={17} />
                      </p>
                      <p
                        className="cursor-pointer"
                        onClick={() => openModal(item, "edit")} // Trigger edit with menu data
                      >
                        <Edit size={17} />
                      </p>
                      <p
                        className="cursor-pointer"
                        onClick={() => onDelete(item._id, item.menuId)}
                      >
                        <Trash size={17} />
                      </p>
                    </TableCell>
                  </TableRow>
                </>
              ))
            : ""}
        </TableBody>
      </Table>
      <ExtrasModal
        isOpen={isExtrasModalOpen}
        onClose={() => closeModal("extras")}
        data={selectedExtras || []}
      />
      <MenuItemModal
        isOpen={isViewModalOpen}
        onClose={() => closeModal("view")}
        data={selectedItem}
        flag={0}
      />
      <AddMenuItemModal
        onSave={onSave}
        isLoading={isLoading}
        isOpen={isEditModalOpen}
        onClose={() => closeModal("edit")}
        data={selectedItem}
      />
    </>
  );
};

export default DisplayMenuItemTable;
