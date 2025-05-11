"use client";

import { useState } from "react";
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
  Textarea,
  Checkbox,
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/shared/ui";
import type { WorkExperience } from "../model/types";

interface WorkExperienceSectionProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export function WorkExperienceSection({
  data,
  onChange,
}: WorkExperienceSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleChange = (
    index: number,
    field: keyof WorkExperience,
    value: any,
  ) => {
    const updatedExperience = [...data];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    onChange(updatedExperience);
  };

  const handleAddExperience = () => {
    const newExperience: WorkExperience = {
      company: "",
      position: "",
      start_date: "",
      is_current: false,
    };
    onChange([...data, newExperience]);

    // Expand the newly added item
    const newItemId = `experience-${data.length}`;
    setExpandedItems([...expandedItems, newItemId]);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...data];
    updatedExperience.splice(index, 1);
    onChange(updatedExperience);
  };

  const handleAchievementsChange = (
    index: number,
    achievementsText: string,
  ) => {
    const achievements = achievementsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    handleChange(index, "achievements", achievements);
  };

  const handleSkillsUsedChange = (index: number, skillsText: string) => {
    const skills = skillsText
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    handleChange(index, "skills_used", skills);
  };

  const handleToggleExpand = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Add your professional experience</CardDescription>
        </div>
        <Button
          onClick={handleAddExperience}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No work experience entries yet. Click "Add Experience" to get
            started.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={expandedItems}
            className="space-y-4"
          >
            {data.map((experience, index) => (
              <AccordionItem
                key={index}
                value={`experience-${index}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {experience.position || "New Position"}
                    {experience.company && ` at ${experience.company}`}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleExpand(`experience-${index}`)}
                    >
                      {expandedItems.includes(`experience-${index}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveExperience(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input
                        id={`company-${index}`}
                        value={experience.company}
                        onChange={(e) =>
                          handleChange(index, "company", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`position-${index}`}>Position</Label>
                      <Input
                        id={`position-${index}`}
                        value={experience.position}
                        onChange={(e) =>
                          handleChange(index, "position", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input
                        id={`location-${index}`}
                        value={experience.location || ""}
                        onChange={(e) =>
                          handleChange(index, "location", e.target.value)
                        }
                        placeholder="City, State, Country"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                      <Input
                        id={`start-date-${index}`}
                        type="date"
                        value={experience.start_date}
                        onChange={(e) =>
                          handleChange(index, "start_date", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`end-date-${index}`}>End Date</Label>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`is-current-${index}`}
                            checked={experience.is_current}
                            onCheckedChange={(checked) =>
                              handleChange(index, "is_current", checked)
                            }
                          />
                          <Label
                            htmlFor={`is-current-${index}`}
                            className="text-sm"
                          >
                            Current
                          </Label>
                        </div>
                      </div>
                      <Input
                        id={`end-date-${index}`}
                        type="date"
                        value={experience.end_date || ""}
                        onChange={(e) =>
                          handleChange(index, "end_date", e.target.value)
                        }
                        disabled={experience.is_current}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={experience.description || ""}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      placeholder="Describe your role and responsibilities"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`achievements-${index}`}>
                      Achievements
                    </Label>
                    <Textarea
                      id={`achievements-${index}`}
                      value={(experience.achievements || []).join("\n")}
                      onChange={(e) =>
                        handleAchievementsChange(index, e.target.value)
                      }
                      placeholder="List your key achievements, one per line"
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter each achievement on a new line
                    </p>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`skills-${index}`}>Skills Used</Label>
                    <Input
                      id={`skills-${index}`}
                      value={(experience.skills_used || []).join(", ")}
                      onChange={(e) =>
                        handleSkillsUsedChange(index, e.target.value)
                      }
                      placeholder="Java, Python, Leadership, etc."
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter skills separated by commas
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
