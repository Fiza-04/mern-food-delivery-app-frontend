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

type Props = { data: MenuItem[] };

const DisplayMenuItemTable = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setSelectedItem(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                    <TableCell>{item.itemDescription}</TableCell>
                    <TableCell>
                      <span onClick={() => openModal(index)}>
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
                        // onClick={() => handleClick(item._id)}
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
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    index={selectedItem}
                    data={item.extras}
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
