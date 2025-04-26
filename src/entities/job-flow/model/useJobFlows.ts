import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJobFlow,
  deleteJobFlow,
  getJobFlows,
  updateJobFlowStatus,
} from "../api";
import {
  CreateJobFlowParams,
  GetJobFlowsParams,
  JobFlowResponse,
  JobFlowsResponse,
  JobFlowStatus,
} from "./types";
import { useToast } from "@/shared/ui";
import { useRouter } from "next/navigation";

export const useJobFlows = (params: GetJobFlowsParams) => {
  return useQuery<JobFlowsResponse>({
    queryKey: ["job-flows", params],
    queryFn: () => getJobFlows(params),
  });
};

export const useCreateJobFlow = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  return useMutation<JobFlowResponse, Error, CreateJobFlowParams>({
    mutationFn: (params: CreateJobFlowParams) => createJobFlow(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job-flows"] });
      toast({
        title: "Success",
        description: "Job flow successfully launched",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/main/job-flows");
      }

      return data;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to launch job flow",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateJobFlowStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      jobFlowId,
      status,
    }: {
      jobFlowId: string;
      status: JobFlowStatus;
    }) => updateJobFlowStatus(jobFlowId, status),
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["job-flows"] });

      const statusMessages = {
        active: "activated",
        paused: "paused",
        archived: "archived",
      };

      toast({
        title: "Success",
        description: `Job flow successfully ${statusMessages[status]}`,
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update job flow status",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteJobFlow = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (jobFlowId: string) => deleteJobFlow(jobFlowId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-flows"] });
      toast({
        title: "Success",
        description: "Job flow deleted successfully",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete job flow",
        variant: "destructive",
      });
    },
  });
};

export * from "./types";
