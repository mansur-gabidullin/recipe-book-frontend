import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchUsersBin, restoreUserFn } from "@/3-pages/bin/api";
import { Link } from "react-router-dom";
import LogoutButton from "@/7-shared/auth/ui/LogoutButton";

const binQueryKey = ["bin"];

export function Bin() {
    const queryClient = useQueryClient();

    const invalidateFetchUsers = async () => {
        await queryClient.invalidateQueries({ queryKey: binQueryKey });
    };

    const { mutate: restoreUser, isPending: isUserRestoring } = useMutation({
        mutationFn: restoreUserFn,
        onSuccess: invalidateFetchUsers,
    });

    const { data: users = [], isLoading: isUsersLoading } = useQuery({ queryKey: binQueryKey, queryFn: fetchUsersBin });

    return (
        <div>
            <div>
                <LogoutButton />
            </div>

            <ul>
                {isUsersLoading || isUserRestoring
                    ? "Loading..."
                    : users.map(({ uuid, login, isRemoved, email }) => (
                          <li key={uuid}>
                              {isRemoved ? (
                                  <del>
                                      {login} {email}{" "}
                                      <button
                                          type="button"
                                          onClick={() => {
                                              restoreUser(uuid);
                                          }}
                                      >
                                          restore
                                      </button>
                                  </del>
                              ) : (
                                  <>
                                      {login} {email}{" "}
                                  </>
                              )}
                          </li>
                      ))}
            </ul>
            <Link to="/admin-panel">Go to Admin Panel</Link>
        </div>
    );
}
