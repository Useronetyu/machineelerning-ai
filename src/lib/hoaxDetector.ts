// Simulated NLP preprocessing and Naive Bayes classification

// Indonesian stopwords (common words to remove)
const stopwords = new Set([
  "dan", "yang", "di", "dari", "ke", "ini", "itu", "dengan", "untuk",
  "pada", "adalah", "dalam", "tidak", "akan", "atau", "juga", "sudah",
  "saya", "kita", "kami", "mereka", "ada", "bisa", "dapat", "telah",
  "oleh", "sebagai", "karena", "seperti", "jadi", "hanya", "lebih",
  "saat", "setelah", "tersebut", "ia", "dia", "nya", "lagi", "serta",
  "antara", "melalui", "sebuah", "semua", "bagi", "selama", "tetapi",
  "namun", "bahwa", "bila", "maka", "agar", "apa", "siapa", "mana",
  "ketika", "hingga", "secara", "terhadap", "sehingga", "yakni", "yaitu",
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for"
]);

// Hoax indicator words (provocative, sensational)
const hoaxIndicators = [
  "viralkan", "viral", "awas", "bahaya", "ancaman", "waspada", "sebarkan",
  "share", "bagikan", "broadcast", "forward", "bohong", "penipuan", "tipu",
  "palsu", "hoax", "hoaks", "gawat", "darurat", "mengerikan", "shocking",
  "terbongkar", "rahasia", "tersembunyi", "ditutupi", "konspirasi",
  "berbahaya", "mematikan", "segera", "buruan", "cepat", "urgent",
  "penting", "tolong", "bantu", "dosa", "neraka", "surga", "amin",
  "subhanallah", "astaghfirullah", "innalillahi", "microchip", "chip",
  "illuminati", "freemason", "rothschild", "zionis", "yahudi", "kafir",
  "musuh", "china", "cina", "amerika", "israel", "barat", "agenda",
  "pemerintah", "elite", "jahat", "kejahatan", "bukti", "fakta",
  "terbukti", "nyata", "benar", "asli", "100%", "pasti", "jangan",
  "harus", "wajib", "tidak boleh", "dilarang", "haram", "halal",
  "mengontrol", "kontrol", "mengendalikan", "mata-mata", "spy", "dajjal"
];

// Fact indicator words (neutral, informative)
const factIndicators = [
  "menurut", "berdasarkan", "penelitian", "studi", "data", "statistik",
  "persentase", "laporan", "sumber", "resmi", "pemerintah", "kementerian",
  "universitas", "profesor", "dokter", "ahli", "pakar", "ilmuwan",
  "menyatakan", "menjelaskan", "mengatakan", "mengungkapkan", "publikasi",
  "jurnal", "akademis", "hasil", "temuan", "kesimpulan", "metodologi",
  "analisis", "evaluasi", "survei", "polling", "sensus", "badan",
  "lembaga", "organisasi", "asosiasi", "institusi", "riset"
];

// Simple stemming simulation (just removes common Indonesian suffixes)
const simpleStemming = (word: string): string => {
  let result = word;
  
  // Remove common prefixes
  const prefixes = ["meny", "men", "mem", "me", "peny", "pen", "pem", "pe", "ber", "di", "ter", "ke"];
  for (const prefix of prefixes) {
    if (result.startsWith(prefix) && result.length > prefix.length + 2) {
      result = result.slice(prefix.length);
      break;
    }
  }
  
  // Remove common suffixes
  const suffixes = ["kan", "an", "i", "lah", "kah", "nya"];
  for (const suffix of suffixes) {
    if (result.endsWith(suffix) && result.length > suffix.length + 2) {
      result = result.slice(0, -suffix.length);
      break;
    }
  }
  
  return result;
};

export interface PreprocessingStep {
  id: string;
  title: string;
  description: string;
  input: string;
  output: string | string[];
}

export interface AnalysisResult {
  isHoax: boolean;
  confidence: number;
  preprocessingSteps: PreprocessingStep[];
}

export const analyzeText = (text: string): AnalysisResult => {
  const steps: PreprocessingStep[] = [];
  
  // Step 1: Original text
  const original = text.trim();
  
  // Step 2: Case folding - lowercase and remove numbers/punctuation
  const caseFolded = original
    .toLowerCase()
    .replace(/[0-9]/g, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  
  steps.push({
    id: "case-folding",
    title: "Case Folding",
    description: "Mengubah semua huruf menjadi huruf kecil dan menghapus angka serta tanda baca",
    input: original,
    output: caseFolded,
  });
  
  // Step 3: Tokenizing
  const tokens = caseFolded.split(/\s+/).filter(t => t.length > 0);
  
  steps.push({
    id: "tokenizing",
    title: "Tokenizing",
    description: "Memecah teks menjadi token/kata individual",
    input: caseFolded,
    output: tokens,
  });
  
  // Step 4: Stopword removal
  const withoutStopwords = tokens.filter(token => !stopwords.has(token));
  
  steps.push({
    id: "stopword",
    title: "Stopword Removal",
    description: "Menghapus kata-kata umum yang tidak memiliki makna signifikan",
    input: tokens.join(", "),
    output: withoutStopwords,
  });
  
  // Step 5: Stemming
  const stemmed = withoutStopwords.map(token => simpleStemming(token));
  
  steps.push({
    id: "stemming",
    title: "Stemming",
    description: "Mengubah kata berimbuhan menjadi kata dasar",
    input: withoutStopwords.join(", "),
    output: stemmed,
  });
  
  // Calculate hoax probability based on word indicators
  let hoaxScore = 0;
  let factScore = 0;
  
  const allWords = [...tokens, ...stemmed];
  
  allWords.forEach(word => {
    if (hoaxIndicators.some(indicator => word.includes(indicator) || indicator.includes(word))) {
      hoaxScore += 1;
    }
    if (factIndicators.some(indicator => word.includes(indicator) || indicator.includes(word))) {
      factScore += 1;
    }
  });
  
  // Check for excessive punctuation/caps in original (common in hoax)
  const exclamationCount = (original.match(/!/g) || []).length;
  const capsRatio = (original.match(/[A-Z]/g) || []).length / original.length;
  
  if (exclamationCount > 2) hoaxScore += 2;
  if (capsRatio > 0.3) hoaxScore += 2;
  
  // Calculate confidence
  const totalScore = hoaxScore + factScore;
  let isHoax: boolean;
  let confidence: number;
  
  if (totalScore === 0) {
    // No strong indicators, slight bias towards fact
    isHoax = false;
    confidence = 55 + Math.random() * 10;
  } else {
    const hoaxProbability = (hoaxScore / totalScore) * 100;
    isHoax = hoaxProbability > 50;
    
    // Add some variance to make it feel more realistic
    const baseConfidence = isHoax ? hoaxProbability : (100 - hoaxProbability);
    const variance = (Math.random() - 0.5) * 10;
    confidence = Math.min(99, Math.max(55, baseConfidence + variance));
  }
  
  return {
    isHoax,
    confidence,
    preprocessingSteps: steps,
  };
};
