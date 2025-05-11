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
import type { Project } from "../model/types";

interface ProjectsSectionProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export function ProjectsSection({ data, onChange }: ProjectsSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleChange = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...data];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    onChange(updatedProjects);
  };

  const handleAddProject = () => {
    const newProject: Project = {
      name: "",
      start_date: "",
      is_current: false,
      description: "",
      technologies: [],
    };
    onChange([...data, newProject]);

    // Expand the newly added item
    const newItemId = `project-${data.length}`;
    setExpandedItems([...expandedItems, newItemId]);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...data];
    updatedProjects.splice(index, 1);
    onChange(updatedProjects);
  };

  const handleTechnologiesChange = (index: number, techsText: string) => {
    const techs = techsText
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
    handleChange(index, "technologies", techs);
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
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            Showcase your personal or professional projects
          </CardDescription>
        </div>
        <Button onClick={handleAddProject} className="flex items-center gap-1">
          <Plus size={16} />
          Add Project
        </Button>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No projects added yet. Click "Add Project" to get started.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={expandedItems}
            className="space-y-4"
          >
            {data.map((project, index) => (
              <AccordionItem
                key={index}
                value={`project-${index}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {project.name || "New Project"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleExpand(`project-${index}`)}
                    >
                      {expandedItems.includes(`project-${index}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveProject(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`project-name-${index}`}>
                        Project Name
                      </Label>
                      <Input
                        id={`project-name-${index}`}
                        value={project.name}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`project-role-${index}`}>Your Role</Label>
                      <Input
                        id={`project-role-${index}`}
                        value={project.role || ""}
                        onChange={(e) =>
                          handleChange(index, "role", e.target.value)
                        }
                        placeholder="e.g., Lead Developer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`project-start-date-${index}`}>
                        Start Date
                      </Label>
                      <Input
                        id={`project-start-date-${index}`}
                        type="date"
                        value={project.start_date}
                        onChange={(e) =>
                          handleChange(index, "start_date", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`project-end-date-${index}`}>
                          End Date
                        </Label>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`project-is-current-${index}`}
                            checked={project.is_current}
                            onCheckedChange={(checked) =>
                              handleChange(index, "is_current", checked)
                            }
                          />
                          <Label
                            htmlFor={`project-is-current-${index}`}
                            className="text-sm"
                          >
                            Current
                          </Label>
                        </div>
                      </div>
                      <Input
                        id={`project-end-date-${index}`}
                        type="date"
                        value={project.end_date || ""}
                        onChange={(e) =>
                          handleChange(index, "end_date", e.target.value)
                        }
                        disabled={project.is_current}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`project-url-${index}`}>
                        Project URL
                      </Label>
                      <Input
                        id={`project-url-${index}`}
                        type="url"
                        value={project.url || ""}
                        onChange={(e) =>
                          handleChange(index, "url", e.target.value)
                        }
                        placeholder="https://github.com/yourusername/project"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`project-description-${index}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`project-description-${index}`}
                      value={project.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      placeholder="Describe the project, your contributions, and its impact"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`project-technologies-${index}`}>
                      Technologies Used
                    </Label>
                    <Input
                      id={`project-technologies-${index}`}
                      value={project.technologies.join(", ")}
                      onChange={(e) =>
                        handleTechnologiesChange(index, e.target.value)
                      }
                      placeholder="React, Node.js, MongoDB, etc."
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter technologies separated by commas
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
