export class ApplicationError extends Error {
    name = "ApplicationError";

    constructor(messageOrError?: string | Error) {
        const error = messageOrError instanceof Error ? messageOrError : undefined;

        let message = typeof messageOrError === "string" ? messageOrError : error?.message;

        try {
            if (message) {
                const data: { detail: string } = JSON.parse(message);
                message = data.detail;
            }
        } catch (e) {
            // pass
        }

        super(message);

        const captureError = error ?? this;

        Error.captureStackTrace(captureError, captureError.constructor);
    }
}

export class CriticalError extends ApplicationError {
    name = "CriticalError";
}

export class AuthenticationError extends CriticalError {
    name = "AuthenticationError";
}

export class AccessPermissionError extends CriticalError {
    name = "AccessPermissionError";
}
