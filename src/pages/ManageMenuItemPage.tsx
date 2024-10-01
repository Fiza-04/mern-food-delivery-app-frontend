import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import AddMenuItemModal from "../components/MenuComponents.tsx/AddMenuItemModal";
import { useState } from "react";
import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useGetMenuItems,
  useUpdateMenuItem,
} from "../api/menuItem.api";
import DisplayMenuItemTable from "../components/MenuComponents.tsx/DisplayMenuItemTable";

const ManageMenuItemPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { menuItems = [], refetch } = useGetMenuItems();
  const { createMenuItem, isLoading } = useCreateMenuItem(refetch);
  const { updateMenuItem } = useUpdateMenuItem(refetch);

  const { deleteMenuItem } = useDeleteMenuItem(refetch);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (menuItemId: string, menuId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this item?")) {
        await deleteMenuItem({ menuItemId, menuId });
        refetch();
      }
    } catch (error) {
      console.log("Error Deleting MenuItem: ", error);
    }
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
      <DisplayMenuItemTable
        data={menuItems}
        onDelete={handleDelete}
        onSave={updateMenuItem}
        isLoading={isLoading}
      />
      <AddMenuItemModal
        onSave={createMenuItem}
        isLoading={isLoading}
        isOpen={isModalOpen}
        onClose={closeModal}
        // refetch={refetch}
      />
    </div>
  );
};

export default ManageMenuItemPage;
