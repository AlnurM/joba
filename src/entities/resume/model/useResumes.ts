import { useQuery } from "@tanstack/react-query";
import { getResumes } from "../api";
import { GetResumesParams, ResumesResponse } from "./types";

export const useResumes = (params: GetResumesParams) => {
  return useQuery<ResumesResponse>({
    queryKey: ["resumes", params],
    queryFn: () => getResumes(params),
  });
};
