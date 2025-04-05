export type CoverLetterStatus = "active" | "archived" | "deleted";

export interface CoverLetter {
  id: string;
  user_id: string;
  name: string;
  content: {
    introduction: string;
    body_part_1: string;
    body_part_2: string;
    conclusion: string;
  };
  status: CoverLetterStatus;
  created_at: string;
  updated_at: string;
}

export interface PaginationResponse {
  total: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export interface CoverLettersResponse {
  list: CoverLetter[];
  pagination: PaginationResponse;
}

export interface GetCoverLettersParams {
  page: number;
  per_page: number;
}
