import { customFetch } from "@/shared/api";
import {
  GetCoverLettersParams,
  CoverLettersResponse,
  CoverLetter,
  CoverLetterStatus,
} from "../model/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const getCoverLetters = async (
  params: GetCoverLettersParams,
): Promise<CoverLettersResponse> => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    per_page: params.per_page.toString(),
  });

  return customFetch<CoverLettersResponse>(
    `${API_URL}/cover-letters/list?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );
};

export const getCoverLetter = async (id: string): Promise<CoverLetter> => {
  return customFetch<CoverLetter>(`${API_URL}/cover-letters/${id}`, {
    method: "GET",
  });
};

export const createCoverLetter = async (
  data: Partial<CoverLetter>,
): Promise<CoverLetter> => {
  return customFetch<CoverLetter>(`${API_URL}/cover-letters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateCoverLetter = async (
  id: string,
  data: Partial<CoverLetter>,
): Promise<CoverLetter> => {
  return customFetch<CoverLetter>(`${API_URL}/cover-letters/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteCoverLetter = async (id: string): Promise<void> => {
  await customFetch<void>(`${API_URL}/cover-letters/${id}`, {
    method: "DELETE",
  });
};

export const updateCoverLetterStatus = async (
  id: string,
  status: CoverLetterStatus,
): Promise<void> => {
  await customFetch<void>(`${API_URL}/cover-letters/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};
