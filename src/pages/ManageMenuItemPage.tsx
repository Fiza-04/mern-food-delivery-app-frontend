import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import AddMenuItemModal from "../components/MenuComponents.tsx/AddMenuItemModal";
import { useState } from "react";
import { useCreateMenuItem } from "../api/menuItem.api";

const ManageMenuItemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createMenuItem, isLoading } = useCreateMenuItem();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-end justify-end mb-7">
        <Button
          className="bg-green-600 hover:bg-green-700 text-lg font-normal tracking-wide space-x-2"
          onClick={() => openModal()}
        >
          <Plus size={22} />
          <p>Add Menu Item</p>
        </Button>
      </div>
      <AddMenuItemModal
        onSave={createMenuItem}
        isLoading={isLoading}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ManageMenuItemPage;
