import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser, deleteUser } from "../api";

const usersQueryKey = ["users"];

export function useUserList() {
    const queryClient = useQueryClient();
    const invalidateFetchUsers = async () => {
        await queryClient.invalidateQueries({ queryKey: usersQueryKey });
    };

    const { data: users = [], isLoading: isUsersLoading } = useQuery({ queryKey: usersQueryKey, queryFn: fetchUsers });

    const { mutate: addUser, isPending: isUserCreating } = useMutation({
        mutationFn: createUser,
        onSuccess: invalidateFetchUsers,
    });

    const { mutate: removeUser, isPending: isUserDeleting } = useMutation({
        mutationFn: deleteUser,
        onSuccess: invalidateFetchUsers,
    });

    return {
        users,
        addUser,
        removeUser,
        isLoading: isUsersLoading || isUserCreating || isUserDeleting,
    };
}
