import { forwardRef } from "react";
import { GeneratedDocument } from "@/types/document";
import { formatDate } from "@/lib/documentUtils";
import { QRCodeSVG } from "qrcode.react";
import maximLogo from "@/assets/maxim-logo.png";
import msmEmblem from "@/assets/msme-emblem.png";
import excellenceBadge from "@/assets/excellence-badge.png";

interface Props {
  doc: GeneratedDocument;
}

const CertificateDoc = forwardRef<HTMLDivElement, Props>(({ doc }, ref) => {
  const { formData, certificateId, issueDate, verificationUrl, skills, certificateDescription } = doc;

  return (
    <div
      ref={ref}
      id="certificate-doc"
      style={{
        width: "1123px",
        minHeight: "794px",
        background: "white",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Circuit watermark background */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}
        viewBox="0 0 1123 794"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i}>
            <line x1={i * 95} y1="0" x2={i * 95} y2="794" stroke="#1a2a6c" strokeWidth="0.8" strokeDasharray="4 8" />
            <line x1="0" y1={i * 66} x2="1123" y2={i * 66} stroke="#1a2a6c" strokeWidth="0.8" strokeDasharray="4 8" />
          </g>
        ))}
        {[
          [120, 150], [300, 400], [700, 200], [950, 500], [200, 600], [850, 100],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#1a2a6c" />
        ))}
        {[
          "< / >", "{ }", "=>", "func()", "API", "{ }", "#!", "while()"
        ].map((text, i) => (
          <text key={i} x={80 + i * 130} y={680 + (i % 2) * 40} fontSize="14" fill="#1a2a6c" opacity="0.6">{text}</text>
        ))}
      </svg>

      {/* Outer border */}
      <div style={{ position: "absolute", inset: "16px", border: "3px solid hsl(225,60%,20%)", borderRadius: "4px", pointerEvents: "none" }} />
      {/* Inner gold border */}
      <div style={{ position: "absolute", inset: "22px", border: "1.5px solid hsl(43,74%,50%)", borderRadius: "2px", pointerEvents: "none" }} />

      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "8px",
        background: "linear-gradient(90deg, hsl(225,60%,20%) 0%, hsl(220,80%,45%) 50%, hsl(43,74%,50%) 100%)"
      }} />

      {/* Header */}
      <div style={{ paddingTop: "36px", paddingLeft: "52px", paddingRight: "52px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo + Company */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src={maximLogo} alt="Maxim Code" style={{ width: "80px", height: "80px", objectFit: "contain", borderRadius: "12px" }} />
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", color: "hsl(225,60%,20%)", fontFamily: "'Cinzel', serif", letterSpacing: "2px", lineHeight: 1.1 }}>MAXIM CODE</div>
            <div style={{ fontSize: "10px", color: "hsl(43,74%,45%)", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase", marginTop: "3px" }}>Building Future Innovators</div>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "11px", color: "hsl(220,15%,55%)", letterSpacing: "4px", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>Maxim Code Presents</div>
          <div style={{ fontSize: "28px", fontWeight: "900", color: "hsl(225,60%,20%)", fontFamily: "'Cinzel', serif", letterSpacing: "3px", lineHeight: 1 }}>CERTIFICATE</div>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "hsl(43,74%,45%)", letterSpacing: "5px", textTransform: "uppercase", marginTop: "4px" }}>OF COMPLETION</div>
        </div>

        {/* Certificate ID */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "10px", color: "hsl(220,15%,55%)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "500" }}>Certificate ID</div>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "hsl(225,60%,20%)", fontFamily: "monospace", marginTop: "2px" }}>{certificateId}</div>
          <div style={{ fontSize: "10px", color: "hsl(220,15%,55%)", marginTop: "4px" }}>Issue Date: {issueDate}</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ margin: "20px 52px 0", height: "2px", background: "linear-gradient(90deg, transparent, hsl(43,74%,50%), hsl(225,60%,20%), hsl(43,74%,50%), transparent)" }} />

      {/* Main Content */}
      <div style={{ padding: "24px 52px 0", display: "flex", gap: "32px" }}>
        {/* Left: Main Certificate Text */}
        <div style={{ flex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "12px", color: "hsl(220,15%,55%)", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "500", marginBottom: "8px" }}>This Certificate Is Proudly Presented To</div>
            <div style={{
              fontSize: "38px", fontWeight: "900", fontFamily: "'Cinzel', serif",
              background: "linear-gradient(135deg, hsl(225,60%,20%) 0%, hsl(220,80%,45%) 50%, hsl(225,60%,20%) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1.1, letterSpacing: "2px", textTransform: "uppercase",
              textShadow: "none", marginBottom: "6px"
            }}>
              {formData.name}
            </div>
            <div style={{ width: "200px", height: "2px", background: "linear-gradient(90deg, transparent, hsl(43,74%,50%), transparent)", margin: "8px auto" }} />
          </div>

          {/* Description */}
          <div style={{
            fontSize: "12.5px", color: "hsl(220,25%,25%)", lineHeight: "1.9",
            textAlign: "justify", marginBottom: "18px",
            background: "hsl(220,20%,98%)", padding: "16px 20px", borderRadius: "6px",
            borderLeft: "3px solid hsl(43,74%,50%)"
          }}
            dangerouslySetInnerHTML={{ __html: certificateDescription }}
          />

          {/* Skills */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "10px", color: "hsl(220,15%,55%)", letterSpacing: "3px", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>Skills Demonstrated</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {skills.map((skill) => (
                <span key={skill} style={{
                  padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: "600",
                  background: "hsl(225,60%,20%)", color: "white", letterSpacing: "0.5px"
                }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "18px" }}>
            {[
              { label: "Domain", value: formData.domain },
              { label: "Duration", value: `${formatDate(formData.startDate)} – ${formatDate(formData.endDate)}` },
              { label: "Role", value: formData.role },
            ].map((item) => (
              <div key={item.label} style={{ flex: 1, padding: "10px 14px", background: "hsl(225,60%,20%)", borderRadius: "6px" }}>
                <div style={{ fontSize: "9px", color: "hsl(43,90%,70%)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600" }}>{item.label}</div>
                <div style={{ fontSize: "12px", color: "white", fontWeight: "600", marginTop: "3px" }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Signature */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "28px", fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                color: "hsl(225,60%,20%)", fontWeight: "700", lineHeight: 1, marginBottom: "6px",
                borderBottom: "2px solid hsl(43,74%,50%)", paddingBottom: "4px", minWidth: "160px"
              }}>B. Guhan</div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "hsl(225,60%,20%)", letterSpacing: "1px" }}>B. GUHAN</div>
              <div style={{ fontSize: "10px", color: "hsl(220,15%,55%)", marginTop: "1px" }}>Staff, Maxim Code</div>
            </div>

            {/* QR + Verification */}
            <div style={{ textAlign: "center" }}>
              <QRCodeSVG value={verificationUrl} size={72} level="M" includeMargin={false}
                fgColor="hsl(225,60%,20%)" bgColor="transparent" />
              <div style={{ fontSize: "9px", color: "hsl(220,15%,55%)", marginTop: "4px", letterSpacing: "0.5px" }}>Scan to Verify</div>
            </div>

            {/* Official Seal */}
            <div style={{
              width: "90px", height: "90px", borderRadius: "50%",
              border: "3px solid hsl(43,74%,50%)", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center",
              background: "radial-gradient(circle, hsl(220,20%,97%), white)"
            }}>
              <div style={{ fontSize: "8px", fontWeight: "800", color: "hsl(225,60%,20%)", letterSpacing: "1.5px", textTransform: "uppercase" }}>OFFICIAL</div>
              <div style={{ fontSize: "18px", fontFamily: "'Cinzel', serif", fontWeight: "900", color: "hsl(43,74%,45%)" }}>MC</div>
              <div style={{ fontSize: "8px", fontWeight: "700", color: "hsl(225,60%,20%)", letterSpacing: "1px" }}>SEAL</div>
            </div>
          </div>
        </div>

        {/* Right: Excellence Badge + MSME */}
        <div style={{ width: "160px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {/* Excellence Badge */}
          <div style={{ textAlign: "center" }}>
            <img src={excellenceBadge} alt="Excellence Award" style={{ width: "130px", height: "130px", objectFit: "contain" }} />
            <div style={{ fontSize: "9px", color: "hsl(43,74%,45%)", fontWeight: "700", letterSpacing: "2px", marginTop: "4px" }}>EXCELLENCE AWARD</div>
          </div>

          {/* Verification box */}
          <div style={{
            padding: "10px 12px", background: "hsl(220,20%,97%)", borderRadius: "8px",
            border: "1px solid hsl(220,20%,88%)", textAlign: "center", width: "100%"
          }}>
            <div style={{ fontSize: "8px", color: "hsl(220,15%,55%)", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Verify Online</div>
            <div style={{ fontSize: "8px", color: "hsl(225,60%,25%)", wordBreak: "break-all", fontFamily: "monospace" }}>{verificationUrl}</div>
          </div>

          {/* MSME emblem */}
          <div style={{ textAlign: "center" }}>
            <img src={msmEmblem} alt="MSME" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
            <div style={{ fontSize: "8px", color: "hsl(220,15%,55%)", fontWeight: "500", textAlign: "center", marginTop: "4px", lineHeight: "1.4" }}>Aligned with<br />MSME Guidelines</div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", background: "linear-gradient(90deg, hsl(43,74%,50%) 0%, hsl(225,60%,20%) 50%, hsl(43,74%,50%) 100%)" }} />
    </div>
  );
});

CertificateDoc.displayName = "CertificateDoc";
export default CertificateDoc;
