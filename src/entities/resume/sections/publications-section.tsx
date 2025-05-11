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
import type { Publication } from "../model/types";

interface PublicationsSectionProps {
  data: Publication[];
  onChange: (data: Publication[]) => void;
}

export function PublicationsSection({
  data,
  onChange,
}: PublicationsSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleChange = (
    index: number,
    field: keyof Publication,
    value: any,
  ) => {
    const updatedPublications = [...data];
    updatedPublications[index] = {
      ...updatedPublications[index],
      [field]: value,
    };
    onChange(updatedPublications);
  };

  const handleAddPublication = () => {
    const newPublication: Publication = {
      title: "",
      publisher: "",
      publication_date: "",
      authors: [],
    };
    onChange([...data, newPublication]);

    // Expand the newly added item
    const newItemId = `publication-${data.length}`;
    setExpandedItems([...expandedItems, newItemId]);
  };

  const handleRemovePublication = (index: number) => {
    const updatedPublications = [...data];
    updatedPublications.splice(index, 1);
    onChange(updatedPublications);
  };

  const handleAuthorsChange = (index: number, authorsText: string) => {
    const authors = authorsText
      .split(",")
      .map((author) => author.trim())
      .filter(Boolean);
    handleChange(index, "authors", authors);
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
          <CardTitle>Publications</CardTitle>
          <CardDescription>
            Add your research papers, articles, or books
          </CardDescription>
        </div>
        <Button
          onClick={handleAddPublication}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Publication
        </Button>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No publications added yet. Click "Add Publication" to get started.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={expandedItems}
            className="space-y-4"
          >
            {data.map((publication, index) => (
              <AccordionItem
                key={index}
                value={`publication-${index}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {publication.title || "New Publication"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleExpand(`publication-${index}`)}
                    >
                      {expandedItems.includes(`publication-${index}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemovePublication(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`publication-title-${index}`}>
                        Title
                      </Label>
                      <Input
                        id={`publication-title-${index}`}
                        value={publication.title}
                        onChange={(e) =>
                          handleChange(index, "title", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`publication-publisher-${index}`}>
                        Publisher
                      </Label>
                      <Input
                        id={`publication-publisher-${index}`}
                        value={publication.publisher}
                        onChange={(e) =>
                          handleChange(index, "publisher", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`publication-date-${index}`}>
                        Publication Date
                      </Label>
                      <Input
                        id={`publication-date-${index}`}
                        type="date"
                        value={publication.publication_date}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "publication_date",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`publication-url-${index}`}>URL</Label>
                      <Input
                        id={`publication-url-${index}`}
                        type="url"
                        value={publication.url || ""}
                        onChange={(e) =>
                          handleChange(index, "url", e.target.value)
                        }
                        placeholder="https://doi.org/..."
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`publication-authors-${index}`}>
                        Authors
                      </Label>
                      <Input
                        id={`publication-authors-${index}`}
                        value={publication.authors.join(", ")}
                        onChange={(e) =>
                          handleAuthorsChange(index, e.target.value)
                        }
                        placeholder="John Doe, Jane Smith, etc."
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter authors separated by commas
                      </p>
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
