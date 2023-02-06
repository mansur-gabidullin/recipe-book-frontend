import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchUsers, createUser} from "../api";

const usersQueryKey = ['users']

export function useUserList() {
    const {
        data: users = [],
        isLoading: isLoadingUsers,
    } = useQuery({queryKey: usersQueryKey, queryFn: fetchUsers})

    const queryClient = useQueryClient()

    const {mutate: addUser, isLoading: isCreatingUser} = useMutation({
        mutationFn: createUser,
        onSuccess: () => queryClient.invalidateQueries({queryKey: usersQueryKey}),
    })

    return {
        users,
        addUser,
        isLoading: isLoadingUsers || isCreatingUser
    }
}
