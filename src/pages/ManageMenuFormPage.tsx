import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import AddMenuModal from "../forms/restaurantForm/menuForm/AddMenuModal";
import { useCreateMenu } from "../api/menu.api";

const ManageMenuFormPage = () => {
  const { addMenu, isLoading } = useCreateMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (/* itemIndex: number */) => {
    setIsModalOpen(true);
    // setSelectedItem(itemIndex);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    // setSelectedItem(null);
  };
  return (
    <main className="-mt-5">
      <div className="flex items-end justify-end">
        <Button
          className="bg-green-600 hover:bg-green-700 text-lg font-normal tracking-wide space-x-2"
          onClick={() => openModal()}
        >
          <Plus size={22} />
          <p>Add Menu</p>
        </Button>
      </div>
      <AddMenuModal
        onSave={addMenu}
        isLoading={isLoading}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
};

export default ManageMenuFormPage;
