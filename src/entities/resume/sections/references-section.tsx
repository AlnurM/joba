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
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/shared/ui";
import type { Reference } from "../model/types";

interface ReferencesSectionProps {
  data: Reference[];
  onChange: (data: Reference[]) => void;
}

export function ReferencesSection({ data, onChange }: ReferencesSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleChange = (index: number, field: keyof Reference, value: any) => {
    const updatedReferences = [...data];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value,
    };
    onChange(updatedReferences);
  };

  const handleAddReference = () => {
    const newReference: Reference = {
      name: "",
      position: "",
    };
    onChange([...data, newReference]);

    // Expand the newly added item
    const newItemId = `reference-${data.length}`;
    setExpandedItems([...expandedItems, newItemId]);
  };

  const handleRemoveReference = (index: number) => {
    const updatedReferences = [...data];
    updatedReferences.splice(index, 1);
    onChange(updatedReferences);
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
          <CardTitle>References</CardTitle>
          <CardDescription>
            Add professional references who can vouch for your skills and
            experience
          </CardDescription>
        </div>
        <Button
          onClick={handleAddReference}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Reference
        </Button>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No references added yet. Click "Add Reference" to get started.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={expandedItems}
            className="space-y-4"
          >
            {data.map((reference, index) => (
              <AccordionItem
                key={index}
                value={`reference-${index}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {reference.name || "New Reference"}
                    {reference.position && ` - ${reference.position}`}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleExpand(`reference-${index}`)}
                    >
                      {expandedItems.includes(`reference-${index}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveReference(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`reference-name-${index}`}>Name</Label>
                      <Input
                        id={`reference-name-${index}`}
                        value={reference.name}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`reference-position-${index}`}>
                        Position
                      </Label>
                      <Input
                        id={`reference-position-${index}`}
                        value={reference.position}
                        onChange={(e) =>
                          handleChange(index, "position", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`reference-email-${index}`}>Email</Label>
                      <Input
                        id={`reference-email-${index}`}
                        type="email"
                        value={reference.email || ""}
                        onChange={(e) =>
                          handleChange(index, "email", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`reference-phone-${index}`}>Phone</Label>
                      <Input
                        id={`reference-phone-${index}`}
                        type="tel"
                        value={reference.phone || ""}
                        onChange={(e) =>
                          handleChange(index, "phone", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`reference-relationship-${index}`}>
                        Relationship
                      </Label>
                      <Input
                        id={`reference-relationship-${index}`}
                        value={reference.relationship || ""}
                        onChange={(e) =>
                          handleChange(index, "relationship", e.target.value)
                        }
                        placeholder="e.g., Former Manager, Colleague, etc."
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
