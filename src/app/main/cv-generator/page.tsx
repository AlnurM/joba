"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Plus,
  Loader2,
  Archive,
  RefreshCw,
  BarChart2,
} from "lucide-react";
import { format } from "date-fns";
import { ResumeUpload } from "@/features/resume-upload";
import {
  useResumes,
  useDownloadResume,
  useDeleteResume,
  useUpdateResumeStatus,
  useStartScoring,
  ScoreBadge,
} from "@/entities/resume";
import {
  SidebarTrigger,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TablePagination,
  ConfirmDialog,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui";

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default";
    case "draft":
      return "secondary";
    case "archived":
      return "outline";
    default:
      return "default";
  }
};

export default function CVGeneratorPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedScoring, setSelectedScoring] = useState<string[]>([]);

  const { data, isLoading, isError } = useResumes({
    page,
    per_page: itemsPerPage,
  });
  const downloadMutation = useDownloadResume();
  const deleteMutation = useDeleteResume();
  const updateStatusMutation = useUpdateResumeStatus();
  const startScoringMutation = useStartScoring({
    onSuccess: () => {
      setSelectedScoring([]);
    },
  });

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setPage(1);
  };

  const openDeleteModal = (resumeId: string) => {
    setResumeToDelete(resumeId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setResumeToDelete(null);
  };

  const confirmDelete = () => {
    if (!resumeToDelete) return;
    deleteMutation.mutate(resumeToDelete);
    closeDeleteModal();
  };

  return (
    <>
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Resume"
        description="Are you sure you want to delete this resume? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="destructive"
      />

      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">CV Generator</h1>
          <p className="text-sm text-muted-foreground">
            Manage and upload your CVs
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ResumeUpload>
            {(props) => (
              <Button
                variant="outline"
                disabled={props.disabled}
                onClick={props.onClick}
              >
                {props.loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {props.loading ? "Uploading..." : "Upload CV"}
              </Button>
            )}
          </ResumeUpload>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </header>
      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Your CVs</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-8 text-destructive">
                Failed to load CVs. Please try again later.
              </div>
            ) : data?.list?.length ? (
              <div className="flex flex-col gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead className="w-[150px]">Created</TableHead>
                      <TableHead className="w-[150px]">File Type</TableHead>
                      <TableHead className="w-[150px]">CV Score</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="text-right w-[100px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.list.map((cv) => (
                      <TableRow
                        key={cv.id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/main/cv-generator/${cv.id}`)
                        }
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 min-w-4 text-primary" />
                            {cv.filename}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(cv.created_at), "MMM d, yyyy HH:mm")}
                        </TableCell>
                        <TableCell>
                          {cv.filename.split(".").pop()?.toUpperCase()}
                        </TableCell>
                        <TableCell>
                          {startScoringMutation.isPending &&
                          selectedScoring.includes(cv.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Tooltip>
                              <TooltipTrigger>
                                <ScoreBadge score={cv.scoring.total_score} />
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                {cv.scoring.total_score > 0 ? (
                                  <>
                                    <p>
                                      Sections: {cv.scoring.sections_score} / 30
                                    </p>
                                    <p>
                                      Experience: {cv.scoring.experience_score}{" "}
                                      / 40
                                    </p>
                                    <p>
                                      Education: {cv.scoring.education_score} /
                                      10
                                    </p>
                                    <p>
                                      Language: {cv.scoring.language_score} / 10
                                    </p>
                                    <p>
                                      Timeline: {cv.scoring.timeline_score} / 10
                                    </p>
                                    <p className="border-t border-grey">
                                      Total: {cv.scoring.total_score} / 100
                                    </p>
                                  </>
                                ) : (
                                  <p>No score yet</p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(cv.status)}>
                            {cv.status.charAt(0).toUpperCase() +
                              cv.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Open menu</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                  />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadMutation.mutate({
                                    resumeId: cv.id,
                                    filename: cv.filename,
                                  });
                                }}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              {cv.status === "active" ? (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatusMutation.mutate({
                                      resumeId: cv.id,
                                      status: "archived",
                                    });
                                  }}
                                >
                                  <Archive className="mr-2 h-4 w-4" />
                                  <span>Archive</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateStatusMutation.mutate({
                                      resumeId: cv.id,
                                      status: "active",
                                    });
                                  }}
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  <span>Activate</span>
                                </DropdownMenuItem>
                              )}
                              {!cv.scoring.total_score && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedScoring((prev) => [
                                      ...prev,
                                      cv.id,
                                    ]);
                                    startScoringMutation.mutate(cv.id);
                                  }}
                                >
                                  <BarChart2 className="mr-2 h-4 w-4" />
                                  <span>Start Scoring</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDeleteModal(cv.id);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  totalItems={data.pagination.total}
                  currentPage={data.pagination.currentPage}
                  itemsPerPage={data.pagination.perPage}
                  onPageChange={setPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <FileText className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No CVs Found</h3>
                <p className="text-muted-foreground max-w-sm">
                  You haven't uploaded any CVs yet. Upload an existing CV or
                  create a new one to get started.
                </p>
                <div className="mt-6 flex gap-4">
                  <ResumeUpload>
                    {(props) => (
                      <Button
                        variant="outline"
                        disabled={props.disabled}
                        onClick={props.onClick}
                      >
                        {props.loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="mr-2 h-4 w-4" />
                        )}
                        {props.loading ? "Uploading..." : "Upload CV"}
                      </Button>
                    )}
                  </ResumeUpload>
                  <Button variant="outline" disabled>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
