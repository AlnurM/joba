"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Trash2, Plus, RefreshCw } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TablePagination,
} from "@/shared/ui";

export default function JobSearchPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  console.log(page);
  console.log(itemsPerPage);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setPage(1);
  };

  const isLoading = false;
  const isError = false;
  const data = {
    list: [],
    pagination: {
      total: 0,
      currentPage: 1,
      perPage: 10,
    },
  };
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Job Search Query Builder</h1>
          <p className="text-sm text-muted-foreground">
            Build your job search query
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button onClick={() => router.push("/main/job-query/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </header>
      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Search Query</CardTitle>
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
                      <TableHead className="w-[150px]">CV Score</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="text-right w-[100px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.list.map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium"></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
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
                              {/* {job.status === "active" ? (
                                <DropdownMenuItem
                                >
                                  <Archive className="mr-2 h-4 w-4" />
                                  <span>Archive</span>
                                </DropdownMenuItem>
                              ) : ( */}
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                <span>Activate</span>
                              </DropdownMenuItem>
                              {/* )} */}
                              <DropdownMenuItem className="text-destructive">
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
                  No Job Search Queries Found
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  You haven't created any job search queries yet. Create a new
                  one to get started.
                </p>
                <div className="mt-6 flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/main/job-query/create")}
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
