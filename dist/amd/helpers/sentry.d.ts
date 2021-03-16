import { Container } from "aurelia-framework";
import { CaptureContext, User } from '@sentry/types';
export declare class SentryHelper {
    private container;
    private isInited;
    constructor(container: Container);
    initIfConfigured(): void;
    init(): void;
    setUser(user: User): void;
    unsetUser(): void;
    fakeError(fakeErrorMsg?: string): void;
    captureIfConfigured(error: Error, context?: CaptureContext): void;
    capture(error: Error, context?: CaptureContext): void;
    captureMessageIfConfigured(message: string, context?: CaptureContext): void;
    captureMessage(message: string, context?: CaptureContext): void;
}
