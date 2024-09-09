import { useCreateRestaurant } from "../api/restaurant.api";
import RestaurantForm from "../forms/restaurantForm/RestaurantForm";

const ManageRestaurantFormPage = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant();

  return <RestaurantForm onSave={createRestaurant} isLoading={isLoading} />;
};

export default ManageRestaurantFormPage;
