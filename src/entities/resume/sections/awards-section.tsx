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
import type { Award } from "../model/types";

interface AwardsSectionProps {
  data: Award[];
  onChange: (data: Award[]) => void;
}

export function AwardsSection({ data, onChange }: AwardsSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleChange = (index: number, field: keyof Award, value: any) => {
    const updatedAwards = [...data];
    updatedAwards[index] = {
      ...updatedAwards[index],
      [field]: value,
    };
    onChange(updatedAwards);
  };

  const handleAddAward = () => {
    const newAward: Award = {
      title: "",
      issuer: "",
      date: "",
    };
    onChange([...data, newAward]);

    // Expand the newly added item
    const newItemId = `award-${data.length}`;
    setExpandedItems([...expandedItems, newItemId]);
  };

  const handleRemoveAward = (index: number) => {
    const updatedAwards = [...data];
    updatedAwards.splice(index, 1);
    onChange(updatedAwards);
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
          <CardTitle>Awards & Honors</CardTitle>
          <CardDescription>
            Add your awards, honors, and recognitions
          </CardDescription>
        </div>
        <Button onClick={handleAddAward} className="flex items-center gap-1">
          <Plus size={16} />
          Add Award
        </Button>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No awards added yet. Click "Add Award" to get started.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={expandedItems}
            className="space-y-4"
          >
            {data.map((award, index) => (
              <AccordionItem
                key={index}
                value={`award-${index}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {award.title || "New Award"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleExpand(`award-${index}`)}
                    >
                      {expandedItems.includes(`award-${index}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveAward(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`award-title-${index}`}>
                        Award Title
                      </Label>
                      <Input
                        id={`award-title-${index}`}
                        value={award.title}
                        onChange={(e) =>
                          handleChange(index, "title", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`award-issuer-${index}`}>Issuer</Label>
                      <Input
                        id={`award-issuer-${index}`}
                        value={award.issuer}
                        onChange={(e) =>
                          handleChange(index, "issuer", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`award-date-${index}`}>Date</Label>
                      <Input
                        id={`award-date-${index}`}
                        type="date"
                        value={award.date}
                        onChange={(e) =>
                          handleChange(index, "date", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`award-description-${index}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`award-description-${index}`}
                        value={award.description || ""}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        placeholder="Describe the award and why you received it"
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
