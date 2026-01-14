import { FileText, Calculator, Target, Award } from "lucide-react";

const methodologyItems = [
  {
    icon: FileText,
    title: "Text Mining",
    description:
      "Menggunakan teknik TF-IDF (Term Frequency-Inverse Document Frequency) untuk mengubah teks menjadi vektor numerik berdasarkan bobot kepentingan kata.",
  },
  {
    icon: Calculator,
    title: "Multinomial Naive Bayes",
    description:
      "Algoritma klasifikasi probabilistik yang menghitung peluang kelas berdasarkan frekuensi kemunculan fitur/kata dalam dokumen.",
  },
  {
    icon: Target,
    title: "Preprocessing NLP",
    description:
      "Case folding, tokenizing, stopword removal, dan stemming untuk membersihkan dan menormalisasi data teks sebelum klasifikasi.",
  },
];

const MethodologySection = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistem ini menggunakan kombinasi teknik Natural Language Processing
            dan Machine Learning untuk menganalisis pola bahasa dalam berita
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {methodologyItems.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 gradient-gold rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Accuracy Badge */}
        <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-10 h-10 text-secondary" />
          </div>
          <div className="text-5xl md:text-6xl font-extrabold text-gradient-gold mb-3">
            92.5%
          </div>
          <div className="text-xl font-semibold text-foreground mb-2">
            Akurasi Model
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Model Naive Bayes kami dilatih dengan dataset berita berbahasa
            Indonesia dan mencapai akurasi tinggi dalam mengklasifikasikan hoaks
          </p>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
