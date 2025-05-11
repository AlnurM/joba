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
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/shared/ui";
import type { Volunteering } from "../model/types";

interface VolunteeringSectionProps {
  data: Volunteering[];
  onChange: (data: Volunteering[]) => void;
}

export function VolunteeringSection({
  data,
  onChange,
}: VolunteeringSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleChange = (
    index: number,
    field: keyof Volunteering,
    value: any,
  ) => {
    const updatedVolunteering = [...data];
    updatedVolunteering[index] = {
      ...updatedVolunteering[index],
      [field]: value,
    };
    onChange(updatedVolunteering);
  };

  const handleAddVolunteering = () => {
    const newVolunteering: Volunteering = {
      organization: "",
      role: "",
      start_date: "",
    };
    onChange([...data, newVolunteering]);

    // Expand the newly added item
    const newItemId = `volunteering-${data.length}`;
    setExpandedItems([...expandedItems, newItemId]);
  };

  const handleRemoveVolunteering = (index: number) => {
    const updatedVolunteering = [...data];
    updatedVolunteering.splice(index, 1);
    onChange(updatedVolunteering);
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
          <CardTitle>Volunteering</CardTitle>
          <CardDescription>Add your volunteer experience</CardDescription>
        </div>
        <Button
          onClick={handleAddVolunteering}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Volunteering
        </Button>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No volunteering entries yet. Click "Add Volunteering" to get
            started.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={expandedItems}
            className="space-y-4"
          >
            {data.map((volunteering, index) => (
              <AccordionItem
                key={index}
                value={`volunteering-${index}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {volunteering.role || "New Role"}
                    {volunteering.organization &&
                      ` at ${volunteering.organization}`}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleToggleExpand(`volunteering-${index}`)
                      }
                    >
                      {expandedItems.includes(`volunteering-${index}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveVolunteering(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`volunteering-org-${index}`}>
                        Organization
                      </Label>
                      <Input
                        id={`volunteering-org-${index}`}
                        value={volunteering.organization}
                        onChange={(e) =>
                          handleChange(index, "organization", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`volunteering-role-${index}`}>Role</Label>
                      <Input
                        id={`volunteering-role-${index}`}
                        value={volunteering.role}
                        onChange={(e) =>
                          handleChange(index, "role", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`volunteering-start-date-${index}`}>
                        Start Date
                      </Label>
                      <Input
                        id={`volunteering-start-date-${index}`}
                        type="date"
                        value={volunteering.start_date}
                        onChange={(e) =>
                          handleChange(index, "start_date", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`volunteering-end-date-${index}`}>
                        End Date
                      </Label>
                      <Input
                        id={`volunteering-end-date-${index}`}
                        type="date"
                        value={volunteering.end_date || ""}
                        onChange={(e) =>
                          handleChange(index, "end_date", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`volunteering-description-${index}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`volunteering-description-${index}`}
                        value={volunteering.description || ""}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        placeholder="Describe your volunteer work and impact"
                      />
                    </div>
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
