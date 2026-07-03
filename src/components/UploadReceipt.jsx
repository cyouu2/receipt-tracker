import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { extractTotal, extractStoreName } from '../utils/parseReceipt';

function UploadReceipt() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [processing, setProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setOcrResult(null); // clear previous result if a new file is picked
    }
  }

  async function handleProcess() {
    setProcessing(true);
    setOcrResult(null);

    try {
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      const storeName = extractStoreName(text);
      const totalAmount = extractTotal(text);

      setOcrResult({ rawText: text, storeName, totalAmount });
    } catch (err) {
      console.error('OCR failed:', err);
      setOcrResult({ error: 'OCR processing failed. Please try again.' });
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Receipt</h2>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Purchase Date
      </label>
      <input
        type="date"
        value={purchaseDate}
        onChange={(e) => setPurchaseDate(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Receipt Photo or PDF
      </label>
      <input
        type="file"
        accept="image/*,application/pdf"
        capture="environment"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      {previewUrl && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img
            src={previewUrl}
            alt="Receipt preview"
            className="w-full rounded border border-gray-200"
          />
        </div>
      )}

      {file && (
        <button
          onClick={handleProcess}
          disabled={processing}
          className="w-full bg-gray-800 text-white rounded py-2 font-semibold disabled:opacity-50"
        >
          {processing ? 'Processing...' : 'Process Receipt'}
        </button>
      )}

      {ocrResult && !ocrResult.error && (
        <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Extracted:</p>
          <p className="text-sm">
            <span className="font-semibold">Store:</span>{' '}
            {ocrResult.storeName || <span className="text-red-600">Not found</span>}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Total:</span>{' '}
            {ocrResult.totalAmount !== null
                ? `RM${ocrResult.totalAmount.toFixed(2)}`
                : <span className="text-red-600">Not found</span>}
          </p>
        </div>
      )}

      {ocrResult?.error && (
        <p className="text-red-600 text-sm mt-4">{ocrResult.error}</p>
      )}
    </div>
  );
}

export default UploadReceipt;