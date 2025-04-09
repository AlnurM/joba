import { useState, useEffect } from "react";
import { useResumes } from "@/entities/resume";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";

export const ResumeDropdown = ({
  onSelect,
}: {
  onSelect: (resumeId: string) => void;
}) => {
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  const { data, isLoading } = useResumes({
    page: 1,
    per_page: 100,
    status: "active",
  });

  useEffect(() => {
    if (data?.list.length === 1) {
      onSelect(data.list[0].id);
      setSelectedResume(data.list[0].filename);
    }
  }, [data, onSelect]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          @<span>{selectedResume ? selectedResume : "Add CV context"}</span>
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
              onClick={() => {
                setSelectedResume(resume.filename);
                onSelect(resume.id);
              }}
            >
              {resume.filename}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
