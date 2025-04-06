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

  if (params.status) {
    searchParams.append("status", params.status);
  }

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

export const uploadResume = async (file: File): Promise<void> => {
  if (
    ![
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.type)
  ) {
    throw new Error("Only PDF, DOC, and DOCX files are allowed");
  }

  const formData = new FormData();
  formData.append("file", file);

  await customFetch<void>(`${API_URL}/resumes/upload`, {
    method: "POST",
    body: formData,
    headers: {}, // Важно: не устанавливаем Content-Type, браузер сам установит с boundary для FormData
  });
};

export const updateResumeStatus = async (
  resumeId: string,
  status: "active" | "archived",
): Promise<void> => {
  await customFetch<void>(`${API_URL}/resumes/${resumeId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};
