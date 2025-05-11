import { ArrowRight } from "lucide-react";
import type { CVData } from "@/entities/resume";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  Button,
} from "@/shared/ui";

interface SuggestionsPanelProps {
  cvData: CVData;
}

export function SuggestionsPanel({ cvData }: SuggestionsPanelProps) {
  // Generate suggestions based on CV data
  const suggestions = generateSuggestions(cvData);

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard key={index} suggestion={suggestion} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

interface Suggestion {
  title: string;
  description: string;
  type: "improvement" | "addition" | "tip";
}

function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  return (
    <Card className="border-l-4 border-l-yellow-500">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-base">{suggestion.title}</CardTitle>
        <CardDescription className="text-xs">
          {suggestion.type === "improvement" && "Suggested improvement"}
          {suggestion.type === "addition" && "Suggested addition"}
          {suggestion.type === "tip" && "CV writing tip"}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2 px-4 text-sm">
        <p>{suggestion.description}</p>
        <Button
          variant="link"
          className="p-0 h-auto mt-2 text-xs flex items-center gap-1"
        >
          Apply suggestion <ArrowRight className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
}

function generateSuggestions(cvData: CVData): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Check for summary length
  if (cvData.summary.length < 100) {
    suggestions.push({
      title: "Expand your professional summary",
      description:
        "Your summary is quite brief. Consider adding more details about your expertise and career goals.",
      type: "improvement",
    });
  }

  // Check for quantifiable achievements in work experience
  const hasQuantifiableAchievements = cvData.work_experience.some(
    (exp) =>
      exp.achievements && exp.achievements.some((ach) => /\d+/.test(ach)),
  );

  if (!hasQuantifiableAchievements && cvData.work_experience.length > 0) {
    suggestions.push({
      title: "Add quantifiable achievements",
      description:
        "Include metrics and numbers in your work achievements to demonstrate your impact (e.g., 'Increased sales by 20%').",
      type: "improvement",
    });
  }

  // Check for skills relevance
  suggestions.push({
    title: "Tailor skills to job requirements",
    description:
      "Make sure your technical skills align with the job positions you're targeting.",
    type: "tip",
  });

  // Check for education details
  if (
    cvData.education.some((edu) => !edu.courses || edu.courses.length === 0)
  ) {
    suggestions.push({
      title: "Add relevant coursework",
      description:
        "Include relevant courses in your education section to showcase specific knowledge areas.",
      type: "addition",
    });
  }

  // General CV tips
  suggestions.push({
    title: "Use action verbs",
    description:
      "Start achievement bullets with strong action verbs like 'Implemented', 'Developed', or 'Led'.",
    type: "tip",
  });

  suggestions.push({
    title: "Keep formatting consistent",
    description:
      "Ensure consistent formatting throughout your CV for a professional appearance.",
    type: "tip",
  });

  return suggestions;
}
