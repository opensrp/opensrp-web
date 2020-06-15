/**
 * Handles file downloads from server
 * @param {typeof Blob} file a blob file
 * @param {string} Filename file name
 */
export const handleDownload = async (file: any, fileName: string) => {
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};
