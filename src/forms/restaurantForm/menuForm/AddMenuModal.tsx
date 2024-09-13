import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import MenuForm from "./MenuForm";

interface MenuProps {
  onSave: (menuFormData: FormData) => void;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const AddMenuModal: React.FC<MenuProps> = ({
  onSave,
  isLoading,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{ maxWidth: "350px", width: "90vw", height: "53vh" }}
        className="flex flex-col space-y-2"
      >
        <DialogTitle className="whitespace-nowrap text-xl font-medium tracking-wide">
          Add a New Menu
        </DialogTitle>
        <MenuForm onSave={onSave} isLoading={isLoading} />
        <DialogClose onClick={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuModal;
