import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    console.log("restaurantFormData => ", restaurantFormData);
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create Restaurant");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createRestaurantRequest,
    onSuccess: () => {
      toast.success("Your Restaurant has been added successfully");
    },
    onError: (error) => {
      toast.error(
        `Error: failed to create restaurant due to ${error.toString()}`
      );
    },
  });

  return {
    createRestaurant: mutation.mutateAsync,
    isLoading: mutation.isPending,
    // isSuccess: mutation.isSuccess,
    // isError: mutation.isError,
  };
};
