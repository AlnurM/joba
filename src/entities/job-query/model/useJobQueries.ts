import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getJobQueries,
  getJobQuery,
  createJobQuery,
  updateJobQuery,
  deleteJobQuery,
  updateJobQueryStatus,
  generateJobQueryKeywords,
} from "../api";
import {
  GetJobQueriesParams,
  JobQueriesResponse,
  JobQuery,
  JobQueryStatus,
} from "./types";
import { useToast } from "@/shared/ui";

export const useJobQueries = (params: GetJobQueriesParams) => {
  return useQuery<JobQueriesResponse>({
    queryKey: ["jobQueries", params],
    queryFn: () => getJobQueries(params),
  });
};

export const useJobQuery = (id?: string) => {
  return useQuery<JobQuery>({
    queryKey: ["jobQuery", id],
    queryFn: () => {
      if (!id) {
        return Promise.resolve(null as unknown as JobQuery);
      }
      return getJobQuery(id);
    },
    enabled: !!id,
  });
};

export const useCreateJobQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Partial<JobQuery>) => createJobQuery(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobQueries"] });
      toast({
        title: "Success",
        description: "Job query created successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create job query",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateJobQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<JobQuery> }) =>
      updateJobQuery(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["jobQueries"] });
      queryClient.invalidateQueries({ queryKey: ["jobQuery", id] });
      toast({
        title: "Success",
        description: "Job query updated successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update job query",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteJobQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteJobQuery(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobQueries"] });
      toast({
        title: "Success",
        description: "Job query deleted successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete job query",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateJobQueryStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobQueryStatus }) =>
      updateJobQueryStatus(id, status),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["jobQueries"] });
      toast({
        title: "Success",
        description: `Job query ${status === "archived" ? "archived" : "activated"} successfully`,
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update job query status",
        variant: "destructive",
      });
    },
  });
};

export const useGenerateJobQueryKeywords = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: { resume_id: string }) => generateJobQueryKeywords(data),
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate keywords",
        variant: "destructive",
      });
    },
  });
};
