import { customFetch } from "@/shared/api";
import {
  GetJobQueriesParams,
  JobQueriesResponse,
  JobQuery,
  JobQueryStatus,
  JobQueryKeywordsResponse,
} from "../model/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const getJobQueries = async (
  params: GetJobQueriesParams,
): Promise<JobQueriesResponse> => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    per_page: params.per_page.toString(),
  });

  return customFetch<JobQueriesResponse>(
    `${API_URL}/job-queries/list?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );
};

export const getJobQuery = async (id: string): Promise<JobQuery> => {
  return customFetch<JobQuery>(`${API_URL}/job-queries/${id}`, {
    method: "GET",
  });
};

export const createJobQuery = async (
  data: Partial<JobQuery>,
): Promise<JobQuery> => {
  return customFetch<JobQuery>(`${API_URL}/job-queries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateJobQuery = async (
  id: string,
  data: Partial<JobQuery>,
): Promise<JobQuery> => {
  return customFetch<JobQuery>(`${API_URL}/job-queries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteJobQuery = async (id: string): Promise<void> => {
  await customFetch<void>(`${API_URL}/job-queries/${id}`, {
    method: "DELETE",
  });
};

export const updateJobQueryStatus = async (
  id: string,
  status: JobQueryStatus,
): Promise<void> => {
  await customFetch<void>(`${API_URL}/job-queries/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};

export const generateJobQueryKeywords = async (data: {
  resume_id: string;
}): Promise<JobQueryKeywordsResponse> => {
  return customFetch<JobQueryKeywordsResponse>(
    `${API_URL}/job-queries/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
};
