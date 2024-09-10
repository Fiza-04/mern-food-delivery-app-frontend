import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["fetchCurrentRestaurant"],
    queryFn: getRestaurantRequest,
  });

  return { restaurant, isLoading };
};

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
      console.log(response.status);

      throw new Error("Failed to create Restaurant1");
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

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to update Restaurant Data");
    }
    return response.json();
  };
  const mutation = useMutation({
    mutationFn: updateRestaurantRequest,
    onSuccess: () => {
      toast.success("Your Restaurant has been updated successfully");
    },
    onError: (error) => {
      toast.error(
        `Error: failed to update restaurant due to ${error.toString()}`
      );
    },
  });
  return {
    updateRestaurant: mutation.mutateAsync,
    isLoading: mutation.isPending,
    // isSuccess: mutation.isSuccess,
    // isError: mutation.isError,
  };
};
