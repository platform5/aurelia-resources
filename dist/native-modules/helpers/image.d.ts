export declare class ImageUtils {
    static AUTO: 'auto';
    private image;
    private imageWidth;
    private imageHeight;
    private canvas;
    constructor();
    static loadB64(src: string): Promise<ImageUtils>;
    static loadFile(file: File): Promise<ImageUtils>;
    static loadFileUrl(url: string): Promise<ImageUtils>;
    initImage(): void;
    cover(width: any, height: any): void;
    resize(width: any, height: any): void;
    toDataUrl(): string;
}
export declare class ImageHelpers {
    static AUTO: 'auto';
    image: HTMLImageElement;
    mimetype: string;
    imageAsCanvas: HTMLCanvasElement;
    exportQuality: number;
    static open(file: File | Blob | string): Promise<ImageHelpers>;
    static openB64(src: string): Promise<ImageHelpers>;
    static openFile(file: File | Blob): Promise<ImageHelpers>;
    static openFileUrl(url: string): Promise<ImageHelpers>;
    static mimetypeFromB64(src: string): string | null;
    static mimetypeFromFile(file: File | Blob): Promise<string | null>;
    static exifRotation(file: File): Promise<number>;
    static exifRotation2Degrees(rotation: number): number;
    createCtx(width: number | null, height: number | null): CanvasRenderingContext2D;
    cover(width: any, height: any): void;
    resize(width: any, height: any): void;
    rotate(angle: number): void;
    toDataUrl(): string;
    toBlob(): Promise<Blob>;
}
