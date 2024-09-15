import MenuItemForm from "../../forms/restaurantForm/menuForm/MenuItemForm";
// import { MenuItem } from "../../types";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";

interface MenuItemProps {
  // onSave: (menuFormData: MenuItem) => void;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const AddMenuItemModal: React.FC<MenuItemProps> = ({
  // onSave,
  isLoading,
  isOpen,
  onClose,
}) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          style={{ maxWidth: "650px", width: "90vw", height: "90vh" }}
          className="flex flex-col space-y-2"
        >
          <DialogTitle className="whitespace-nowrap text-xl font-medium tracking-wide">
            Add New Item
          </DialogTitle>
          <MenuItemForm isLoading={isLoading} />
          <DialogClose onClick={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMenuItemModal;
