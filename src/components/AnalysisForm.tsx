import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, RotateCcw, Loader2 } from "lucide-react";
import QuickDemoButtons from "./QuickDemoButtons";

interface AnalysisFormProps {
  onAnalyze: (text: string) => void;
  onReset: () => void;
  isAnalyzing: boolean;
  initialText?: string;
}

const AnalysisForm = ({ onAnalyze, onReset, isAnalyzing, initialText }: AnalysisFormProps) => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
  }, [initialText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAnalyze(inputText);
    }
  };

  const handleReset = () => {
    setInputText("");
    onReset();
  };

  const handleDemoSelect = (text: string) => {
    setInputText(text);
  };

  return (
    <section className="py-10 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Masukkan Berita
            </h2>
            <p className="text-muted-foreground">
              Paste judul atau isi berita yang ingin Anda verifikasi
            </p>
          </div>

          {/* Quick Demo Buttons */}
          <div className="mb-6">
            <QuickDemoButtons onSelectDemo={handleDemoSelect} disabled={isAnalyzing} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Contoh: 'AWAS! Vaksin mengandung microchip untuk mengontrol manusia. Viralkan agar semua orang tahu!'"
                className="min-h-[140px] text-base md:text-lg p-4 resize-none bg-muted/30 border-2 border-border focus:border-primary transition-colors rounded-xl"
                disabled={isAnalyzing}
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {inputText.length} karakter
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="submit"
                variant="hero"
                size="xl"
                disabled={!inputText.trim() || isAnalyzing}
                className="flex-1 sm:flex-none"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Search />
                    Analisis Berita
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="xl"
                onClick={handleReset}
                disabled={isAnalyzing}
                className="flex-1 sm:flex-none"
              >
                <RotateCcw />
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AnalysisForm;
