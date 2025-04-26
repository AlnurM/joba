import { customFetch } from "@/shared/api";
import {
  CreateJobFlowParams,
  GetJobFlowsParams,
  JobFlowResponse,
  JobFlowsResponse,
  JobFlowStatus,
} from "../model/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const createJobFlow = async (
  params: CreateJobFlowParams,
): Promise<JobFlowResponse> => {
  return customFetch<JobFlowResponse>(`${API_URL}/job-flow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
};

export const getJobFlows = async (
  params: GetJobFlowsParams,
): Promise<JobFlowsResponse> => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    per_page: params.per_page.toString(),
  });

  if (params.status) {
    searchParams.append("status", params.status);
  }

  return customFetch<JobFlowsResponse>(
    `${API_URL}/job-flow/list?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );
};

export const updateJobFlowStatus = async (
  jobFlowId: string,
  status: JobFlowStatus,
): Promise<void> => {
  await customFetch<void>(`${API_URL}/job-flow/${jobFlowId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};

export const deleteJobFlow = async (jobFlowId: string): Promise<void> => {
  await customFetch<void>(`${API_URL}/job-flow/${jobFlowId}`, {
    method: "DELETE",
  });
};
