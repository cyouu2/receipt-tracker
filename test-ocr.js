import { createWorker } from 'tesseract.js';

async function runOCR() {
  const worker = await createWorker('eng');

  const { data: { text } } = await worker.recognize('./test-receipts/X51006857126.jpg');

  console.log('--- RAW OCR OUTPUT ---');
  console.log(text);

  await worker.terminate();
}

runOCR();