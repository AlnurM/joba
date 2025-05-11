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
import type { Education } from "../model/types";

interface EducationSectionProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationSection({ data, onChange }: EducationSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleChange = (index: number, field: keyof Education, value: any) => {
    const updatedEducation = [...data];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onChange(updatedEducation);
  };

  const handleAddEducation = () => {
    const newEducation: Education = {
      institution: "",
      degree: "",
      field_of_study: "",
      start_date: "",
      is_current: false,
    };
    onChange([...data, newEducation]);

    // Expand the newly added item
    const newItemId = `education-${data.length}`;
    setExpandedItems([...expandedItems, newItemId]);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...data];
    updatedEducation.splice(index, 1);
    onChange(updatedEducation);
  };

  const handleCoursesChange = (index: number, coursesText: string) => {
    const courses = coursesText
      .split(",")
      .map((course) => course.trim())
      .filter(Boolean);
    handleChange(index, "courses", courses);
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
          <CardTitle>Education</CardTitle>
          <CardDescription>Add your educational background</CardDescription>
        </div>
        <Button
          onClick={handleAddEducation}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Education
        </Button>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No education entries yet. Click "Add Education" to get started.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={expandedItems}
            className="space-y-4"
          >
            {data.map((education, index) => (
              <AccordionItem
                key={index}
                value={`education-${index}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {education.institution || "New Education Entry"}
                    {education.degree && ` - ${education.degree}`}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleExpand(`education-${index}`)}
                    >
                      {expandedItems.includes(`education-${index}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveEducation(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${index}`}>
                        Institution
                      </Label>
                      <Input
                        id={`institution-${index}`}
                        value={education.institution}
                        onChange={(e) =>
                          handleChange(index, "institution", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input
                        id={`location-${index}`}
                        value={education.location || ""}
                        onChange={(e) =>
                          handleChange(index, "location", e.target.value)
                        }
                        placeholder="City, State, Country"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        value={education.degree}
                        onChange={(e) =>
                          handleChange(index, "degree", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`field-${index}`}>Field of Study</Label>
                      <Input
                        id={`field-${index}`}
                        value={education.field_of_study}
                        onChange={(e) =>
                          handleChange(index, "field_of_study", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                      <Input
                        id={`start-date-${index}`}
                        type="date"
                        value={education.start_date}
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
                            checked={education.is_current}
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
                        value={education.end_date || ""}
                        onChange={(e) =>
                          handleChange(index, "end_date", e.target.value)
                        }
                        disabled={education.is_current}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`gpa-${index}`}>GPA</Label>
                      <Input
                        id={`gpa-${index}`}
                        type="number"
                        step="0.01"
                        min="0"
                        value={education.gpa || ""}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "gpa",
                            Number.parseFloat(e.target.value) || "",
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`max-gpa-${index}`}>Max GPA</Label>
                      <Input
                        id={`max-gpa-${index}`}
                        type="number"
                        step="0.01"
                        min="0"
                        value={education.max_gpa || ""}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "max_gpa",
                            Number.parseFloat(e.target.value) || "",
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={education.description || ""}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      placeholder="Describe your studies, achievements, etc."
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`courses-${index}`}>Courses</Label>
                    <Textarea
                      id={`courses-${index}`}
                      value={(education.courses || []).join(", ")}
                      onChange={(e) =>
                        handleCoursesChange(index, e.target.value)
                      }
                      placeholder="Relevant courses, separated by commas"
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter course names separated by commas
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
