import { useQuery } from "@tanstack/react-query";

import { accessTokenQueryKey } from "@/7-shared/auth/constants";
import { fetchAccessToken } from "@/7-shared/auth/api";

export default function useAccessToken() {
    useQuery({ queryKey: accessTokenQueryKey, queryFn: fetchAccessToken });
}
