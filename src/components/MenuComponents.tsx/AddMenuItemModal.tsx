import MenuItemForm from "../../forms/restaurantForm/menuForm/MenuItemForm";
import { MenuItem } from "../../types";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";

interface MenuItemProps {
  onSave: (menuItemFormData: FormData) => void;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  data?: MenuItem | null;
}

const AddMenuItemModal: React.FC<MenuItemProps> = ({
  onSave,
  isLoading,
  isOpen,
  onClose,
  data,
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
          <div className="overflow-y-auto scrollbar-hide max-h-[70vh]">
            <MenuItemForm onSave={onSave} isLoading={isLoading} data={data} />
          </div>
          <DialogClose onClick={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMenuItemModal;
