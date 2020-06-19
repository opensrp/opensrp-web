/**
 * Download files
 * @param {typeOf Blob} file
 * @param {string} fileName
 */
export declare const DownloadFile: (file: any, fileName: string) => void;
/**
 * Handles file downloads from server
 * @param {string} data a blob file
 * @param {string} fileName file name
 */
export declare const handleDownload: (data: any, fileName: string) => Promise<void>;
