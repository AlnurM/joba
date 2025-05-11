"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Textarea,
  Label,
} from "@/shared/ui";

interface SummarySectionProps {
  data: string;
  onChange: (data: string) => void;
}

export function SummarySection({ data, onChange }: SummarySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
        <CardDescription>
          Write a compelling summary of your professional background and skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={data}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Experienced professional with a track record of..."
            className="min-h-[150px]"
          />
          <p className="text-sm text-muted-foreground">
            Aim for 3-5 sentences that highlight your most relevant skills and
            experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
