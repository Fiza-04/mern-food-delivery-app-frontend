import { useGetCurrentUser, useUpdateUser } from "../api/user.api";
import UserProfileForm from "../forms/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetCurrentUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

  if (!currentUser) {
    return <span>Unable to load user Profile</span>;
  }

  return (
    <div>
      {isGetLoading ? (
        <span>Loading...</span>
      ) : (
        <UserProfileForm
          currentUser={currentUser}
          onSave={updateUser}
          isLoading={isUpdateLoading}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
