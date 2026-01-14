import { User, GraduationCap, Heart } from "lucide-react";

const teamMembers = [
  { name: "Mochamad Ilham Hansyil Alfauzi", nim: "230202767" },
  { name: "Eriqho Firdaus", nim: "230202747" },
  { name: "Rasya Islami Kautsar", nim: "230202777" },
  { name: "Fendi Priyo Pratomo", nim: "220202666" },
];

const TeamFooter = () => {
  return (
    <footer className="gradient-hero py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GraduationCap className="w-6 h-6 text-secondary" />
            <h3 className="text-xl font-bold text-primary-foreground">
              Kelompok 8 — Machine Learning
            </h3>
          </div>
          <p className="text-primary-foreground/70">
            Universitas Putra Bangsa • Tahun Ajaran 2024/2025
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-primary-foreground text-sm leading-tight truncate">
                    {member.name}
                  </h4>
                  <p className="text-primary-foreground/60 text-xs font-mono">
                    {member.nim}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-sm flex items-center justify-center gap-2">
            Dibuat dengan <Heart className="w-4 h-4 text-destructive fill-destructive" /> untuk tugas akhir Machine Learning
          </p>
          <p className="text-primary-foreground/40 text-xs mt-2">
            © 2024 Hoax Buster — Sistem Deteksi Berita Hoaks
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TeamFooter;
