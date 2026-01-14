import { useEffect } from "react";
import { ShieldAlert, ShieldCheck, TrendingUp, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface ClassificationResultProps {
  isHoax: boolean;
  confidence: number;
  originalText: string;
}

const ClassificationResult = ({ isHoax, confidence, originalText }: ClassificationResultProps) => {
  useEffect(() => {
    if (!isHoax) {
      // Trigger confetti for FAKTA results
      const duration = 2000;
      const end = Date.now() + duration;

      const colors = ["#22c55e", "#16a34a", "#4ade80", "#86efac"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isHoax]);

  const handleShare = () => {
    const result = isHoax ? "HOAKS ⚠️" : "FAKTA ✓";
    const truncatedText = originalText.length > 100 
      ? originalText.slice(0, 100) + "..." 
      : originalText;
    
    const message = `🔍 Saya baru saja mengecek berita ini di *Hoax Buster Kelompok 8*:\n\n"${truncatedText}"\n\n📊 Hasil: *${result}* (${confidence.toFixed(1)}% confidence)\n\nCek kebenarannya sekarang! 🛡️`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`rounded-xl border-2 overflow-hidden shadow-elevated animate-scale-in ${
        isHoax
          ? "border-destructive bg-destructive/5"
          : "border-success bg-success/5"
      }`}
    >
      {/* Header */}
      <div
        className={`px-6 py-6 ${
          isHoax ? "bg-destructive" : "bg-success"
        } text-center`}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          {isHoax ? (
            <ShieldAlert className="w-10 h-10 text-destructive-foreground" />
          ) : (
            <ShieldCheck className="w-10 h-10 text-success-foreground" />
          )}
        </div>
        <h3
          className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
            isHoax ? "text-destructive-foreground" : "text-success-foreground"
          }`}
        >
          {isHoax ? "TERINDIKASI HOAKS" : "BERITA FAKTA"}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Confidence Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tingkat Kepercayaan
            </span>
            <span
              className={`text-2xl font-bold ${
                isHoax ? "text-destructive" : "text-success"
              }`}
            >
              {confidence.toFixed(1)}%
            </span>
          </div>
          <Progress
            value={confidence}
            className={`h-3 ${isHoax ? "[&>div]:bg-destructive" : "[&>div]:bg-success"}`}
          />
        </div>

        {/* Explanation */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Metode: </span>
            Berdasarkan perhitungan probabilitas{" "}
            <span className="font-semibold">Multinomial Naive Bayes</span> dengan
            pembobotan <span className="font-semibold">TF-IDF</span> pada fitur
            kata yang telah melalui tahapan preprocessing NLP.
          </p>
        </div>

        {/* Tips */}
        <div
          className={`rounded-lg p-4 ${
            isHoax ? "bg-destructive/10" : "bg-success/10"
          }`}
        >
          <p className={`text-sm font-medium ${isHoax ? "text-destructive" : "text-success"}`}>
            {isHoax ? (
              <>
                ⚠️ Disarankan untuk tidak menyebarkan berita ini dan melakukan
                verifikasi ke sumber resmi sebelum percaya.
              </>
            ) : (
              <>
                ✓ Berita ini memiliki karakteristik bahasa yang netral dan
                informatif. Tetap verifikasi ke sumber resmi.
              </>
            )}
          </p>
        </div>

        {/* Share Button */}
        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full gap-2 border-primary/30 hover:bg-primary/5"
        >
          <Share2 className="w-4 h-4" />
          Bagikan ke WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default ClassificationResult;
