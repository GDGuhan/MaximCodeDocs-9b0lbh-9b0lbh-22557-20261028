import { forwardRef } from "react";
import { GeneratedDocument } from "@/types/document";
import { formatDate, calculateDuration, getCurrentDate } from "@/lib/documentUtils";
import { QRCodeSVG } from "qrcode.react";
import maximLogo from "@/assets/maxim-logo.png";
import msmEmblem from "@/assets/msme-emblem.png";

interface Props {
  doc: GeneratedDocument;
}

const OfferLetterDoc = forwardRef<HTMLDivElement, Props>(({ doc }, ref) => {
  const { formData, certificateId, verificationUrl, responsibilities } = doc;
  const offerId = certificateId.replace("MC-", "MC-OL-");
  const duration = calculateDuration(formData.startDate, formData.endDate);

  return (
    <div
      ref={ref}
      id="offer-letter-doc"
      style={{
        width: "794px",
        minHeight: "1123px",
        background: "white",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Tech background pattern */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }} viewBox="0 0 794 1123">
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <line x1={i * 80} y1="0" x2={i * 80} y2="1123" stroke="#1a2a6c" strokeWidth="0.6" strokeDasharray="3 10" />
            <line x1="0" y1={i * 113} x2="794" y2={i * 113} stroke="#1a2a6c" strokeWidth="0.6" strokeDasharray="3 10" />
          </g>
        ))}
      </svg>

      {/* Outer border */}
      <div style={{ position: "absolute", inset: "12px", border: "2px solid hsl(225,60%,20%)", borderRadius: "4px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "17px", border: "1px solid hsl(43,74%,50%)", borderRadius: "2px", pointerEvents: "none" }} />

      {/* Top gradient bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "7px",
        background: "linear-gradient(90deg, hsl(225,60%,20%), hsl(220,80%,45%), hsl(43,74%,50%))"
      }} />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, hsl(225,60%,20%) 0%, hsl(220,80%,35%) 100%)",
        padding: "28px 48px 24px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img src={maximLogo} alt="Maxim Code" style={{ width: "70px", height: "70px", objectFit: "contain", borderRadius: "10px", background: "rgba(255,255,255,0.1)", padding: "4px" }} />
          <div>
            <div style={{ fontSize: "20px", fontWeight: "900", color: "white", fontFamily: "'Cinzel', serif", letterSpacing: "2px" }}>MAXIM CODE</div>
            <div style={{ fontSize: "9px", color: "hsl(43,90%,70%)", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase" }}>Building Future Innovators</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "2px", textTransform: "uppercase" }}>Reference No.</div>
          <div style={{ fontSize: "13px", color: "white", fontWeight: "700", fontFamily: "monospace" }}>{offerId}</div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>Date: {getCurrentDate()}</div>
        </div>
      </div>

      {/* Gold accent divider */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, hsl(43,74%,50%), hsl(43,90%,65%), hsl(43,74%,50%))" }} />

      {/* Content */}
      <div style={{ padding: "28px 48px" }}>
        {/* Document title */}
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <div style={{ fontSize: "20px", fontWeight: "900", fontFamily: "'Cinzel', serif", color: "hsl(225,60%,20%)", letterSpacing: "3px", textTransform: "uppercase" }}>INTERNSHIP OFFER LETTER</div>
          <div style={{ width: "180px", height: "2px", background: "linear-gradient(90deg, transparent, hsl(43,74%,50%), transparent)", margin: "8px auto 0" }} />
        </div>

        {/* Recipient */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "hsl(225,60%,20%)" }}>To,</div>
          <div style={{ fontSize: "18px", fontWeight: "800", color: "hsl(225,60%,20%)", fontFamily: "'Cinzel', serif", marginTop: "4px" }}>{formData.name}</div>
          <div style={{ fontSize: "12px", color: "hsl(220,15%,50%)", marginTop: "2px" }}>Candidate for {formData.role}</div>
        </div>

        {/* Greeting */}
        <div style={{ fontSize: "13px", color: "hsl(220,25%,25%)", lineHeight: "1.8", marginBottom: "16px" }}>
          <strong>Greetings from Maxim Code!</strong>
          <br />
          We are pleased to offer you the position of <strong>{formData.role}</strong> in the domain of <strong>{formData.domain}</strong> at <strong>Maxim Code</strong>. After reviewing your profile, we believe you possess the skills, enthusiasm, and potential that align with our vision of <em>Building Future Innovators</em>.
        </div>

        {/* Internship Details Table */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "hsl(225,60%,20%)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", paddingBottom: "4px", borderBottom: "1px solid hsl(43,74%,50%)" }}>
            INTERNSHIP DETAILS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { label: "Position / Role", value: formData.role },
              { label: "Domain", value: formData.domain },
              { label: "Internship Program", value: formData.internship },
              { label: "Duration", value: duration },
              { label: "Start Date", value: formatDate(formData.startDate) },
              { label: "End Date", value: formatDate(formData.endDate) },
              { label: "Work Mode", value: "Remote / Hybrid" },
              { label: "Organization", value: "Maxim Code" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "8px", padding: "8px 12px", background: "hsl(220,20%,97%)", borderRadius: "6px", borderLeft: "3px solid hsl(225,60%,20%)" }}>
                <div style={{ fontSize: "10px", color: "hsl(220,15%,50%)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", minWidth: "110px" }}>{item.label}</div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "hsl(220,30%,15%)" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "hsl(225,60%,20%)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", paddingBottom: "4px", borderBottom: "1px solid hsl(43,74%,50%)" }}>
            ROLES & RESPONSIBILITIES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {responsibilities.map((resp, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "12px", color: "hsl(220,25%,25%)", lineHeight: "1.7" }}>
                <div style={{ minWidth: "22px", height: "22px", borderRadius: "50%", background: "hsl(225,60%,20%)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", flexShrink: 0, marginTop: "1px" }}>
                  {i + 1}
                </div>
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div style={{ marginBottom: "18px", padding: "14px 18px", background: "hsl(225,60%,20%)", borderRadius: "8px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "hsl(43,90%,70%)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>WHAT YOU WILL GAIN</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {[
              "Internship Completion Certificate",
              "Live Project Exposure",
              "1-on-1 Mentorship Support",
              "Domain-Specific Skill Development",
              "Career Growth Opportunities",
              "Professional Work Experience",
            ].map((benefit) => (
              <div key={benefit} style={{ display: "flex", alignItems: "center", gap: "8px", color: "white", fontSize: "11px" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "hsl(43,74%,50%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", flexShrink: 0 }}>✓</div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div style={{ fontSize: "12.5px", color: "hsl(220,25%,25%)", lineHeight: "1.8", marginBottom: "18px" }}>
          We warmly welcome you to the <strong>Maxim Code Internship Program</strong> and look forward to your valuable contributions. We are confident that this internship will be a significant milestone in your professional journey. We wish you a productive learning experience and exceptional growth throughout your time with us.
        </div>

        {/* Signature + QR + MSME */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          {/* Signature */}
          <div>
            <div style={{
              fontSize: "26px", fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              color: "hsl(225,60%,20%)", fontWeight: "700", lineHeight: 1, marginBottom: "6px",
              borderBottom: "2px solid hsl(43,74%,50%)", paddingBottom: "4px", minWidth: "150px"
            }}>B. Guhan</div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "hsl(225,60%,20%)" }}>B. GUHAN</div>
            <div style={{ fontSize: "10px", color: "hsl(220,15%,50%)", marginTop: "1px" }}>Staff, Maxim Code</div>
          </div>

          {/* QR */}
          <div style={{ textAlign: "center" }}>
            <QRCodeSVG value={verificationUrl} size={72} level="M" fgColor="hsl(225,60%,20%)" bgColor="transparent" includeMargin={false} />
            <div style={{ fontSize: "9px", color: "hsl(220,15%,55%)", marginTop: "4px" }}>Scan to Verify</div>
          </div>

          {/* MSME */}
          <div style={{ textAlign: "center" }}>
            <img src={msmEmblem} alt="MSME" style={{ width: "75px", height: "75px", objectFit: "contain" }} />
            <div style={{ fontSize: "8px", color: "hsl(220,15%,55%)", marginTop: "4px" }}>Aligned with MSME Guidelines</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: "20px", left: "24px", right: "24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: "1px solid hsl(220,20%,88%)", paddingTop: "8px"
      }}>
        <div style={{ fontSize: "9px", color: "hsl(220,15%,55%)" }}>maximcode.in</div>
        <div style={{ fontSize: "9px", color: "hsl(220,15%,55%)" }}>Ref: {offerId} | Confidential</div>
        <div style={{ fontSize: "9px", color: "hsl(220,15%,55%)" }}>Building Future Innovators</div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5px", background: "linear-gradient(90deg, hsl(43,74%,50%), hsl(225,60%,20%), hsl(43,74%,50%))" }} />
    </div>
  );
});

OfferLetterDoc.displayName = "OfferLetterDoc";
export default OfferLetterDoc;
