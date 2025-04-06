"use client";

import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Plus,
  Loader2,
  FileIcon,
  Archive,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
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
  Progress,
} from "@/shared/ui";
import {
  useResumes,
  useDownloadResume,
  useDeleteResume,
  useUploadResume,
  useUpdateResumeStatus,
} from "@/entities/resume";

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

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
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [analysisStep, setAnalysisStep] = useState<string>("");

  const { data, isLoading, isError } = useResumes({
    page,
    per_page: itemsPerPage,
  });

  const downloadMutation = useDownloadResume();
  const deleteMutation = useDeleteResume();
  const uploadMutation = useUploadResume();
  const updateStatusMutation = useUpdateResumeStatus();

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

  const handleUploadCV = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.click();

    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          setIsUploading(true);
          setUploadingFile({
            name: file.name,
            size: formatFileSize(file.size),
          });

          // Analysis steps for visualization
          const analysisSteps = [
            "Initializing upload...",
            "Uploading file...",
            "Scanning document...",
            "Extracting information...",
            "Processing content...",
            "Analyzing structure...",
            "Validating format...",
            "Preparing storage...",
            "Finalizing upload...",
          ];

          let currentStepIndex = 0;
          setAnalysisStep(analysisSteps[currentStepIndex]);

          // Simulate progress with realistic steps
          setUploadProgress(5); // Start at 5%

          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
              // Calculate new progress based on current stage
              const baseProgress =
                (currentStepIndex / analysisSteps.length) * 100;
              const increment = Math.random() * 2;

              // Next step when we reach certain thresholds
              if (baseProgress + 10 < prev + increment) {
                currentStepIndex = Math.min(
                  currentStepIndex + 1,
                  analysisSteps.length - 1,
                );
                setAnalysisStep(analysisSteps[currentStepIndex]);
              }

              const newValue = Math.min(prev + increment, 90); // Cap at 90% until complete
              return newValue;
            });
          }, 800);

          await uploadMutation.mutateAsync(file);

          clearInterval(progressInterval);
          setUploadProgress(100);
          setAnalysisStep("Upload complete!");

          setTimeout(() => {
            setIsUploading(false);
            setUploadingFile(null);
            setUploadProgress(0);
            setAnalysisStep("");
          }, 1500);
        } catch (error) {
          console.log(error);
          setIsUploading(false);
          setUploadingFile(null);
          setUploadProgress(0);
          setAnalysisStep("");
        }
      }
    };
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

      {/* Upload Progress Indicator */}
      {isUploading && uploadingFile && (
        <div className="fixed bottom-4 right-4 w-80 bg-background/95 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden z-50 border border-border animate-in slide-in-from-bottom-5">
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-lg p-2.5">
                <FileIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{uploadingFile.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {uploadingFile.size}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative pt-1">
                <Progress
                  value={uploadProgress}
                  className="h-1.5 bg-primary/10 rounded-full overflow-hidden"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-primary">
                  {analysisStep}
                </span>
                <span className="text-xs font-medium">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-2 flex items-center gap-2">
              <div className="bg-primary/10 rounded-full p-1">
                <Loader2 className="h-3 w-3 text-primary animate-spin" />
              </div>
              <p className="text-xs text-muted-foreground">
                Processing may take up to 1 minute
              </p>
            </div>
          </div>
        </div>
      )}

      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">CV Generator</h1>
          <p className="text-sm text-muted-foreground">
            Manage and upload your CVs
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button onClick={handleUploadCV} disabled={isUploading}>
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {isUploading ? "Uploading..." : "Upload CV"}
          </Button>
          <Button variant="outline" disabled>
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
            ) : data?.list.length ? (
              <div className="flex flex-col gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead className="w-[150px]">Created</TableHead>
                      <TableHead className="w-[150px]">File Type</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="text-right w-[100px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.list.map((cv) => (
                      <TableRow key={cv.id}>
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
                                onClick={() =>
                                  downloadMutation.mutate({
                                    resumeId: cv.id,
                                    filename: cv.filename,
                                  })
                                }
                              >
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              {cv.status === "active" ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    updateStatusMutation.mutate({
                                      resumeId: cv.id,
                                      status: "archived",
                                    })
                                  }
                                >
                                  <Archive className="mr-2 h-4 w-4" />
                                  <span>Archive</span>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    updateStatusMutation.mutate({
                                      resumeId: cv.id,
                                      status: "active",
                                    })
                                  }
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  <span>Activate</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => openDeleteModal(cv.id)}
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
                  <Button onClick={handleUploadCV} disabled={isUploading}>
                    {isUploading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    {isUploading ? "Uploading..." : "Upload CV"}
                  </Button>
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
