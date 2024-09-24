import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Menu } from "../../../types";
import MenuForm from "./MenuForm";

interface MenuProps {
  onSave: (menuFormData: Menu) => void;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  menu?: { menuName: string; menuActive: boolean };
}

const AddMenuModal: React.FC<MenuProps> = ({
  onSave,
  isLoading,
  isOpen,
  onClose,
  menu,
}) => {
  const { restaurantId } = useParams();

  const handleSave = (menuFormData: Menu) => {
    onSave({ ...menuFormData, restaurant: restaurantId || "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{ maxWidth: "350px", width: "90vw", height: "53vh" }}
        className="flex flex-col space-y-2"
      >
        <DialogTitle className="whitespace-nowrap text-xl font-medium tracking-wide">
          {menu ? "Edit Menu" : `Add a New Menu`}
        </DialogTitle>
        <MenuForm onSave={handleSave} isLoading={isLoading} menu={menu} />
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuModal;
