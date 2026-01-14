import { Shield, Cpu } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="gradient-hero py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-5">
          {/* Logo / Icon */}
          <div className="gradient-gold p-4 rounded-2xl shadow-elevated animate-scale-in flex items-center gap-2">
            <Shield className="w-10 h-10 md:w-14 md:h-14 text-primary" />
            <Cpu className="w-8 h-8 md:w-10 md:h-10 text-primary/80" />
          </div>

          {/* Title */}
          <div className="space-y-2 animate-fade-in">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight">
              Sistem Deteksi Berita Hoaks
              <span className="block text-gradient-gold mt-1">
                (Naive Bayes)
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl animate-slide-up">
            Kelompok 8 - Universitas Putra Bangsa
          </p>

          {/* University Badge */}
          <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-5 py-3 rounded-full border border-primary-foreground/20 animate-fade-in">
            <div className="w-8 h-8 gradient-gold rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary">UPB</span>
            </div>
            <span className="text-primary-foreground/90 font-medium text-sm md:text-base">
              Tugas Akhir Machine Learning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
