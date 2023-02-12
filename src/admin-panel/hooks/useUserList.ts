import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchUsers, createUser, deleteUser} from "../api";

const usersQueryKey = ['users']

export function useUserList() {
    const queryClient = useQueryClient()
    const invalidateFetchUsers = () => queryClient.invalidateQueries(usersQueryKey)

    const {
        data: users = [],
        isLoading: isUsersLoading,
    } = useQuery(usersQueryKey, fetchUsers)

    const {
        mutate: addUser,
        isLoading: isUserCreating
    } = useMutation(createUser, {onSuccess: invalidateFetchUsers})

    const {
        mutate: removeUser,
        isLoading: isUserDeleting
    } = useMutation(deleteUser, {onSuccess: invalidateFetchUsers})

    return {
        users,
        addUser,
        removeUser,
        isLoading: isUsersLoading || isUserCreating || isUserDeleting
    }
}
