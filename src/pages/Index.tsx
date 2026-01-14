import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AnalysisForm from "@/components/AnalysisForm";
import PreprocessingVisualization from "@/components/PreprocessingVisualization";
import ClassificationResult from "@/components/ClassificationResult";
import MethodologySection from "@/components/MethodologySection";
import TeamFooter from "@/components/TeamFooter";
import HistorySection, { HistoryItem } from "@/components/HistorySection";
import { analyzeText, type AnalysisResult } from "@/lib/hoaxDetector";
import { useToast } from "@/hooks/use-toast";

const HISTORY_KEY = "hoax-buster-history";
const MAX_HISTORY_ITEMS = 9;

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentText, setCurrentText] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [prefillText, setPrefillText] = useState("");
  const { toast } = useToast();

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // Convert timestamp strings back to Date objects
        const historyWithDates = parsed.map((item: HistoryItem) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setHistory(historyWithDates);
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  }, [history]);

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true);
    setResult(null);
    setCurrentText(text);

    // Simulate processing delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const analysisResult = analyzeText(text);
    setResult(analysisResult);
    setIsAnalyzing(false);

    // Add to history
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      text,
      isHoax: analysisResult.isHoax,
      confidence: analysisResult.confidence,
      timestamp: new Date(),
    };

    setHistory((prev) => {
      const updated = [newHistoryItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      return updated;
    });

    toast({
      title: analysisResult.isHoax ? "⚠️ Terindikasi Hoaks" : "✓ Berita Fakta",
      description: `Tingkat kepercayaan: ${analysisResult.confidence.toFixed(1)}%`,
      variant: analysisResult.isHoax ? "destructive" : "default",
    });
  };

  const handleReset = () => {
    setResult(null);
    setCurrentText("");
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
    toast({
      title: "Riwayat dihapus",
      description: "Semua riwayat pengecekan telah dihapus",
    });
  };

  const handleHistoryItemClick = (text: string) => {
    setPrefillText(text);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection />

      {/* Input Form */}
      <AnalysisForm
        onAnalyze={handleAnalyze}
        onReset={handleReset}
        isAnalyzing={isAnalyzing}
        initialText={prefillText}
      />

      {/* Results Section */}
      {(isAnalyzing || result) && (
        <section className="py-10 px-4 bg-muted/20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
              Hasil Analisis
            </h2>

            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="bg-card rounded-xl p-8 shadow-card border border-border">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-muted" />
                      <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
                    </div>
                    <p className="text-lg font-medium text-foreground">
                      Menganalisis berita...
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                      Menjalankan preprocessing NLP
                    </div>
                  </div>
                </div>
              </div>
            ) : result ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Preprocessing Steps */}
                <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <PreprocessingVisualization steps={result.preprocessingSteps} />
                </div>

                {/* Classification Result */}
                <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <ClassificationResult
                    isHoax={result.isHoax}
                    confidence={result.confidence}
                    originalText={currentText}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* History Section */}
      <HistorySection
        history={history}
        onClear={handleClearHistory}
        onItemClick={handleHistoryItemClick}
      />

      {/* Methodology */}
      <MethodologySection />

      {/* Team Footer */}
      <TeamFooter />
    </div>
  );
};

export default Index;
