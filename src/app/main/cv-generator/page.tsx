"use client";

import { useState } from "react";
import { FileText, Upload, Download, Edit, Trash2, Plus } from "lucide-react";
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
  useToast,
  ConfirmDialog,
} from "@/shared/ui";
import { useResumes, downloadResume, deleteResume } from "@/entities/resume";

export default function CVGeneratorPage() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useResumes({
    page,
    per_page: itemsPerPage,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setPage(1);
  };

  const handleDownload = async (resumeId: string, filename: string) => {
    try {
      const blob = await downloadResume(resumeId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    }
  };

  const openDeleteModal = (resumeId: string) => {
    setResumeToDelete(resumeId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setResumeToDelete(null);
  };

  const confirmDelete = async () => {
    if (!resumeToDelete) return;

    try {
      await deleteResume(resumeToDelete);
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
      refetch(); // Refresh the list
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    } finally {
      closeDeleteModal();
    }
  };

  const handleUploadCV = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.click();

    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log(`Uploading file: ${file.name}`);
      }
    };
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
          <Button onClick={handleUploadCV}>
            <Upload className="mr-2 h-4 w-4" />
            Upload CV
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
                            <FileText className="h-4 w-4 text-primary" />
                            {cv.filename}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(cv.created_at), "d MMM yyyy HH:mm")}
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
                                  handleDownload(cv.id, cv.filename)
                                }
                              >
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
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
                  onPageChange={handlePageChange}
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
                  <Button onClick={handleUploadCV}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload CV
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
