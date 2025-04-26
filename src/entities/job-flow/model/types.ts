export type JobFlowSource = "linkedin" | "internal";

export type JobFlowStatus = "active" | "paused" | "archived";

export interface CreateJobFlowParams {
  resume_id: string;
  cover_letter_id: string;
  job_query_id: string;
  source: JobFlowSource;
  status: JobFlowStatus;
}

export interface Resume {
  id: string;
  filename: string;
}

export interface CoverLetter {
  id: string;
  name: string;
}

export interface JobQuery {
  id: string;
  name: string;
  query: string;
}

export interface JobFlowResponse {
  id: string;
  user_id: string;
  source: JobFlowSource;
  status: JobFlowStatus;
  created_at: string;
  updated_at: string;
  resume: Resume;
  cover_letter: CoverLetter;
  job_query: JobQuery;
}

export interface GetJobFlowsParams {
  page: number;
  per_page: number;
  status?: JobFlowStatus;
}

export interface JobFlowsResponse {
  list: JobFlowResponse[];
  pagination: {
    total: number;
    currentPage: number;
    perPage: number;
  };
}
