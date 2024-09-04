import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getCurrentUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: getCurrentUserRequest,
  });

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

//  Create a user api endpoint

export const useCreateMyUser = () => {
  // fetch users access token
  const { getAccessTokenSilently } = useAuth0();

  // Define mutation function
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };
  const mutation = useMutation({
    mutationFn: createMyUserRequest,
  });

  return {
    createUser: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

// update user api endpoint
type updateUserRequestType = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  postcode: string;
  email?: string;
  addressLine2?: string;
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData: updateUserRequestType) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: updateUserRequest,
    onSuccess: () => {
      toast.success("Your data has been updated!");
    },
    onError: (error) => {
      toast.error(`Your data failed to update due to ${error.toString()}`);
    },
  });

  return {
    updateUser: mutation.mutateAsync,
    isLoading: mutation.isPending,
    reset: mutation.reset,
  };
};

{
  /* isError: mutation.isError,
 isSuccess: mutation.isSuccess,
 reset: mutation.reset, */
}
