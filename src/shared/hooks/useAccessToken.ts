import { useQuery } from "@tanstack/react-query";
import { accessTokenQueryKey } from "@/shared/constants";
import { fetchAccessToken } from "@/shared/api";

export default function useAccessToken() {
    useQuery(accessTokenQueryKey, fetchAccessToken);
}
