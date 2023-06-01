import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { type QueryClient, useQueryClient, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as ReactErrorBoundary, type ErrorBoundaryProps, type FallbackProps } from "react-error-boundary";

import { noop, setAuthRedirectLocation } from "@/7-shared/helpers";
import { LOGIN_PAGE_ROUTE } from "@/7-shared/auth/constants";
import { logout } from "@/7-shared/auth/api";

import { AccessPermissionError, AuthenticationError } from "../exceptions";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const location = useLocation();
    const isUnauthorized = error instanceof AuthenticationError || error instanceof AccessPermissionError;
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!isUnauthorized) {
            return;
        }

        void logout();
        setAuthRedirectLocation(location.pathname);
        queryClient.clear();
        resetErrorBoundary();
    }, [isUnauthorized, location, queryClient, resetErrorBoundary]);

    return isUnauthorized ? (
        <Navigate to={LOGIN_PAGE_ROUTE} replace />
    ) : (
        <div role="alert">
            <p>Что-то пошло не так:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Попробовать снова</button>
        </div>
    );
}

export type ResetErrorBoundaryHandler = (reset: () => void, queryClient: QueryClient, ...args: unknown[]) => void;

export default function ErrorBoundary(props: { onReset?: ResetErrorBoundaryHandler }) {
    const { onReset = noop } = props;
    const queryClient = useQueryClient();
    const { reset } = useQueryErrorResetBoundary();

    const onReset_: ErrorBoundaryProps["onReset"] = (...args) => {
        onReset(reset, queryClient, ...args);
    };

    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={onReset_}>
            <Outlet />
        </ReactErrorBoundary>
    );
}
