import type { Attachment } from '../types';
import type { FileLike, FileReference, LocalAttachment } from './types';
export declare const isFile: (fileLike: FileReference | File | Blob) => fileLike is File;
export declare const isFileList: (obj: unknown) => obj is FileList;
export declare const isBlobButNotFile: (obj: unknown) => obj is Blob;
export declare const isFileReference: (obj: FileReference | FileLike) => obj is FileReference;
export declare const createFileFromBlobs: ({ blobsArray, fileName, mimeType, }: {
    blobsArray: Blob[];
    fileName: string;
    mimeType: string;
}) => File;
export declare const getExtensionFromMimeType: (mimeType: string) => string | undefined;
export declare const readFileAsArrayBuffer: (file: File) => Promise<ArrayBuffer>;
export declare const generateFileName: (mimeType: string) => string;
export declare const isImageFile: (fileLike: FileReference | FileLike) => boolean;
export declare const getAttachmentTypeFromMimeType: (mimeType: string) => "file" | "video" | "audio" | "image";
export declare const ensureIsLocalAttachment: (attachment: Attachment | LocalAttachment) => LocalAttachment | null;
