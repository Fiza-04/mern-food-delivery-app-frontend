import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import AddMenuModal from "../forms/restaurantForm/menuForm/AddMenuModal";
import { useCreateMenu, useDeleteMenu, useGetAllMenus } from "../api/menu.api";
import DisplayMenuTable from "../components/MenuComponents.tsx/DisplayMenuTable";
import { Menu } from "../types";

const ManageMenuFormPage = () => {
  const { menus = [], refetch } = useGetAllMenus();
  const { addMenu, isLoading } = useCreateMenu(refetch);
  const { deleteMenu } = useDeleteMenu(refetch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const openModal = (menu?: Menu) => {
    setSelectedMenu(menu || null); // Open modal with selected menu or default to null
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  const handleSave = async (menuData: Menu) => {
    try {
      await addMenu(menuData); // Add or update the menu
      refetch(); // Refresh the menu list
      closeModal(); // Close the modal after saving
    } catch (error) {
      console.error("Error adding menu:", error);
    }
  };

  const handleDelete = async (menu: string) => {
    try {
      await deleteMenu(menu); // Use menu._id to delete the menu
      refetch(); // Refresh the menu list
    } catch (error) {
      console.error("Error Deleting menu:", error);
    }
  };

  return (
    <main className="-mt-5">
      <div className="flex items-end justify-end mb-7">
        <Button
          className="bg-green-600 hover:bg-green-700 text-lg font-normal tracking-wide space-x-2"
          onClick={() => openModal()}
        >
          <Plus size={22} />
          <p>Add Menu</p>
        </Button>
      </div>
      <DisplayMenuTable
        data={menus}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <AddMenuModal
        onSave={handleSave}
        isLoading={isLoading}
        isOpen={isModalOpen}
        onClose={closeModal}
        menu={selectedMenu} // Pass selectedMenu to modal
      />
    </main>
  );
};

export default ManageMenuFormPage;
