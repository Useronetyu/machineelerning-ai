import { Clock, Trash2, ShieldCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface HistoryItem {
  id: string;
  text: string;
  isHoax: boolean;
  confidence: number;
  timestamp: Date;
}

interface HistorySectionProps {
  history: HistoryItem[];
  onClear: () => void;
  onItemClick: (text: string) => void;
}

const HistorySection = ({ history, onClear, onItemClick }: HistorySectionProps) => {
  if (history.length === 0) return null;

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-card rounded-xl shadow-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">
                Riwayat Pengecekan Terakhir
              </h3>
              <Badge variant="secondary" className="ml-2">
                {history.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Hapus Semua
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick(item.text)}
                className="text-left p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      item.isHoax ? "bg-destructive/10" : "bg-success/10"
                    }`}
                  >
                    {item.isHoax ? (
                      <ShieldAlert className="w-4 h-4 text-destructive" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {truncateText(item.text)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={item.isHoax ? "destructive" : "default"}
                        className={`text-xs ${
                          !item.isHoax && "bg-success text-success-foreground"
                        }`}
                      >
                        {item.isHoax ? "Hoaks" : "Fakta"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(item.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
