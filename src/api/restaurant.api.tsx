import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// get all restaurants data
export const useGetAllRestaurants = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllRestaurantsRequest = async (): Promise<Restaurant[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/restaurant/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }

    const data = await response.json();
    console.log("All restaurants: ", data);
    return data;
  };

  const { data: restaurants } = useQuery({
    queryKey: ["fetchAllRestauransts"],
    queryFn: getAllRestaurantsRequest,
  });

  return { restaurants };
};

// get only current users restaurant (admin)
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

// create Restaurant (admin)
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

// update restaurant (admin)
export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    console.log("restaurantFormData in api => ", restaurantFormData);
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    console.log("formdata in updat fn => ", restaurantFormData);
    if (!response.ok) {
      throw new Error("Failed to update Restaurant Data");
    }

    console.log("response.json in updat fn => ", response.json());

    const data = await response.json();
    console.log("Updated restaurant data => ", data);
    return data;
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
