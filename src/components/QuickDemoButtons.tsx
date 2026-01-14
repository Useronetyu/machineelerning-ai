import { Zap, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickDemoButtonsProps {
  onSelectDemo: (text: string) => void;
  disabled?: boolean;
}

const demoExamples = [
  {
    id: "hoax",
    label: "Contoh Hoaks",
    icon: AlertTriangle,
    text: "VIRALKAN! Awas bahaya penculikan anak merajalela di sekolah, sebar sekarang ke semua grup!",
    variant: "destructive" as const,
  },
  {
    id: "fact",
    label: "Contoh Fakta",
    icon: FileText,
    text: "Presiden meresmikan jalan tol baru untuk memperlancar arus mudik lebaran tahun ini.",
    variant: "success" as const,
  },
  {
    id: "dataset",
    label: "Contoh Dataset",
    icon: Zap,
    text: "Bupati Malang Rendra Kresna disangka menerima uang gratifikasi dari pemborong.",
    variant: "secondary" as const,
  },
];

const QuickDemoButtons = ({ onSelectDemo, disabled }: QuickDemoButtonsProps) => {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground text-center">
        🚀 Coba Demo Cepat:
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {demoExamples.map((demo) => {
          const Icon = demo.icon;
          return (
            <Button
              key={demo.id}
              type="button"
              variant={demo.variant === "success" ? "outline" : demo.variant}
              size="sm"
              onClick={() => onSelectDemo(demo.text)}
              disabled={disabled}
              className={`text-xs ${
                demo.variant === "success"
                  ? "border-success text-success hover:bg-success/10"
                  : demo.variant === "secondary"
                  ? "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 border-secondary/50"
                  : ""
              }`}
            >
              <Icon className="w-3 h-3 mr-1" />
              {demo.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickDemoButtons;
