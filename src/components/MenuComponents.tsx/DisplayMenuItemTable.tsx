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

type Props = { data: MenuItem[] };

const DisplayMenuItemTable = ({ data }: Props) => {
  const [isExtrasModalOpen, setIsExtrasModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const openModal = (item: MenuItem, flag: string) => {
    if (flag === "extras") {
      setIsExtrasModalOpen(true);
    } else if (flag === "view") {
      setIsViewModalOpen(true);
      setSelectedItem(item);
    }
  };

  const closeModal = (flag: string) => {
    if (flag === "extras") {
      setIsExtrasModalOpen(false);
    } else if (flag === "view") {
      setIsViewModalOpen(false);
    }
    setSelectedItem(null);
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
                    <TableCell className="line-clamp-2">
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
                    <TableCell>
                      <AspectRatio ratio={20 / 7}>
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
                        // onClick={() => onEdit(item)} // Trigger edit with menu data
                      >
                        <Edit size={17} />
                      </p>
                      <p
                        className="cursor-pointer"
                        // onClick={() => onDelete(item._id)}
                      >
                        <Trash size={17} />
                      </p>
                    </TableCell>
                  </TableRow>
                  <ExtrasModal
                    isOpen={isExtrasModalOpen}
                    onClose={() => closeModal("extras")}
                    data={item.extras}
                  />
                  <MenuItemModal
                    isOpen={isViewModalOpen}
                    onClose={() => closeModal("view")}
                    data={selectedItem}
                    flag={0}
                  />
                </>
              ))
            : ""}
        </TableBody>
      </Table>
    </>
  );
};

export default DisplayMenuItemTable;
