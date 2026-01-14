import { CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PreprocessingStep {
  id: string;
  title: string;
  description: string;
  input: string;
  output: string | string[];
}

interface PreprocessingVisualizationProps {
  steps: PreprocessingStep[];
}

const PreprocessingVisualization = ({ steps }: PreprocessingVisualizationProps) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b border-border">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Tahapan Preprocessing NLP
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Visualisasi transformasi teks mentah menjadi data siap olah
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full" defaultValue="step-0">
        {steps.map((step, index) => (
          <AccordionItem key={step.id} value={`step-${index}`} className="border-b border-border last:border-b-0">
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.description}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="ml-12 space-y-4">
                {/* Input */}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Input:
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-sm font-mono break-words">
                    {step.input}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-secondary">
                  <div className="h-px flex-1 bg-secondary/30" />
                  <CheckCircle2 className="w-5 h-5" />
                  <div className="h-px flex-1 bg-secondary/30" />
                </div>

                {/* Output */}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Output:
                  </div>
                  <div className="bg-success/10 p-3 rounded-lg text-sm">
                    {Array.isArray(step.output) ? (
                      <div className="flex flex-wrap gap-2">
                        {step.output.map((word, idx) => (
                          <span
                            key={idx}
                            className="bg-success/20 text-success px-2 py-1 rounded-md font-mono text-xs"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="font-mono break-words">{step.output}</span>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PreprocessingVisualization;
