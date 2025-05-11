"use client";

import type React from "react";
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Button,
  Badge,
} from "@/shared/ui";

interface InterestsSectionProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export function InterestsSection({ data, onChange }: InterestsSectionProps) {
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      onChange([...data, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index: number) => {
    const updatedInterests = [...data];
    updatedInterests.splice(index, 1);
    onChange(updatedInterests);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInterest();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interests</CardTitle>
        <CardDescription>
          Share your personal interests and hobbies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add an interest (e.g., Photography)"
              />
            </div>
            <Button
              onClick={handleAddInterest}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {data.length === 0 ? (
              <p className="text-muted-foreground">
                No interests added yet. Add some using the field above.
              </p>
            ) : (
              data.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5"
                >
                  {interest}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemoveInterest(index)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </Badge>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
