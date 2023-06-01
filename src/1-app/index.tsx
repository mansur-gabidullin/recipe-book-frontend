import { StrictMode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { defaultTheme, Provider, ProgressCircle } from "@adobe/react-spectrum";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/7-shared/api";
import { Pages } from "@/3-pages";

import "./index.css";

export function App() {
    return (
        <StrictMode>
            <Provider theme={defaultTheme}>
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback={<ProgressCircle aria-label="Загрузка…" isIndeterminate />}>
                        <BrowserRouter>
                            <Pages />
                        </BrowserRouter>
                    </Suspense>
                </QueryClientProvider>
            </Provider>
        </StrictMode>
    );
}
