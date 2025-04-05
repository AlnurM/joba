import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCoverLetters,
  getCoverLetter,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
  updateCoverLetterStatus,
} from "../api";
import {
  GetCoverLettersParams,
  CoverLettersResponse,
  CoverLetter,
  CoverLetterStatus,
} from "./types";
import { useToast } from "@/shared/ui";

export const useCoverLetters = (params: GetCoverLettersParams) => {
  return useQuery<CoverLettersResponse>({
    queryKey: ["coverLetters", params],
    queryFn: () => getCoverLetters(params),
  });
};

export const useCoverLetter = (id: string) => {
  return useQuery<CoverLetter>({
    queryKey: ["coverLetter", id],
    queryFn: () => getCoverLetter(id),
  });
};

export const useCreateCoverLetter = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Partial<CoverLetter>) => createCoverLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });
      toast({
        title: "Success",
        description: "Cover letter created successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create cover letter",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCoverLetter = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CoverLetter> }) =>
      updateCoverLetter(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });
      queryClient.invalidateQueries({ queryKey: ["coverLetter", id] });
      toast({
        title: "Success",
        description: "Cover letter updated successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cover letter",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteCoverLetter = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteCoverLetter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });
      toast({
        title: "Success",
        description: "Cover letter deleted successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete cover letter",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCoverLetterStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CoverLetterStatus }) =>
      updateCoverLetterStatus(id, status),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["coverLetters"] });
      toast({
        title: "Success",
        description: `Cover letter ${
          status === "archived" ? "archived" : "activated"
        } successfully`,
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update cover letter status",
        variant: "destructive",
      });
    },
  });
};
