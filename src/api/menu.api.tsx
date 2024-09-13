import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMenu = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMenuRequest = async (menuFormData: FormData): Promise<Menu> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/menu/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: menuFormData,
    });

    if (!response.ok) {
      console.log(response.status);

      throw new Error("Failed to create Menu");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createMenuRequest,
    onSuccess: () => {
      toast.success("New menu added successfully");
    },
    onError: (error) => {
      toast.error(`Error: failed to add menu due to ${error.toString()}`);
    },
  });

  return {
    addMenu: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
