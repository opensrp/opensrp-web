import downloadFile from '../fileDownload';

const testData = JSON.stringify({
    name: 'Test file',
});

describe('fileDownload', () => {
    it('should handle download', () => {
        const spyDownload = jest.spyOn(downloadFile, 'DownloadFile');
        downloadFile.handleDownload(testData, 'test-data.json');
        expect(spyDownload).toHaveBeenCalledTimes(3);
    });
});
