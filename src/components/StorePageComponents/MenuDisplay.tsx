import { useState } from "react";
import MenuItemModal from "./MenuItemModal";
import MenuItemsCard from "./MenuItemsCard";

const MenuDisplay = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (itemIndex: number) => {
    setIsModalOpen(true);
    setSelectedItem(itemIndex);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-7">
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <MenuItemsCard onClick={() => openModal(index)} />
            </div>
          ))}
      </div>
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        itemIndex={selectedItem}
      />
    </div>
  );
};

export default MenuDisplay;
