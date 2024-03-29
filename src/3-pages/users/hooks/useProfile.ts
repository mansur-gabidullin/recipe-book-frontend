import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/3-pages/users/api";

export const profileQueryKey = ["profile"];

export default function useProfile() {
    const { data: user, isLoading } = useQuery({ queryKey: profileQueryKey, queryFn: fetchUserProfile });
    return { isAuthenticated: !isLoading && Boolean(user), user, isLoading };
}
