import { customFetch } from "@/shared/api";
import { GetResumesParams, ResumesResponse } from "../model/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const getResumes = async (
  params: GetResumesParams,
): Promise<ResumesResponse> => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    per_page: params.per_page.toString(),
  });

  return customFetch<ResumesResponse>(
    `${API_URL}/resumes/list?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );
};

export const downloadResume = async (resumeId: string): Promise<Blob> => {
  const response = await customFetch<Response>(
    `${API_URL}/resumes/${resumeId}/download`,
    {
      method: "GET",
      rawResponse: true,
    },
  );

  return response.blob();
};

export const deleteResume = async (resumeId: string): Promise<void> => {
  await customFetch<void>(`${API_URL}/resumes/${resumeId}`, {
    method: "DELETE",
  });
};
