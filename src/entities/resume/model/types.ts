export type ResumeStatus = "active" | "archived" | "deleted";

export interface Resume {
  filename: string;
  file_id: string;
  status: ResumeStatus;
  id: string;
  user_id: string;
  created_at: string;
  scoring: {
    education_score: number;
    experience_score: number;
    language_score: number;
    sections_score: number;
    timeline_score: number;
    total_score: number;
  };
}

export interface PaginationResponse {
  total: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export interface ResumesResponse {
  list: Resume[];
  pagination: PaginationResponse;
}

export interface GetResumesParams {
  page: number;
  per_page: number;
  status?: ResumeStatus;
}

// CV Data Types

export interface PersonalInfo {
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  prefix?: string;
  suffix?: string;
  gender?: string;
  birth_date?: string;
  nationality?: string;
  marital_status?: string;
  photo_url?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface SocialProfile {
  network: string;
  url: string;
  username?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: Address;
  social_profiles: SocialProfile[];
}

export interface Education {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  gpa?: number;
  max_gpa?: number;
  location?: string;
  is_current: boolean;
  description?: string;
  courses?: string[];
  metadata?: {
    extraction_confidence?: number;
  };
}

export interface WorkExperience {
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  description?: string;
  achievements?: string[];
  skills_used?: string[];
  metadata?: {
    extraction_confidence?: number;
  };
}

export interface TechnicalSkill {
  name: string;
  level?: string;
  years_of_experience?: number;
  last_used?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  certificate_id?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Skills {
  technical: TechnicalSkill[];
  soft: string[];
  certifications: Certification[];
  languages: Language[];
}

export interface Project {
  name: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  technologies: string[];
  url?: string;
  role?: string;
}

export interface Publication {
  title: string;
  publisher: string;
  publication_date: string;
  url?: string;
  authors: string[];
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Volunteering {
  organization: string;
  role: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

export interface Reference {
  name: string;
  position: string;
  email?: string;
  phone?: string;
  relationship?: string;
}

export interface CustomSectionItem {
  [key: string]: any;
}

export interface CustomSection {
  section_name: string;
  items: CustomSectionItem[];
}

export interface CVData {
  personal_info: PersonalInfo;
  contact_info: ContactInfo;
  summary: string;
  education: Education[];
  work_experience: WorkExperience[];
  skills: Skills;
  projects: Project[];
  publications: Publication[];
  awards: Award[];
  volunteering: Volunteering[];
  interests: string[];
  references: Reference[];
  custom_sections: CustomSection[];
}
