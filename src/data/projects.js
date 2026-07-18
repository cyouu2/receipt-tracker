export const categories = [
  { id: 'ocr', name: 'OCR', icon: '📄', description: 'text extraction from images & documents' },
  { id: 'ml', name: 'AI / ML', icon: '🤖', description: 'model training & experimentation' },
  { id: 'chatbot', name: 'Chatbot', icon: '💬', description: 'conversational interfaces' },
  { id: 'data', name: 'Data', icon: '📊', description: 'dashboards & analysis' },
  { id: 'game', name: 'Games', icon: '🎮', description: 'for the fun of it' },
];

export const projects = [
  {
    id: 'receipt-tracker',
    categoryId: 'ocr',
    name: 'Receipt Tracker',
    description: 'OCR-powered expense tracking with smart categorisation',
    status: 'live',
  },
  {
    id: 'pdf-to-text',
    categoryId: 'ocr',
    name: 'PDF to Text Converter',
    description: 'Extract clean text from PDF documents',
    status: 'coming-soon',
  },
];