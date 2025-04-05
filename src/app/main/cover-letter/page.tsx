"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TablePagination,
  SidebarTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ConfirmDialog,
  useToast,
} from "@/shared/ui";
import { FileText, Plus, Archive, RefreshCw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCoverLetters,
  useDeleteCoverLetter,
  useUpdateCoverLetterStatus,
} from "@/entities/cover-letter";
import { useHasActiveResume } from "@/entities/resume";

export default function CoverLetterList() {
  const router = useRouter();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [letterToDelete, setLetterToDelete] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data, isLoading, isError } = useCoverLetters({
    page,
    per_page: itemsPerPage,
  });

  const { hasActiveResume, isLoading: isCheckingResume } = useHasActiveResume();

  const deleteMutation = useDeleteCoverLetter();
  const updateStatusMutation = useUpdateCoverLetterStatus();

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setPage(1);
  };

  const openDeleteModal = (letterId: string) => {
    setLetterToDelete(letterId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setLetterToDelete(null);
  };

  const confirmDelete = () => {
    if (!letterToDelete) return;
    deleteMutation.mutate(letterToDelete);
    closeDeleteModal();
  };

  const handleCreateClick = () => {
    if (!hasActiveResume) {
      toast({
        title: "Action Required",
        description:
          "Please upload or activate a CV first before creating a cover letter.",
        variant: "destructive",
      });
      router.push("/main/cv-generator");
      return;
    }
    router.push("/main/cover-letter/create");
  };

  return (
    <>
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Cover Letter"
        description="Are you sure you want to delete this cover letter? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="destructive"
      />

      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Cover Letters</h1>
          <p className="text-sm text-muted-foreground">
            Manage your cover letters
          </p>
        </div>
        <div className="ml-auto">
          <Button
            onClick={handleCreateClick}
            className="bg-blue-500 hover:bg-blue-600"
            disabled={isCheckingResume}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </header>

      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Cover Letters</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-8 text-destructive">
                Failed to load cover letters. Please try again later.
              </div>
            ) : data?.list.length ? (
              <div className="flex flex-col gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Name</TableHead>
                      <TableHead className="w-[150px]">Created</TableHead>
                      <TableHead className="w-[150px]">Updated</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="text-right w-[100px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.list.map((letter) => (
                      <TableRow key={letter.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 min-w-4 text-primary" />
                            {letter.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(letter.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(letter.updated_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              letter.status === "active"
                                ? "default"
                                : letter.status === "archived"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {letter.status.charAt(0).toUpperCase() +
                              letter.status.slice(1)}
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
                              {letter.status === "active" ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    updateStatusMutation.mutate({
                                      id: letter.id,
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
                                      id: letter.id,
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
                                onClick={() => openDeleteModal(letter.id)}
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
                <h3 className="text-lg font-semibold mb-2">
                  No Cover Letters Found
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Create your first cover letter to get started.
                </p>
                <div className="mt-6">
                  <Button
                    onClick={handleCreateClick}
                    className="bg-blue-500 hover:bg-blue-600"
                    disabled={isCheckingResume || !hasActiveResume}
                  >
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
