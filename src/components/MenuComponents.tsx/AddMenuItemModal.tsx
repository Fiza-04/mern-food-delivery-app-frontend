import MenuItemForm from "../../forms/restaurantForm/menuForm/MenuItemForm";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";

const AddMenuItemModal = () => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          style={{ maxWidth: "350px", width: "90vw", height: "53vh" }}
          className="flex flex-col space-y-2"
        >
          <DialogTitle className="whitespace-nowrap text-xl font-medium tracking-wide">
            {menu ? "Edit Menu" : "Add a New Menu"}
          </DialogTitle>
          <MenuItemForm onSave={onSave} isLoading={isLoading} menu={menu} />
          <DialogClose onClick={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMenuItemModal;
