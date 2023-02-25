import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, deleteUser, fetchUserProfile } from "../api";

const usersQueryKey = ["users"];
const userProfileQueryKey = ["profile"];

export function useUserList() {
    const queryClient = useQueryClient();
    const invalidateFetchUsers = async () => {
        await queryClient.invalidateQueries(usersQueryKey);
    };

    const { data: users = [], isLoading: isUsersLoading } = useQuery(usersQueryKey, fetchUsers);

    const { data: user, isLoading: isUserProfileLoading } = useQuery(userProfileQueryKey, fetchUserProfile);

    console.log(user);

    const { mutate: addUser, isLoading: isUserCreating } = useMutation(createUser, { onSuccess: invalidateFetchUsers });

    const { mutate: removeUser, isLoading: isUserDeleting } = useMutation(deleteUser, {
        onSuccess: invalidateFetchUsers,
    });

    return {
        users,
        addUser,
        removeUser,
        isLoading: isUsersLoading || isUserCreating || isUserDeleting || isUserProfileLoading,
    };
}
