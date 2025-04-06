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
