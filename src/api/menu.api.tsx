import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllMenus = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllMenusRequest = async (): Promise<Menu[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/menu/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch menus");
    }

    return response.json();
  };

  const { data: menus, refetch } = useQuery({
    queryKey: ["fetchAllMenus"],
    queryFn: getAllMenusRequest,
  });
  return { menus, refetch };
};

export const useCreateMenu = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0();

  const createOrUpdateMenuRequest = async (
    menuFormData: Menu
  ): Promise<Menu> => {
    const accessToken = await getAccessTokenSilently();
    const url = menuFormData._id
      ? `${API_BASE_URL}/api/menu/edit/${menuFormData._id}` // Update URL
      : `${API_BASE_URL}/api/menu/add`; // Create URL

    const response = await fetch(url, {
      method: menuFormData._id ? "PUT" : "POST", // Use PUT for update, POST for create
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to save Menu");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createOrUpdateMenuRequest,
    onSuccess: () => {
      toast.success("Menu saved successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: failed to save menu due to ${error.toString()}`);
    },
  });

  return {
    addMenu: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useDeleteMenu = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteMenuRequest = async (menuId: string): Promise<void> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/menu/delete/${menuId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to save Menu");
    }
  };

  const mutation = useMutation({
    mutationFn: deleteMenuRequest,
    onSuccess: () => {
      toast.success("Menu deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: failed to delete menu due to ${error.toString()}`);
    },
  });

  return {
    deleteMenu: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
