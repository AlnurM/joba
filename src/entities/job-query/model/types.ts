export type JobQueryStatus = "active" | "archived";

export interface JobQueryKeywords {
  job_titles: string[];
  required_skills: string[];
  work_arrangements: string[];
  positions: string[];
  exclude_words: string[];
}

export interface JobQueryKeywordsResponse {
  keywords: JobQueryKeywords;
}

export interface JobQuery {
  id: string;
  user_id: string;
  name: string;
  keywords: JobQueryKeywords;
  query: string;
  status: JobQueryStatus;
  created_at: string;
  updated_at: string;
}

export interface JobQueriesResponse {
  list: JobQuery[];
  pagination: {
    total: number;
    currentPage: number;
    perPage: number;
  };
}

export interface GetJobQueriesParams {
  page: number;
  per_page: number;
}
