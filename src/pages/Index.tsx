import DocumentForm from "@/components/features/DocumentForm";
import maximLogo from "@/assets/maxim-logo.png";
import { Award, FileText, QrCode, Shield, Download, Sparkles } from "lucide-react";

const features = [
  { icon: Award, label: "Completion Certificate", desc: "Premium A4 landscape certificate with excellence badge" },
  { icon: FileText, label: "Offer Letter", desc: "Professional A4 portrait corporate offer letter" },
  { icon: QrCode, label: "QR Verification", desc: "Unique certificate ID with scan-to-verify QR code" },
  { icon: Shield, label: "MSME Aligned", desc: "MSME-inspired professional branding and layout" },
  { icon: Download, label: "Multi-Format Export", desc: "Download as PDF, PNG, JPG or print directly" },
  { icon: Sparkles, label: "AI-Generated Content", desc: "Domain-specific skills and descriptions auto-generated" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(225,60%,12%)] via-[hsl(225,50%,18%)] to-[hsl(220,60%,22%)]">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm no-print">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={maximLogo} alt="Maxim Code" className="w-12 h-12 rounded-xl object-contain" />
            <div>
              <div className="text-white font-bold text-lg certificate-font tracking-widest">MAXIM CODE</div>
              <div className="text-[hsl(43,90%,65%)] text-xs font-semibold tracking-widest uppercase">Building Future Innovators</div>
            </div>
          </div>
          <div className="text-white/50 text-sm">Document Generation System</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Hero + Features */}
          <div className="no-print">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-[hsl(43,74%,45%)]/20 border border-[hsl(43,74%,50%)]/40 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[hsl(43,90%,65%)]" />
                <span className="text-[hsl(43,90%,65%)] text-xs font-semibold uppercase tracking-widest">AI-Powered Document Generator</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white certificate-font leading-tight mb-4">
                Professional
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(43,90%,65%)] to-[hsl(43,74%,55%)]">
                  Internship Docs
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed body-font">
                Generate premium internship certificates and offer letters instantly. Corporate-quality documents with QR verification, MSME alignment, and multi-format export.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[hsl(43,74%,45%)]/20 flex items-center justify-center mb-3">
                    <Icon className="w-4.5 h-4.5 text-[hsl(43,90%,65%)]" />
                  </div>
                  <div className="text-white text-sm font-semibold mb-1">{label}</div>
                  <div className="text-white/50 text-xs leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <DocumentForm />
          </div>
        </div>
      </main>
    </div>
  );
}
