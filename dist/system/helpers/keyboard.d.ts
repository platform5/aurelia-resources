export declare class KeybordHelper {
    keydowns: {
        [key: string]: boolean;
    };
    codedowns: {
        [key: string]: boolean;
    };
    listeningKeys: string[];
    listeningCodes: string[];
    start(): void;
    dispose(): void;
    handleEvent(event: KeyboardEvent): void;
}
