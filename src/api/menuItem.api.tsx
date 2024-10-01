import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MenuItem } from "../types";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMenuItems = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { menuId } = useParams();

  const getMenuItemsRequest = async () => {
    const accessToken = getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/menu-item/${menuId}`, {
      method: "GET",
      headers: {
        Authorization: `${accessToken} Bearer`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch MenuItems");
    }

    return response.json();
  };

  const { data: menuItems, refetch } = useQuery({
    queryKey: ["fetchAllMenuItems"],
    queryFn: getMenuItemsRequest,
  });

  return { menuItems, refetch };
};

export const useCreateMenuItem = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0();
  const { menuId } = useParams();

  const createMenuItemRequest = async (
    menuItemFormData: FormData
  ): Promise<MenuItem> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/menu-item/add/${menuId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: menuItemFormData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create Menu Item");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createMenuItemRequest,
    onSuccess: () => {
      toast.success("Your Menu Item has been saved successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(
        `Error: failed to saving menu item due to ${error.toString()}`
      );
    },
  });

  return {
    createMenuItem: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useUpdateMenuItem = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMenuItemRequest = async (menuItemFormData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/menu-item/edit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menuItemFormData }),
    });

    if (!response.ok) {
      throw new Error("Failed to save updated MenuItem");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: updateMenuItemRequest,
    onSuccess: () => {
      toast.success("Menu saved successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: failed to save menu due to ${error.toString()}`);
    },
  });

  return {
    updateMenuItem: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};

export const useDeleteMenuItem = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteMenuItemRequest = async ({
    menuItemId,
    menuId,
  }: {
    menuItemId: string;
    menuId: string;
  }) => {
    const accessToken = await getAccessTokenSilently();
    console.log(
      "deleteMenuItemRequest menuItemId => ",
      menuItemId,
      " menuId => ",
      menuId
    );
    const response = await fetch(`${API_BASE_URL}/api/menu-item/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menuItemId, menuId }),
    });

    if (!response.ok) {
      throw new Error("Error deleting menu item");
    }
  };

  const mutation = useMutation({
    mutationFn: deleteMenuItemRequest,
    onSuccess: () => {
      toast.success("Menu Item deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(
        `Error: failed to delete menu item due to ${error.toString()}`
      );
    },
  });

  return {
    deleteMenuItem: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
