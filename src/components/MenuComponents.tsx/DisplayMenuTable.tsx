import { Edit, List, Trash } from "lucide-react";
import { Menu } from "../../types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";

type Props = {
  data: Menu[];
  onEdit: (menu: Menu) => void;
  onDelete: (menuId: Menu) => void;
};

const DisplayMenuTable = ({ data, onEdit, onDelete }: Props) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/menu-item/${id}`);
  };

  return (
    <Table>
      <TableCaption>Manage Your Restaurants Menu</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Menu Name</TableHead>
          <TableHead>Amount of items</TableHead>
          <TableHead>Active/Inactive</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data
          ? data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.menuName}</TableCell>
                <TableCell>Amount of items</TableCell>
                <TableCell>{item.menuActive ? "Active" : "Inactive"}</TableCell>
                <TableCell className="flex flex-row space-x-5">
                  <p
                    className="cursor-pointer"
                    onClick={() => handleClick(item._id)}
                  >
                    <List size={17} />
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => onEdit(item)} // Trigger edit with menu data
                  >
                    <Edit size={17} />
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => onDelete(item._id)}
                  >
                    <Trash size={17} />
                  </p>
                </TableCell>
              </TableRow>
            ))
          : ""}
      </TableBody>
    </Table>
  );
};

export default DisplayMenuTable;
