export interface DocumentFormData {
  name: string;
  domain: string;
  role: string;
  internship: string;
  startDate: string;
  endDate: string;
}

export interface GeneratedDocument {
  formData: DocumentFormData;
  certificateId: string;
  issueDate: string;
  verificationUrl: string;
  skills: string[];
  certificateDescription: string;
  responsibilities: string[];
}

export type DomainKey =
  | "Web Development"
  | "App Development"
  | "Python"
  | "Digital Marketing"
  | "AI/ML"
  | "Other";
