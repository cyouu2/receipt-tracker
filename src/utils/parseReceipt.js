export function extractTotal(ocrText) {
  const lines = ocrText.split('\n');

  const totalPatterns = [
    /final\s*total/i,
    /total\s*\(incl(?:usive)?\s*(?:of)?\s*(?:gst|tax)\)/i,
    /net\s*amt/i,
    /^total\s*:?\s*$/i,
    /\btotal\b(?!\s*qty)/i,
  ];

  const amountPattern = /(?:RM|RH|RB)?\s*(\d+[.,]\d{2})/i;

  for (const pattern of totalPatterns) {
    for (const line of lines) {
      if (pattern.test(line) && !/sub[\s-]*total/i.test(line)) {
        const match = line.match(amountPattern);
        if (match) {
          return parseFloat(match[1].replace(',', '.'));
        }
      }
    }
  }

  return null;
}

export function extractStoreName(ocrText) {
  const lines = ocrText.split('\n').map(l => l.trim()).filter(Boolean);

  // Only allow lines made of normal name-ish characters (letters, numbers, basic punctuation)
  const allowedCharsPattern = /^[A-Za-z0-9\s.,&'\-\/()]+$/;

  for (const line of lines) {
    // Reject lines containing unusual symbols (©, ~, |, etc.)
    if (!allowedCharsPattern.test(line)) continue;

    const letterCount = (line.match(/[a-zA-Z]/g) || []).length;
    if (letterCount < 3) continue;

    // Reject lines that are mostly single-letter "words" (a sign of OCR noise)
    const words = line.split(/\s+/);
    const realWords = words.filter(w => w.replace(/[^a-zA-Z]/g, '').length >= 2);
    if (realWords.length < 1) continue;

    return line;
  }

  return null;
}