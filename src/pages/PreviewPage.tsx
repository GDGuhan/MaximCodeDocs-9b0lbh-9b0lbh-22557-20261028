import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GeneratedDocument } from "@/types/document";
import CertificateDoc from "@/components/features/CertificateDoc";
import OfferLetterDoc from "@/components/features/OfferLetterDoc";
import DownloadButtons from "@/components/features/DownloadButtons";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, FileText, CheckCircle } from "lucide-react";
import maximLogo from "@/assets/maxim-logo.png";

type Tab = "certificate" | "offer";

export default function PreviewPage() {
  const navigate = useNavigate();
  const [doc, setDoc] = useState<GeneratedDocument | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("certificate");
  const certRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("maximcode_doc");
    if (!stored) { navigate("/"); return; }
    setDoc(JSON.parse(stored));
  }, [navigate]);

  if (!doc) return null;

  return (
    <div className="min-h-screen bg-[hsl(220,20%,95%)]">
      {/* Top nav */}
      <header className="bg-white border-b border-[hsl(220,20%,88%)] sticky top-0 z-30 no-print">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-[hsl(225,60%,20%)]">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="w-px h-6 bg-[hsl(220,20%,85%)]" />
            <div className="flex items-center gap-2">
              <img src={maximLogo} alt="Maxim Code" className="w-8 h-8 rounded-lg object-contain" />
              <div>
                <div className="text-sm font-bold text-[hsl(225,60%,20%)] certificate-font tracking-wider">MAXIM CODE</div>
                <div className="text-xs text-[hsl(220,15%,55%)]">Document Preview</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[hsl(220,20%,93%)] rounded-xl p-1">
            <button
              onClick={() => setActiveTab("certificate")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "certificate"
                  ? "bg-white text-[hsl(225,60%,20%)] shadow-sm"
                  : "text-[hsl(220,15%,50%)] hover:text-[hsl(225,60%,30%)]"
              }`}
            >
              <Award className="w-4 h-4" />
              Certificate
            </button>
            <button
              onClick={() => setActiveTab("offer")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "offer"
                  ? "bg-white text-[hsl(225,60%,20%)] shadow-sm"
                  : "text-[hsl(220,15%,50%)] hover:text-[hsl(225,60%,30%)]"
              }`}
            >
              <FileText className="w-4 h-4" />
              Offer Letter
            </button>
          </div>

          {/* Download section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[hsl(140,60%,35%)] text-xs font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              Ready to Download
            </div>
            <DownloadButtons
              elementId={activeTab === "certificate" ? "certificate-doc" : "offer-letter-doc"}
              filename={activeTab === "certificate" ? `MaximCode_Certificate_${doc.formData.name.replace(/\s+/g, "_")}` : `MaximCode_OfferLetter_${doc.formData.name.replace(/\s+/g, "_")}`}
              verificationUrl={doc.verificationUrl}
              isLandscape={activeTab === "certificate"}
            />
          </div>
        </div>
      </header>

      {/* Document Info Bar */}
      <div className="bg-[hsl(225,60%,20%)] text-white no-print">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center gap-6 text-xs">
          <div><span className="text-white/50">Candidate: </span><span className="font-semibold">{doc.formData.name}</span></div>
          <div><span className="text-white/50">Domain: </span><span className="font-semibold">{doc.formData.domain}</span></div>
          <div><span className="text-white/50">Role: </span><span className="font-semibold">{doc.formData.role}</span></div>
          <div><span className="text-white/50">Certificate ID: </span><span className="font-semibold font-mono">{doc.certificateId}</span></div>
        </div>
      </div>

      {/* Document Preview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={`transition-all duration-300 ${activeTab === "certificate" ? "block" : "hidden"}`}>
          <div className="flex justify-center">
            <div className="doc-shadow rounded-lg overflow-hidden" style={{ maxWidth: "100%", overflowX: "auto" }}>
              <CertificateDoc ref={certRef} doc={doc} />
            </div>
          </div>
        </div>

        <div className={`transition-all duration-300 ${activeTab === "offer" ? "block" : "hidden"}`}>
          <div className="flex justify-center">
            <div className="doc-shadow rounded-lg overflow-hidden" style={{ maxWidth: "100%" }}>
              <OfferLetterDoc ref={offerRef} doc={doc} />
            </div>
          </div>
        </div>

        {/* Bottom download bar */}
        <div className="mt-6 bg-white rounded-2xl border border-[hsl(220,20%,88%)] p-5 no-print">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-[hsl(225,60%,20%)] text-sm">
                {activeTab === "certificate" ? "Internship Completion Certificate" : "Internship Offer Letter"} — {doc.formData.name}
              </div>
              <div className="text-xs text-[hsl(220,15%,55%)] mt-0.5">
                Certificate ID: {doc.certificateId} | Verify: {doc.verificationUrl}
              </div>
            </div>
            <DownloadButtons
              elementId={activeTab === "certificate" ? "certificate-doc" : "offer-letter-doc"}
              filename={activeTab === "certificate" ? `MaximCode_Certificate_${doc.formData.name.replace(/\s+/g, "_")}` : `MaximCode_OfferLetter_${doc.formData.name.replace(/\s+/g, "_")}`}
              verificationUrl={doc.verificationUrl}
              isLandscape={activeTab === "certificate"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
