"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Copy, Download, Wand2, Save, InfoIcon } from "lucide-react";
import { useResumes } from "@/entities/resume";
import {
  useGenerateCoverLetterText,
  useRenderCoverLetter,
  useCreateCoverLetter,
  useCoverLetter,
} from "@/entities/cover-letter";
import {
  SidebarTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useToast,
} from "@/shared/ui";

const CVContextDropdown = ({
  onSelect,
  selectedResume,
}: {
  onSelect: (resumeId: string) => void;
  selectedResume?: { id: string; filename: string } | null;
}) => {
  const { data, isLoading } = useResumes({
    page: 1,
    per_page: 100,
    status: "active",
  });

  useEffect(() => {
    if (data?.list.length === 1) {
      onSelect(data.list[0].id);
    }
  }, [data, onSelect]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          @
          <span>
            {selectedResume ? selectedResume.filename : "Add CV context"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {isLoading ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : data?.list.length === 0 ? (
          <DropdownMenuItem disabled>No active resumes found</DropdownMenuItem>
        ) : (
          data?.list.map((resume) => (
            <DropdownMenuItem
              key={resume.id}
              onClick={() => onSelect(resume.id)}
            >
              {resume.filename}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const renderHighlightedText = (text: string) => {
  const parts = text.split(/(\{\{[^{}]+\}\})/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.match(/\{\{[^{}]+\}\}/)) {
          return (
            <span
              key={index}
              className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded text-yellow-800 dark:text-yellow-200"
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default function CoverLetterPage() {
  const { toast } = useToast();
  const params = useParams();

  const { data: coverLetter } = useCoverLetter(params.id as string);
  const [coverLetterTitle, setCoverLetterTitle] = useState("");
  const [selectedSection, setSelectedSection] = useState("introduction");
  const [prompt, setPrompt] = useState("");

  const { data: resumesData } = useResumes({
    page: 1,
    per_page: 100,
    status: "active",
  });
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const selectedResume = resumesData?.list.find(
    (r) => r.id === selectedResumeId,
  );
  const [templateContent, setTemplateContent] = useState(() => ({
    introduction: localStorage.getItem(`cover-letter-introduction`) || "",
    body_part_1: localStorage.getItem(`cover-letter-body_part_1`) || "",
    body_part_2: localStorage.getItem(`cover-letter-body_part_2`) || "",
    conclusion: localStorage.getItem(`cover-letter-conclusion`) || "",
  }));

  const generateMutation = useGenerateCoverLetterText();
  const renderMutation = useRenderCoverLetter();
  const createMutation = useCreateCoverLetter();

  const handleGenerateText = () => {
    if (!selectedResumeId) {
      toast({
        title: "Error",
        description: "Please select a CV first",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate(
      {
        resume_id: selectedResumeId,
        prompt,
        content_type: selectedSection,
      },
      {
        onSuccess: (data) => {
          const text = data.text.replace(
            /(?<!\{)\{([^{}]+)\}(?!\})/g,
            "{{$1}}",
          );
          localStorage.setItem(`cover-letter-${selectedSection}`, text);
          setTemplateContent((prev) => ({
            ...prev,
            [selectedSection]: text,
          }));
        },
      },
    );
  };

  const [selectedTab, setSelectedTab] = useState("template");
  const [jobDescription, setJobDescription] = useState("");
  const [preview, setPreview] = useState("");

  const handleGeneratePlaceholders = () => {
    renderMutation.mutate(
      {
        job_description: jobDescription,
        content: templateContent,
      },
      {
        onSuccess: (data) => {
          setPreview(data.text);
          setSelectedTab("preview");
        },
      },
    );
  };

  const downloadAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([preview], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "cover_letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSaveTemplate = () => {
    createMutation.mutate(
      {
        name: coverLetterTitle || "Basic",
        content: templateContent,
        status: "archived",
      },
      {
        onSuccess: () => {
          setCoverLetterTitle("");
          localStorage.setItem(`cover-letter-introduction`, "");
          localStorage.setItem(`cover-letter-body_part_1`, "");
          localStorage.setItem(`cover-letter-body_part_2`, "");
          localStorage.setItem(`cover-letter-conclusion`, "");
        },
      },
    );
  };

  useEffect(() => {
    if (coverLetter) {
      setCoverLetterTitle(coverLetter.name);
      setTemplateContent(coverLetter.content);
    }
  }, [coverLetter]);

  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Cover Letter Customizer</h1>
          <p className="text-sm text-muted-foreground">
            {coverLetter ? "Edit" : "Create"} tailored cover letters with
            customizable templates
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Input
            placeholder="Enter your cover letter title"
            value={coverLetterTitle}
            onChange={(e) => setCoverLetterTitle(e.target.value)}
            className="w-80"
          />
          <Button
            onClick={handleSaveTemplate}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-current rounded-full border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1" />
                Save Template
              </>
            )}
          </Button>
        </div>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Panel: Template Editor */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Editor</CardTitle>
              <CardDescription>
                Edit your cover letter template with placeholders like {"{{"}{" "}
                company {"}}"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CVContextDropdown
                onSelect={setSelectedResumeId}
                selectedResume={selectedResume}
              />
              <div>
                <Select
                  value={selectedSection}
                  onValueChange={setSelectedSection}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="introduction">Introduction</SelectItem>
                    <SelectItem value="body_part_1">Body Part I</SelectItem>
                    <SelectItem value="body_part_2">Body Part II</SelectItem>
                    <SelectItem value="conclusion">Conclusion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Input
                  className="resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt... ex: include my experience and skills, be concise, etc"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={handleGenerateText}
                      disabled={generateMutation.isPending}
                    >
                      {generateMutation.isPending ? (
                        <div className="animate-spin h-4 w-4 border-2 border-current rounded-full border-t-transparent" />
                      ) : (
                        <Wand2 className="h-4 w-4 mr-1" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {generateMutation.isPending ? "Generating..." : "Generate"}
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                <div className="space-y-1">
                  <span className="flex items-center gap-2">
                    <InfoIcon className="h-4 w-4" />
                    Every section already has predefined prompt for better
                    results
                  </span>
                  <span className="flex items-center gap-2">
                    <InfoIcon className="h-4 w-4" />
                    You can leave the prompt field empty and generate the text
                    immediately
                  </span>
                  <span className="flex items-center gap-2">
                    <InfoIcon className="h-4 w-4" />
                    You can write your own placeholders in the template text
                  </span>
                </div>
              </div>
              <Textarea
                className="min-h-[230px] font-mono resize-none"
                value={
                  templateContent[
                    selectedSection as keyof typeof templateContent
                  ]
                }
                onChange={(e) =>
                  setTemplateContent({
                    ...templateContent,
                    [selectedSection]: e.target.value,
                  })
                }
                placeholder="Enter your template text with {{placeholders}}..."
              />

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Placeholders:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "hiring_manager_name",
                    "company_name",
                    "position_name",
                    "job_requirements",
                    "preferred_frameworks",
                    "years_experience",
                    "field",
                    "company_strength",
                    "company_achievement",
                    "personal_interest",
                    "required_background",
                    "future_projects",
                  ].map((key) => (
                    <span
                      key={key}
                      className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded text-xs text-yellow-800 dark:text-yellow-200 cursor-pointer"
                      onClick={() => {
                        const textarea = document.querySelector("textarea");
                        if (textarea) {
                          const cursorPos = textarea.selectionStart;
                          const text =
                            templateContent[
                              selectedSection as keyof typeof templateContent
                            ];
                          const newText =
                            text.substring(0, cursorPos) +
                            `{{${key}}}` +
                            text.substring(cursorPos);
                          setTemplateContent({
                            ...templateContent,
                            [selectedSection]: newText,
                          });
                        }
                      }}
                    >
                      {"{{"}
                      {key}
                      {"}}"}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test with Job Description</CardTitle>
              <CardDescription>
                Paste a job description to extract relevant information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[100px] resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
              />
              <Button
                onClick={handleGeneratePlaceholders}
                className="w-full"
                disabled={renderMutation.isPending || !jobDescription}
              >
                {renderMutation.isPending ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-current rounded-full border-t-transparent" />
                    Rendering...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Preview
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Preview */}
        <div>
          <Card className="sticky top-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Cover Letter</CardTitle>
                  <TabsList>
                    <TabsTrigger value="preview" disabled={!jobDescription}>
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="template">Template</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  {selectedTab === "preview"
                    ? "See how your cover letter will look with filled placeholders"
                    : "See how the template looks"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="preview">
                  <div className="border rounded-md p-6 bg-card min-h-[600px] overflow-y-auto whitespace-pre-line text-sm">
                    {preview}
                  </div>
                </TabsContent>
                <TabsContent value="template">
                  <div className="border rounded-md p-6 bg-card min-h-[600px] overflow-y-auto whitespace-pre-line text-sm">
                    <div className="mt-4">
                      {renderHighlightedText(templateContent.introduction)}
                    </div>
                    <div className="mt-4">
                      {renderHighlightedText(templateContent.body_part_1)}
                    </div>
                    <div className="mt-4">
                      {renderHighlightedText(templateContent.body_part_2)}
                    </div>
                    <div className="mt-4">
                      {renderHighlightedText(templateContent.conclusion)}
                    </div>
                  </div>
                </TabsContent>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(preview)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button onClick={downloadAsTxt}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </>
  );
}
