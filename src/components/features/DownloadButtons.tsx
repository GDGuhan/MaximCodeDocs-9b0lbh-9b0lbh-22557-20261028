import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, FileImage, Printer, Share2, Copy, Loader2, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  elementId: string;
  filename: string;
  verificationUrl?: string;
  isLandscape?: boolean;
}

export default function DownloadButtons({ elementId, filename, verificationUrl, isLandscape = false }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  async function captureElement(): Promise<HTMLCanvasElement | null> {
    const el = document.getElementById(elementId);
    if (!el) { toast.error("Document element not found"); return null; }
    return await html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
  }

  async function downloadPDF() {
    setLoading("pdf");
    const canvas = await captureElement();
    if (!canvas) { setLoading(null); return; }
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const orientation = isLandscape ? "landscape" : "portrait";
    const pdf = new jsPDF({ orientation, unit: "px", format: "a4" });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pdfW / canvas.width, pdfH / canvas.height);
    const imgW = canvas.width * ratio;
    const imgH = canvas.height * ratio;
    const x = (pdfW - imgW) / 2;
    const y = (pdfH - imgH) / 2;
    pdf.addImage(imgData, "JPEG", x, y, imgW, imgH);
    pdf.save(`${filename}.pdf`);
    toast.success("PDF downloaded!");
    setLoading(null);
  }

  async function downloadPNG() {
    setLoading("png");
    const canvas = await captureElement();
    if (!canvas) { setLoading(null); return; }
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("PNG downloaded!");
    setLoading(null);
  }

  async function downloadJPG() {
    setLoading("jpg");
    const canvas = await captureElement();
    if (!canvas) { setLoading(null); return; }
    const link = document.createElement("a");
    link.download = `${filename}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
    toast.success("JPG downloaded!");
    setLoading(null);
  }

  function handlePrint() {
    window.print();
  }

  async function handleShare() {
    const canvas = await captureElement();
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `${filename}.png`, { type: "image/png" });
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
        toast.success("Shared successfully!");
      } else {
        toast.info("Share not supported on this browser. Please download and share manually.");
      }
    });
  }

  function copyVerificationLink() {
    if (!verificationUrl) return;
    navigator.clipboard.writeText(verificationUrl);
    toast.success("Verification link copied!");
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        onClick={downloadPDF}
        disabled={loading !== null}
        className="bg-[hsl(225,60%,20%)] hover:bg-[hsl(225,60%,28%)] text-white text-xs h-9 px-3 gap-1.5"
      >
        {loading === "pdf" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
        PDF
      </Button>

      <Button
        onClick={downloadPNG}
        disabled={loading !== null}
        className="bg-[hsl(43,74%,45%)] hover:bg-[hsl(43,74%,38%)] text-white text-xs h-9 px-3 gap-1.5"
      >
        {loading === "png" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileImage className="w-3.5 h-3.5" />}
        PNG
      </Button>

      <Button
        onClick={downloadJPG}
        disabled={loading !== null}
        variant="outline"
        className="border-[hsl(220,20%,70%)] text-[hsl(225,60%,20%)] hover:bg-[hsl(220,20%,95%)] text-xs h-9 px-3 gap-1.5"
      >
        {loading === "jpg" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
        JPG
      </Button>

      <Button
        onClick={handlePrint}
        variant="outline"
        className="border-[hsl(220,20%,70%)] text-[hsl(225,60%,20%)] hover:bg-[hsl(220,20%,95%)] text-xs h-9 px-3 gap-1.5 no-print"
      >
        <Printer className="w-3.5 h-3.5" />
        Print
      </Button>

      <Button
        onClick={handleShare}
        variant="outline"
        className="border-[hsl(220,20%,70%)] text-[hsl(225,60%,20%)] hover:bg-[hsl(220,20%,95%)] text-xs h-9 px-3 gap-1.5"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </Button>

      {verificationUrl && (
        <Button
          onClick={copyVerificationLink}
          variant="outline"
          className="border-[hsl(220,20%,70%)] text-[hsl(225,60%,20%)] hover:bg-[hsl(220,20%,95%)] text-xs h-9 px-3 gap-1.5"
        >
          <Copy className="w-3.5 h-3.5" />
          Copy Link
        </Button>
      )}
    </div>
  );
}
