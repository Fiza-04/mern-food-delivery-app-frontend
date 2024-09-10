import MenuItemsCard from "../components/StorePageComponents/MenuItemsCard";
import StoreHeader from "../components/StorePageComponents/StoreHeader";

const StorePage = () => {
  return (
    <div className="-mt-6">
      {/* one deign image */}
      <StoreHeader />
      {/* menuItem Cards */}
      <MenuItemsCard />
    </div>
  );
};

export default StorePage;
