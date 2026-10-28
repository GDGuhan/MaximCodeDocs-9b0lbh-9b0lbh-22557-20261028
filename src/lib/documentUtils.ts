import { DomainKey, DocumentFormData, GeneratedDocument } from "@/types/document";

const DOMAIN_SKILLS: Record<string, string[]> = {
  "Web Development": ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "MongoDB"],
  "App Development": ["Flutter", "Firebase", "REST APIs", "UI/UX Design", "Dart", "Mobile Architecture"],
  "Python": ["Python", "Automation", "Data Handling", "Scripting", "OOP", "Libraries"],
  "Digital Marketing": ["SEO", "Analytics", "Campaign Management", "Social Media Marketing", "Content Strategy", "Google Ads"],
  "AI/ML": ["Python", "Machine Learning", "Data Analytics", "AI Tools", "TensorFlow", "Data Visualization"],
};

const DOMAIN_RESPONSIBILITIES: Record<string, string[]> = {
  "Web Development": [
    "Develop and maintain responsive web applications using modern frontend technologies.",
    "Collaborate with the design team to implement pixel-perfect UI components.",
    "Write clean, modular, and well-documented JavaScript/React code.",
    "Integrate RESTful APIs and manage application state effectively.",
    "Participate in code reviews and contribute to best practices.",
    "Optimize web performance and ensure cross-browser compatibility.",
  ],
  "App Development": [
    "Design and develop cross-platform mobile applications using Flutter.",
    "Integrate Firebase services for authentication, database, and notifications.",
    "Build intuitive UI/UX flows following mobile design guidelines.",
    "Connect RESTful APIs and handle asynchronous data operations.",
    "Conduct testing and debugging across Android and iOS platforms.",
    "Document code and contribute to technical specifications.",
  ],
  "Python": [
    "Write Python scripts for automation and data processing tasks.",
    "Develop and maintain backend utilities and automation pipelines.",
    "Handle data parsing, transformation, and reporting using Python libraries.",
    "Collaborate on scripting solutions that improve operational efficiency.",
    "Follow coding standards and participate in team code reviews.",
    "Document automation workflows and maintain technical documentation.",
  ],
  "Digital Marketing": [
    "Plan and execute digital marketing campaigns across multiple platforms.",
    "Conduct SEO audits and implement on-page and off-page optimization strategies.",
    "Analyze campaign performance using Google Analytics and provide insights.",
    "Manage and grow social media presence across LinkedIn, Instagram, and Twitter.",
    "Create and schedule content calendars aligned with brand guidelines.",
    "Assist in email marketing campaigns and monitor engagement metrics.",
  ],
  "AI/ML": [
    "Research and implement machine learning models for assigned use cases.",
    "Preprocess and analyze datasets to extract meaningful insights.",
    "Develop and evaluate AI-based solutions using Python and relevant frameworks.",
    "Collaborate with the team on model optimization and performance tuning.",
    "Document experiments, findings, and model evaluation reports.",
    "Stay updated with the latest AI/ML trends and apply learnings to projects.",
  ],
};

const DEFAULT_SKILLS = ["Communication", "Problem Solving", "Teamwork", "Project Management", "Research", "Documentation"];
const DEFAULT_RESPONSIBILITIES = [
  "Contribute to ongoing projects and assignments as directed by the mentor.",
  "Conduct research and present findings to the team on a regular basis.",
  "Collaborate with team members and assist in day-to-day operational tasks.",
  "Participate in team meetings and share updates on assigned tasks.",
  "Maintain documentation and submit weekly progress reports.",
  "Demonstrate professionalism and adherence to company policies.",
];

export function getSkillsForDomain(domain: string): string[] {
  for (const key of Object.keys(DOMAIN_SKILLS)) {
    if (domain.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(domain.toLowerCase())) {
      return DOMAIN_SKILLS[key];
    }
  }
  return DEFAULT_SKILLS;
}

export function getResponsibilitiesForDomain(domain: string): string[] {
  for (const key of Object.keys(DOMAIN_RESPONSIBILITIES)) {
    if (domain.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(domain.toLowerCase())) {
      return DOMAIN_RESPONSIBILITIES[key];
    }
  }
  return DEFAULT_RESPONSIBILITIES;
}

export function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `MC-${year}-${num}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

export function getCurrentDate(): string {
  return new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

export function generateCertificateDescription(data: DocumentFormData): string {
  const skills = getSkillsForDomain(data.domain);
  const skillsStr = skills.slice(0, 4).join(", ");
  return `This is to certify that <strong>${data.name}</strong> has successfully completed the <strong>${data.internship}</strong> internship in the domain of <strong>${data.domain}</strong> at <strong>Maxim Code</strong> from <strong>${formatDate(data.startDate)}</strong> to <strong>${formatDate(data.endDate)}</strong>. During this period, the candidate demonstrated exceptional dedication, professionalism, and technical excellence in ${skillsStr}. Their commitment to learning, strong work ethic, and significant contributions to real-world projects reflect a high standard of performance and professional growth.`;
}

export function generateDocumentData(formData: DocumentFormData): GeneratedDocument {
  const certificateId = generateCertificateId();
  return {
    formData,
    certificateId,
    issueDate: getCurrentDate(),
    verificationUrl: `https://maximcode.in/verify/${certificateId}`,
    skills: getSkillsForDomain(formData.domain),
    certificateDescription: generateCertificateDescription(formData),
    responsibilities: getResponsibilitiesForDomain(formData.domain),
  };
}

export function calculateDuration(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return "N/A";
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);
  const weeks = Math.floor((diffDays % 30) / 7);
  if (months > 0) return `${months} Month${months > 1 ? "s" : ""}${weeks > 0 ? ` ${weeks} Week${weeks > 1 ? "s" : ""}` : ""}`;
  if (weeks > 0) return `${weeks} Week${weeks > 1 ? "s" : ""}`;
  return `${diffDays} Days`;
}
