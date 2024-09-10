import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "../api/restaurant.api";
import RestaurantForm from "../forms/restaurantForm/RestaurantForm";

const ManageRestaurantFormPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  const isEditing = !!restaurant;

  return (
    <RestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantFormPage;
