import type { ReportHandler } from "web-vitals";

export const reportWebVitals = (onPerfEntry?: ReportHandler) => {
    if (onPerfEntry) {
        void import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};
