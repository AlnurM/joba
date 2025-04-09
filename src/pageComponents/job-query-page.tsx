import { useState } from "react";
import { Save, Plus, X } from "lucide-react";
import {
  SidebarTrigger,
  Input,
  Button,
  Card,
  CardContent,
  Textarea,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Badge,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import {
  Copy,
  Wand2,
  Search,
  Loader2,
  ChevronDown,
  ChevronRight,
  InfoIcon,
} from "lucide-react";
import { ResumeDropdown } from "@/features/resume-dropdown";

type KeywordSet = {
  id: string;
  keywords: string[];
};

type TestResult = {
  platform: string;
  count: number;
  loading: boolean;
};

interface KeywordGroupProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export function KeywordGroup({ keywords, onChange }: KeywordGroupProps) {
  const [newKeyword, setNewKeyword] = useState("");

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      onChange([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    onChange(newKeywords);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  return (
    <div className="space-y-2 rounded-md">
      <div className="flex flex-wrap gap-1 mb-2">
        {keywords.map((keyword, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="text-xs py-0.5 px-1.5"
          >
            {keyword}
            <button
              onClick={() => handleRemoveKeyword(index)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </Badge>
        ))}
        {keywords.length === 0 && (
          <div className="text-xs text-muted-foreground">No keywords added</div>
        )}
      </div>

      <div className="flex gap-1">
        <Input
          placeholder="Add keyword..."
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 h-8 text-sm"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddKeyword}
          className="px-2 h-8"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

const JobQueryPage = () => {
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [jobQueryTitle, setJobQueryTitle] = useState("");
  const [jobTitles, setJobTitles] = useState<KeywordSet[]>([
    {
      id: "1",
      keywords: [
        "Senior React.js developer",
        "Senior React.js engineer",
        "React.js lead",
      ],
    },
  ]);
  const [requiredSkills, setRequiredSkills] = useState<KeywordSet[]>([
    { id: "1", keywords: ["React.js"] },
  ]);
  const [workArrangements, setWorkArrangements] = useState<KeywordSet[]>([
    { id: "1", keywords: ["remote", "work from home", "telecommute"] },
  ]);
  const [positions, setPositions] = useState<KeywordSet[]>([
    { id: "1", keywords: ["developer", "engineer", "lead"] },
  ]);
  const [excludedKeywords, setExcludedKeywords] = useState<KeywordSet[]>([
    { id: "1", keywords: [] },
  ]);
  const [testResults, setTestResults] = useState<TestResult[]>([
    { platform: "LinkedIn", count: 0, loading: false },
    { platform: "Indeed", count: 0, loading: false },
    { platform: "Monster", count: 0, loading: false },
  ]);
  const [openSections, setOpenSections] = useState({
    include: true,
    exclude: true,
  });
  console.log(selectedResumeId);

  const generateLuceneQuery = () => {
    const parts: string[] = [];

    // Job titles
    if (jobTitles.some((group) => group.keywords.length > 0)) {
      const jobTitleGroups = jobTitles
        .filter((group) => group.keywords.length > 0)
        .map(
          (group) => `(${group.keywords.map((kw) => `"${kw}"`).join(" OR ")})`,
        )
        .join(" AND ");
      parts.push(jobTitleGroups);
    }

    // Required skills
    if (requiredSkills.some((group) => group.keywords.length > 0)) {
      const skillGroups = requiredSkills
        .filter((group) => group.keywords.length > 0)
        .map(
          (group) => `(${group.keywords.map((kw) => `"${kw}"`).join(" OR ")})`,
        )
        .join(" AND ");
      parts.push(skillGroups);
    }

    // Work arrangements
    if (workArrangements.some((group) => group.keywords.length > 0)) {
      const workGroups = workArrangements
        .filter((group) => group.keywords.length > 0)
        .map(
          (group) => `(${group.keywords.map((kw) => `"${kw}"`).join(" OR ")})`,
        )
        .join(" AND ");
      parts.push(workGroups);
    }

    // Positions
    if (positions.some((group) => group.keywords.length > 0)) {
      const positionGroups = positions
        .filter((group) => group.keywords.length > 0)
        .map(
          (group) => `(${group.keywords.map((kw) => `"${kw}"`).join(" OR ")})`,
        )
        .join(" AND ");
      parts.push(positionGroups);
    }

    // Build the main query
    let query = parts.join(" ");

    // Add excluded keywords with NOT operator
    const excludedTerms = excludedKeywords
      .filter((group) => group.keywords.length > 0)
      .flatMap((group) => group.keywords.map((kw) => `NOT "${kw}"`));

    if (excludedTerms.length > 0) {
      query = `(${query}) ${excludedTerms.join(" ")}`;
    }

    return query;
  };

  const generateKeywords = () => {
    // In a real implementation, this would call an API to generate keywords
    // For now, we'll just populate with sample data
    setJobTitles([
      {
        id: "1",
        keywords: [
          "Senior React.js Developer",
          "React.js Lead",
          "Frontend Engineer",
          "JavaScript Developer",
          "UI Developer",
        ],
      },
    ]);

    setRequiredSkills([
      {
        id: "1",
        keywords: ["React.js", "TypeScript", "JavaScript", "Redux", "Next.js"],
      },
    ]);

    setWorkArrangements([
      {
        id: "1",
        keywords: [
          "remote",
          "work from home",
          "telecommute",
          "hybrid",
          "flexible",
        ],
      },
    ]);

    setPositions([
      {
        id: "1",
        keywords: ["developer", "engineer", "lead", "architect", "specialist"],
      },
    ]);
  };

  const testQuery = (platform: string) => {
    // Update the loading state for the specific platform
    setTestResults((prev) =>
      prev.map((result) =>
        result.platform === platform ? { ...result, loading: true } : result,
      ),
    );

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate random count between 10-500
      const randomCount = Math.floor(Math.random() * 490) + 10;

      // Update the results
      setTestResults((prev) =>
        prev.map((result) =>
          result.platform === platform
            ? { ...result, count: randomCount, loading: false }
            : result,
        ),
      );
    }, 1500);
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Job Query Builder</h1>
          <p className="text-sm text-muted-foreground">
            Create job search queries to find the perfect job
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Input
            placeholder="Enter your job query title"
            value={jobQueryTitle}
            onChange={(e) => setJobQueryTitle(e.target.value)}
            className="w-80"
          />
          <Button>
            <Save className="h-4 w-4 mr-1" />
            Save Template
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 p-6">
        {/* Left column - Settings */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium">Keywords</h2>
            <div className="flex items-center gap-2">
              <ResumeDropdown onSelect={setSelectedResumeId} />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateKeywords}
                    // disabled={generateMutation.isPending}
                  >
                    {/* {generateMutation.isPending ? (
                      <div className="animate-spin h-4 w-4 border-2 border-current rounded-full border-t-transparent" />
                    ) : ( */}
                    <Wand2 className="h-4 w-4 mr-1" />
                    {/* )} */}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {/* {generateMutation.isPending ? "Generating..." : "Generate"} */}
                  Generate
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Include Section */}
          <Collapsible
            open={openSections.include}
            onOpenChange={() => toggleSection("include")}
          >
            <Card>
              <CardContent className="py-6">
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <h2 className="text-base font-medium">Include Keywords</h2>
                  {openSections.include ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-3 px-0">
                  {/* Job Titles */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Job Titles</h3>
                    {jobTitles.map((group, index) => (
                      <KeywordGroup
                        key={group.id}
                        keywords={group.keywords}
                        onChange={(newKeywords) => {
                          const newGroups = [...jobTitles];
                          newGroups[index].keywords = newKeywords;
                          setJobTitles(newGroups);
                        }}
                      />
                    ))}
                  </div>
                  {/* Required Skills */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Required Skills</h3>
                    {requiredSkills.map((group, index) => (
                      <KeywordGroup
                        key={group.id}
                        keywords={group.keywords}
                        onChange={(newKeywords) => {
                          const newGroups = [...requiredSkills];
                          newGroups[index].keywords = newKeywords;
                          setRequiredSkills(newGroups);
                        }}
                      />
                    ))}
                  </div>

                  {/* Work Arrangements */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Work Arrangements</h3>
                    {workArrangements.map((group, index) => (
                      <KeywordGroup
                        key={group.id}
                        keywords={group.keywords}
                        onChange={(newKeywords) => {
                          const newGroups = [...workArrangements];
                          newGroups[index].keywords = newKeywords;
                          setWorkArrangements(newGroups);
                        }}
                      />
                    ))}
                  </div>

                  {/* Positions */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Positions</h3>
                    {positions.map((group, index) => (
                      <KeywordGroup
                        key={group.id}
                        keywords={group.keywords}
                        onChange={(newKeywords) => {
                          const newGroups = [...positions];
                          newGroups[index].keywords = newKeywords;
                          setPositions(newGroups);
                        }}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </CardContent>
            </Card>
          </Collapsible>

          {/* Exclude Section */}
          <Collapsible
            open={openSections.exclude}
            onOpenChange={() => toggleSection("exclude")}
          >
            <Card>
              <CardContent className="py-6">
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <h2 className="text-base font-medium">Exclude Keywords</h2>
                  {openSections.exclude ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-3">
                  {excludedKeywords.map((group, index) => (
                    <KeywordGroup
                      key={group.id}
                      keywords={group.keywords}
                      onChange={(newKeywords) => {
                        const newGroups = [...excludedKeywords];
                        newGroups[index].keywords = newKeywords;
                        setExcludedKeywords(newGroups);
                      }}
                    />
                  ))}
                </CollapsibleContent>
              </CardContent>
            </Card>
          </Collapsible>
        </div>

        {/* Right column - Query Result and Testing */}
        <div className="space-y-4">
          {/* Query Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Lucene Query</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <Textarea
                className="font-mono text-sm flex-grow min-h-[200px]"
                value={generateLuceneQuery()}
                readOnly
              />
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(generateLuceneQuery())
                }
                className="w-full mt-4"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>

          {/* Test Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>Test Query Against Job Platforms</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-3">
                {testResults.map((result) => (
                  <div
                    key={result.platform}
                    className="flex items-center justify-between border rounded-md p-2"
                  >
                    <div>
                      <h3 className="font-medium text-sm">{result.platform}</h3>
                      {result.count > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Found approximately {result.count} matching jobs
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={result.loading}
                      onClick={() => testQuery(result.platform)}
                    >
                      {result.loading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Search className="h-3.5 w-3.5 mr-1" />
                          Test
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                <div className="space-y-1">
                  <span className="flex items-center gap-2">
                    <InfoIcon className="h-4 w-4" />
                    This is a simulation. In a real implementation, this would
                    connect to actual job platforms.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default JobQueryPage;
