"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  PenLine,
  Search,
  Plus,
  Play,
  Pause,
  Archive,
  Trash2,
} from "lucide-react";
import {
  SidebarTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TablePagination,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  ConfirmDialog,
} from "@/shared/ui";
import {
  useJobFlows,
  useUpdateJobFlowStatus,
  useDeleteJobFlow,
} from "@/entities/job-flow";

export default function Home() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [flowToDelete, setFlowToDelete] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleItemsPerPageChange = (value: string) => {
    setPerPage(parseInt(value));
    setPage(1);
  };

  const { data, isLoading, isError } = useJobFlows({
    page,
    per_page: perPage,
  });

  const updateStatusMutation = useUpdateJobFlowStatus();
  const deleteMutation = useDeleteJobFlow();

  const handleUpdateStatus = (
    flowId: string,
    status: "active" | "paused" | "archived",
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    updateStatusMutation.mutate({
      jobFlowId: flowId,
      status,
    });
  };

  const openDeleteModal = (flowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlowToDelete(flowId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setFlowToDelete(null);
  };

  const confirmDelete = () => {
    if (!flowToDelete) return;
    deleteMutation.mutate(flowToDelete);
    closeDeleteModal();
  };

  return (
    <>
      <ConfirmDialog
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Job Flow"
        description="Are you sure you want to delete this job flow? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="destructive"
      />

      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to Joba Llama
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button onClick={() => router.push("/main/flow/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Flow
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Flows</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : isError ? (
              <div className="text-center py-8 text-destructive">
                Failed to load job queries. Please try again later.
              </div>
            ) : data?.list?.length ? (
              <div className="flex flex-col gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Resume</TableHead>
                      <TableHead className="w-[250px]">Cover Letter</TableHead>
                      <TableHead className="w-[250px]">Job Query</TableHead>
                      <TableHead className="w-[150px]">Created</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="text-right w-[100px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.list.map((flow) => (
                      <TableRow
                        key={flow.id}
                        className="cursor-pointer"
                        onClick={() => router.push(`/main/job-flow/${flow.id}`)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 min-w-4 text-primary" />
                            {flow.resume.filename}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 min-w-4 text-primary" />
                            {flow.cover_letter.name}
                          </div>
                        </TableCell>
                        <TableCell>{flow.job_query.name}</TableCell>
                        <TableCell>
                          {new Date(flow.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              flow.status === "active" ? "default" : "secondary"
                            }
                          >
                            {flow.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {flow.status === "active" ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={(e) =>
                                    handleUpdateStatus(flow.id, "paused", e)
                                  }
                                  disabled={updateStatusMutation.isPending}
                                >
                                  <Pause className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Pause job flow</TooltipContent>
                            </Tooltip>
                          ) : flow.status === "paused" ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={(e) =>
                                    handleUpdateStatus(flow.id, "active", e)
                                  }
                                  disabled={updateStatusMutation.isPending}
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Resume job flow</TooltipContent>
                            </Tooltip>
                          ) : null}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => e.stopPropagation()}
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
                            <DropdownMenuContent
                              align="end"
                              onClick={(e: React.MouseEvent) =>
                                e.stopPropagation()
                              }
                            >
                              {flow.status !== "archived" && (
                                <DropdownMenuItem
                                  onClick={(e) =>
                                    handleUpdateStatus(flow.id, "archived", e)
                                  }
                                  disabled={updateStatusMutation.isPending}
                                >
                                  <Archive className="mr-2 h-4 w-4" />
                                  Archive
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={(e) => openDeleteModal(flow.id, e)}
                                disabled={deleteMutation.isPending}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
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
                  No Job Flows Found
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  You haven't created any job flows yet. Create a new one to get
                  started.
                </p>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/main/flow/create")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => router.push("/main/cv-generator/create")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Generate New CV
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => router.push("/main/cover-letter/create")}
              >
                <PenLine className="mr-2 h-4 w-4" />
                Create Cover Letter Template
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => router.push("/main/job-query/create")}
              >
                <Search className="mr-2 h-4 w-4" />
                Create Job Search Query
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current status of your automation pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>CV Generator</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Cover Letter Customizer</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span>LinkedIn Integration</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Degraded
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Job Search API</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Operational
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
