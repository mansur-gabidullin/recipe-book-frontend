import { StrictMode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ProgressCircle } from "@adobe/react-spectrum";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { queryClient } from "@/shared/api";
import { Pages } from "@/pages";

export function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<ProgressCircle aria-label="Загрузка…" isIndeterminate />}>
                    <BrowserRouter>
                        <Pages />
                    </BrowserRouter>
                </Suspense>
            </QueryClientProvider>
        </StrictMode>
    );
}
