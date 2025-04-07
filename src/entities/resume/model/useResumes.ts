import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getResumes,
  downloadResume,
  deleteResume,
  uploadResume,
  updateResumeStatus,
  startScoring,
} from "../api";
import { GetResumesParams, ResumesResponse } from "./types";
import { useToast } from "@/shared/ui";

export const useResumes = (params: GetResumesParams) => {
  return useQuery<ResumesResponse>({
    queryKey: ["resumes"],
    queryFn: () => getResumes(params),
  });
};

export const useHasActiveResume = () => {
  const { data } = useQuery<ResumesResponse>({
    queryKey: ["resumes", { page: 1, per_page: 1 }],
    queryFn: () => getResumes({ page: 1, per_page: 1 }),
  });
  return {
    hasActiveResume:
      data?.list.some((resume) => resume.status === "active") ?? false,
    isLoading: !data,
  };
};

export const useDownloadResume = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      resumeId,
      filename,
    }: {
      resumeId: string;
      filename: string;
    }) => {
      const blob = await downloadResume(resumeId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return blob;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Resume downloaded successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (resumeId: string) => deleteResume(resumeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast({
        title: "Success",
        description: "Resume deleted successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    },
  });
};

export const useUploadResume = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (file: File) => uploadResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast({
        title: "Success",
        description: "Resume uploaded successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload resume",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateResumeStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      resumeId,
      status,
    }: {
      resumeId: string;
      status: "active" | "archived";
    }) => updateResumeStatus(resumeId, status),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast({
        title: "Success",
        description: `Resume ${status === "archived" ? "archived" : "activated"} successfully`,
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update resume status",
        variant: "destructive",
      });
    },
  });
};

export const useStartScoring = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (resumeId: string) => startScoring(resumeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      onSuccess();
      toast({
        title: "Success",
        description: "Resume scored successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to score resume",
        variant: "destructive",
      });
    },
  });
};
