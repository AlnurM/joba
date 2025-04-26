"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  FileSpreadsheet,
  Search,
  Rocket,
  ArrowRight,
  Check,
  Linkedin,
  Globe,
  Plus,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { ResumeUpload } from "@/features/resume-upload";
import { useResumes } from "@/entities/resume";
import { useCoverLetters } from "@/entities/cover-letter";
import { useJobQueries } from "@/entities/job-query";
import { createJobFlow } from "@/entities/job-flow/api";
import {
  SidebarTrigger,
  Button,
  Card,
  CardContent,
  Badge,
  RadioGroup,
  RadioGroupItem,
  Label,
  Skeleton,
  useToast,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const FlowPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedResume, setSelectedResume] = useState<string | null>(
    () => localStorage.getItem("selectedResume") ?? null,
  );
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<string | null>(
    () => localStorage.getItem("selectedCoverLetter") ?? null,
  );
  const [selectedQueryTemplate, setSelectedQueryTemplate] = useState<
    string | null
  >(() => localStorage.getItem("selectedQueryTemplate") ?? null);
  const [source, setSource] = useState<"linkedin" | "internal" | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [activeStep, setActiveStep] = useState(() =>
    localStorage.getItem("activeStep")
      ? parseInt(localStorage.getItem("activeStep")!)
      : 1,
  );

  const { data: resumes, isLoading: isResumesLoading } = useResumes({
    page: 1,
    per_page: 10,
    status: "active",
  });

  const { data: coverLetters, isLoading: isCoverLettersLoading } =
    useCoverLetters({
      page: 1,
      per_page: 10,
      status: "active",
    });

  const { data: jobQueries, isLoading: isJobQueriesLoading } = useJobQueries({
    page: 1,
    per_page: 10,
    status: "active",
  });

  const handleSelectResume = (id: string) => {
    setSelectedResume(id);
    localStorage.setItem("selectedResume", id);
  };

  const handleSelectCoverLetter = (id: string) => {
    setSelectedCoverLetter(id);
    localStorage.setItem("selectedCoverLetter", id);
  };

  const handleSelectQueryTemplate = (id: string) => {
    setSelectedQueryTemplate(id);
    localStorage.setItem("selectedQueryTemplate", id);
  };

  const handleLaunch = async () => {
    if (
      !selectedResume ||
      !selectedCoverLetter ||
      !selectedQueryTemplate ||
      !source
    ) {
      return;
    }

    setIsLaunching(true);

    try {
      await createJobFlow({
        resume_id: selectedResume,
        cover_letter_id: selectedCoverLetter,
        job_query_id: selectedQueryTemplate,
        source: source,
        status: "active",
      });

      toast({
        title: "Success",
        description: "Job flow successfully launched",
        variant: "success",
      });

      localStorage.removeItem("activeStep");
      localStorage.removeItem("selectedResume");
      localStorage.removeItem("selectedCoverLetter");
      localStorage.removeItem("selectedQueryTemplate");

      router.push("/main");
    } catch (error) {
      setIsLaunching(false);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to launch job flow",
        variant: "destructive",
      });
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return !!selectedResume;
      case 2:
        return !!selectedCoverLetter;
      case 3:
        return !!selectedQueryTemplate;
      case 4:
        return !!source;
      default:
        return false;
    }
  };

  const canLaunch =
    isStepComplete(1) &&
    isStepComplete(2) &&
    isStepComplete(3) &&
    isStepComplete(4);

  const handleNext = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
      localStorage.setItem("activeStep", activeStep.toString());
    }
  };

  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background/50 backdrop-blur-sm px-6 sticky top-0 z-10">
        <SidebarTrigger />
        <div>
          <h1 className="text-lg font-semibold">Create Application Flow</h1>
          <p className="text-sm text-muted-foreground">
            Configure and launch your automated job application process
          </p>
        </div>
      </header>
      <main className="container max-w-5xl mt-16 py-8 px-4">
        {/* Progress indicator */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0"></div>

          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                activeStep === step
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110"
                  : activeStep > step || isStepComplete(step)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
              )}
              onClick={() => isStepComplete(step - 1) && setActiveStep(step)}
            >
              {activeStep > step || isStepComplete(step) ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{step}</span>
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="space-y-8">
          {/* Step 1: Select CV */}
          <div
            className={cn(
              "transition-all duration-500",
              activeStep !== 1 && "opacity-60",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Select Resume
              </h2>
              {activeStep !== 1 && isStepComplete(1) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveStep(1)}
                >
                  Edit
                </Button>
              )}
            </div>

            {activeStep === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isResumesLoading
                  ? Array.from({ length: 2 }).map((_, index) => (
                      <Skeleton key={index} className="h-28 w-full" />
                    ))
                  : resumes?.list.map((cv) => (
                      <Card
                        key={cv.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          selectedResume === cv.id && "ring-2 ring-primary",
                        )}
                        onClick={() => handleSelectResume(cv.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 flex flex-col gap-2">
                              <div className="font-medium">
                                {cv.filename?.split(".")[0]}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Created:{" "}
                                {format(new Date(cv.created_at), "MMM d, yyyy")}
                              </div>
                              <Badge variant="outline" className="w-fit">
                                {cv.filename.split(".")[1]?.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          {selectedResume === cv.id && (
                            <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"></div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                <ResumeUpload onSuccess={handleSelectResume}>
                  {(props) => (
                    <Card
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground border-dashed"
                      onClick={props.disabled ? undefined : props.onClick}
                    >
                      <CardContent className="p-4 h-full min-h-28 flex flex-col items-center justify-center gap-2 text-muted-foreground duration-100 hover:text-primary">
                        <div className="flex items-center gap-2">
                          {props.loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Plus className="h-5 w-5" />
                          )}
                          <span className="font-medium">Upload New Resume</span>
                        </div>
                        <span className="text-xs">PDF, DOCX or TXT</span>
                      </CardContent>
                    </Card>
                  )}
                </ResumeUpload>
              </div>
            ) : (
              selectedResume && (
                <div className="text-sm">
                  Selected:{" "}
                  <span className="font-medium">
                    {
                      resumes?.list.find((cv) => cv.id === selectedResume)
                        ?.filename
                    }
                  </span>
                </div>
              )
            )}

            {activeStep === 1 && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!selectedResume}
                  className="group"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Step 2: Select Cover Letter */}
          <div
            className={cn(
              "transition-all duration-500",
              activeStep !== 2 && "opacity-60",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FileSpreadsheet className="mr-2 h-5 w-5 text-primary" />
                Select Cover Letter
              </h2>
              {activeStep !== 2 && isStepComplete(2) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveStep(2)}
                >
                  Edit
                </Button>
              )}
            </div>

            {activeStep === 2 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isCoverLettersLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} className="h-24 w-full" />
                    ))
                  : coverLetters?.list.map((cl) => (
                      <Card
                        key={cl.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          selectedCoverLetter === cl.id &&
                            "ring-2 ring-primary",
                        )}
                        onClick={() => handleSelectCoverLetter(cl.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium">{cl.name}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Created:{" "}
                                {format(new Date(cl.updated_at), "MMM d, yyyy")}
                              </div>
                            </div>
                          </div>
                          {selectedCoverLetter === cl.id && (
                            <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"></div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                <Card
                  className="cursor-pointer transition-all hover:shadow-md border-dashed"
                  onClick={() => {
                    sessionStorage.setItem(
                      "routerBack",
                      window.location.pathname,
                    );
                    router.push("/main/cover-letter/create");
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center h-12 gap-2 text-muted-foreground duration-100 hover:text-primary">
                      <Plus className="h-5 w-5" />
                      <div className="text-sm">Add Cover Letter</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              selectedCoverLetter && (
                <div className="text-sm">
                  Selected:{" "}
                  <span className="font-medium">
                    {
                      coverLetters?.list.find(
                        (cl) => cl.id === selectedCoverLetter,
                      )?.name
                    }
                  </span>
                </div>
              )
            )}

            {activeStep === 2 && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!selectedCoverLetter}
                  className="group"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Step 3: Configure Lucene Query */}
          <div
            className={cn(
              "transition-all duration-500",
              activeStep !== 3 && "opacity-60",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Search className="mr-2 h-5 w-5 text-primary" />
                Configure Search Query
              </h2>
              {activeStep !== 3 && isStepComplete(3) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveStep(3)}
                >
                  Edit
                </Button>
              )}
            </div>

            {activeStep === 3 ? (
              <div className="grid grid-cols-1 gap-4">
                {isJobQueriesLoading
                  ? Array.from({ length: 1 }).map((_, index) => (
                      <Skeleton key={index} className="h-24 w-full" />
                    ))
                  : jobQueries?.list.map((query) => (
                      <Card
                        key={query.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          selectedQueryTemplate === query.id &&
                            "ring-2 ring-primary",
                        )}
                        onClick={() => handleSelectQueryTemplate(query.id)}
                      >
                        <CardContent className="p-4">
                          <div className="font-medium">{query.name}</div>
                          <div className="text-sm font-mono bg-muted p-2 rounded mt-2 overflow-x-auto">
                            {query.query}
                          </div>
                          {selectedQueryTemplate === query.id && (
                            <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary"></div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                <Card
                  className="cursor-pointer transition-all hover:shadow-md border-dashed"
                  onClick={() => {
                    sessionStorage.setItem(
                      "routerBack",
                      window.location.pathname,
                    );
                    router.push("/main/job-query/create");
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center h-16 gap-2 text-muted-foreground duration-100 hover:text-primary">
                      <Plus className="h-5 w-5" />
                      <div className="text-sm">Add Search Query</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              selectedQueryTemplate && (
                <div className="text-sm">
                  Query template:{" "}
                  <span className="font-medium">
                    {
                      jobQueries?.list.find(
                        (q) => q.id === selectedQueryTemplate,
                      )?.name
                    }
                  </span>
                </div>
              )
            )}

            {activeStep === 3 && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!selectedQueryTemplate}
                  className="group"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Step 4: Select Source */}
          <div
            className={cn(
              "transition-all duration-500",
              activeStep !== 4 && "opacity-60",
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Select Source
              </h2>
              {activeStep !== 4 && isStepComplete(4) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveStep(4)}
                >
                  Edit
                </Button>
              )}
            </div>

            {activeStep === 4 ? (
              <RadioGroup
                value={source || ""}
                onValueChange={(value) =>
                  setSource(value as "linkedin" | "internal")
                }
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="linkedin"
                    id="linkedin"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="linkedin"
                    className="flex flex-col items-center justify-center h-40 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Linkedin className="h-10 w-10 mb-2" />
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-muted-foreground text-center mt-1">
                      Search and apply to jobs on LinkedIn
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem
                    value="internal"
                    id="internal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="internal"
                    className="flex flex-col items-center justify-center h-40 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Globe className="h-10 w-10 mb-2" />
                    <div className="font-medium">Job Websites Database</div>
                    <div className="text-sm text-muted-foreground text-center mt-1">
                      Search across multiple job boards and company internal
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              source && (
                <div className="text-sm">
                  Selected source:{" "}
                  <span className="font-medium">
                    {source === "linkedin"
                      ? "LinkedIn"
                      : "Job Websites Database"}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Launch section */}
          <div
            className={cn(
              "mt-12 transition-all duration-500",
              !canLaunch && "opacity-50",
            )}
          >
            <Card
              className={cn(
                "border-dashed transition-all",
                canLaunch && "border-primary/50 bg-primary/5",
              )}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <Rocket className="mr-2 h-5 w-5 text-primary" />
                      Launch Application Flow
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start the automated job application process with your
                      selected configuration
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              isStepComplete(1) ? "bg-green-500" : "bg-muted",
                            )}
                          ></div>
                          <span>CV</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              isStepComplete(2) ? "bg-green-500" : "bg-muted",
                            )}
                          ></div>
                          <span>Cover Letter</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              isStepComplete(3) ? "bg-green-500" : "bg-muted",
                            )}
                          ></div>
                          <span>Search Query</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              isStepComplete(4) ? "bg-green-500" : "bg-muted",
                            )}
                          ></div>
                          <span>Source</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      disabled={!canLaunch || isLaunching}
                      onClick={handleLaunch}
                      className="min-w-[120px]"
                    >
                      {isLaunching ? (
                        <>
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                          Launching...
                        </>
                      ) : (
                        <>
                          <Rocket className="mr-2 h-4 w-4" />
                          Launch
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default FlowPage;
