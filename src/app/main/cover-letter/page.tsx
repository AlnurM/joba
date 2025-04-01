"use client";

import type React from "react";

import { useState } from "react";
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
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { PenLine, Copy, Download, Wand2 } from "lucide-react";

export default function CoverLetterPage() {
  const [selectedSection, setSelectedSection] = useState("intro");
  const [templateContent, setTemplateContent] = useState({
    intro:
      "I am writing to express my interest in the {{position}} position at {{company}}. With over {{years_experience}} years of experience in {{field}}, I am confident in my ability to make significant contributions to your team.",
    body1:
      "In my current role at {{current_company}}, I have {{achievement_1}}. Additionally, I have developed expertise in {{skills}} which has allowed me to {{achievement_2}}. These experiences have prepared me to excel in a challenging role like the one at {{company}}.",
    body2:
      "I was particularly drawn to {{company}} due to your {{company_strength}}. Your recent {{company_achievement}} aligns perfectly with my interest in {{personal_interest}}. I believe my background in {{background}} would be valuable for your {{future_projects}}.",
    conclusion:
      "I would welcome the opportunity to discuss how my {{skill_summary}} can help {{company}} achieve its goals. Thank you for considering my application. I look forward to the possibility of contributing to {{company}}'s continued success.",
  });

  const [placeholderValues, setPlaceholderValues] = useState({
    position: "Senior Frontend Developer",
    company: "Acme Inc",
    years_experience: "5",
    field: "web development",
    current_company: "XYZ Tech",
    achievement_1:
      "led the development of a customer-facing web application that increased user engagement by 35%",
    skills: "React, TypeScript, and modern frontend tools",
    achievement_2:
      "build scalable and maintainable applications that deliver exceptional user experiences",
    company_strength: "commitment to innovation and user-centric design",
    company_achievement: "product launch showcasing AI-powered interfaces",
    personal_interest: "building intuitive and intelligent user experiences",
    background: "performance optimization and responsive design",
    future_projects: "upcoming projects",
    skill_summary: "experience and skills",
  });

  const [jobDescription, setJobDescription] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplateContent({
      ...templateContent,
      [selectedSection]: e.target.value,
    });
  };

  const fillPlaceholders = (
    template: string,
    values: Record<string, string>,
  ) => {
    let filledTemplate = template;
    Object.entries(values).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      filledTemplate = filledTemplate.replace(regex, value);
    });
    return filledTemplate;
  };

  const generateCompleteLetter = () => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date().toLocaleDateString(
      "en-US",
      dateOptions as any,
    );

    return `John Doe
123 Main Street
New York, NY 10001
john.doe@example.com
(555) 123-4567

${currentDate}

Jane Smith
Hiring Manager
${placeholderValues.company}
456 Business Blvd
San Francisco, CA 94107

Dear Ms. Smith,

${fillPlaceholders(templateContent.intro, placeholderValues)}

${fillPlaceholders(templateContent.body1, placeholderValues)}

${fillPlaceholders(templateContent.body2, placeholderValues)}

${fillPlaceholders(templateContent.conclusion, placeholderValues)}

Sincerely,
John Doe`;
  };

  const handleGeneratePlaceholders = () => {
    setGenerating(true);

    // Simulate AI analyzing job description and generating placeholder values
    setTimeout(() => {
      // Extract keywords from job description (simplified mock implementation)
      const keywords = jobDescription
        .split(/\s+/)
        .filter(
          (word) =>
            word.length > 5 &&
            !["the", "and", "that", "with"].includes(word.toLowerCase()),
        )
        .slice(0, 10);

      // Simple rule-based extraction (this would be replaced by actual AI)
      let company = "Acme Inc";
      const companyMatch = jobDescription.match(/at\s+([A-Z][A-Za-z\s]+)/);
      if (companyMatch && companyMatch[1]) {
        company = companyMatch[1].trim();
      }

      let position = "Senior Frontend Developer";
      const positionMatch = jobDescription.match(
        /(Senior|Junior|Lead)?\s*([A-Za-z]+\s+Developer|Engineer|Designer)/,
      );
      if (positionMatch && positionMatch[0]) {
        position = positionMatch[0].trim();
      }

      // Update placeholder values with "extracted" information
      setPlaceholderValues({
        ...placeholderValues,
        company,
        position,
        skills: keywords.slice(0, 3).join(", "),
        company_strength: keywords.slice(3, 5).join(" and "),
        future_projects: keywords.slice(5, 7).join("-related projects"),
      });

      setGenerating(false);
    }, 2000);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generateCompleteLetter());
  };

  const downloadAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generateCompleteLetter()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "cover_letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Fixed highlightPlaceholders function to avoid JSX syntax issues
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

  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div>
          <h1 className="text-lg font-semibold">Cover Letter Customizer</h1>
          <p className="text-sm text-muted-foreground">
            Create tailored cover letters with customizable templates
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button>
            <PenLine className="mr-2 h-4 w-4" />
            New Template
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
              <div>
                <Select
                  value={selectedSection}
                  onValueChange={setSelectedSection}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intro">Introduction</SelectItem>
                    <SelectItem value="body1">Body Part I</SelectItem>
                    <SelectItem value="body2">Body Part II</SelectItem>
                    <SelectItem value="conclusion">Conclusion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                className="min-h-[200px] font-mono"
                value={
                  templateContent[
                    selectedSection as keyof typeof templateContent
                  ]
                }
                onChange={handleTextareaChange}
                placeholder="Enter your template text with {{placeholders}}..."
              />

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Available Placeholders:
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(placeholderValues).map((key) => (
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
                className="min-h-[200px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
              />
              <Button
                onClick={handleGeneratePlaceholders}
                className="w-full"
                disabled={generating || !jobDescription}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {generating
                  ? "Analyzing..."
                  : "Extract Information & Fill Placeholders"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Preview */}
        <div>
          <Card className="sticky top-6">
            <Tabs defaultValue="preview">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Cover Letter</CardTitle>
                  <TabsList>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="template">Template</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  See how your cover letter will look with filled placeholders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="preview">
                  <div className="border rounded-md p-6 bg-card min-h-[600px] max-h-[600px] overflow-y-auto whitespace-pre-line text-sm">
                    {generateCompleteLetter()}
                  </div>
                </TabsContent>
                <TabsContent value="template">
                  <div className="border rounded-md p-6 bg-card min-h-[600px] max-h-[600px] overflow-y-auto text-sm">
                    <div>John Doe</div>
                    <div>123 Main Street</div>
                    <div>New York, NY 10001</div>
                    <div>john.doe@example.com</div>
                    <div>(555) 123-4567</div>
                    <div className="mt-4">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      } as any)}
                    </div>
                    <div className="mt-4">
                      <div>Jane Smith</div>
                      <div>Hiring Manager</div>
                      <div>
                        {"{{"} company {"}}"}​
                      </div>
                      <div>456 Business Blvd</div>
                      <div>San Francisco, CA 94107</div>
                    </div>
                    <div className="mt-4">Dear Ms. Smith,</div>
                    <div className="mt-4">
                      {renderHighlightedText(templateContent.intro)}
                    </div>
                    <div className="mt-4">
                      {renderHighlightedText(templateContent.body1)}
                    </div>
                    <div className="mt-4">
                      {renderHighlightedText(templateContent.body2)}
                    </div>
                    <div className="mt-4">
                      {renderHighlightedText(templateContent.conclusion)}
                    </div>
                    <div className="mt-4">Sincerely,</div>
                    <div>John Doe</div>
                  </div>
                </TabsContent>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={handleCopyToClipboard}>
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
