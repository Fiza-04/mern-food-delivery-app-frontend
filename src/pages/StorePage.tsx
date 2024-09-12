import MenuDisplay from "../components/StorePageComponents/MenuDisplay";
import StoreHeader from "../components/StorePageComponents/StoreHeader";

const StorePage = () => {
  return (
    <div className="-mt-10 space-y-7">
      {/* one deign image */}
      <StoreHeader />
      {/* menuItem Cards */}
      <MenuDisplay />
    </div>
  );
};

export default StorePage;
