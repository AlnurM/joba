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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import type { CustomSection } from "../model/types";

interface CustomSectionsSectionProps {
  data: CustomSection[];
  onChange: (data: CustomSection[]) => void;
}

export function CustomSectionsSection({
  data,
  onChange,
}: CustomSectionsSectionProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSection = () => {
    if (newSectionName.trim()) {
      const newSection: CustomSection = {
        section_name: newSectionName.trim(),
        items: [],
      };
      onChange([...data, newSection]);
      setNewSectionName("");
      setIsDialogOpen(false);

      // Expand the newly added section
      const newSectionId = `section-${data.length}`;
      setExpandedSections([...expandedSections, newSectionId]);
    }
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = [...data];
    updatedSections.splice(index, 1);
    onChange(updatedSections);
  };

  const handleUpdateSectionName = (index: number, name: string) => {
    const updatedSections = [...data];
    updatedSections[index] = {
      ...updatedSections[index],
      section_name: name,
    };
    onChange(updatedSections);
  };

  const handleAddItem = (sectionIndex: number) => {
    const updatedSections = [...data];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      items: [...updatedSections[sectionIndex].items, {}],
    };
    onChange(updatedSections);

    // Expand the newly added item
    const newItemId = `section-${sectionIndex}-item-${data[sectionIndex].items.length}`;
    setExpandedItems([...expandedItems, newItemId]);
  };

  const handleRemoveItem = (sectionIndex: number, itemIndex: number) => {
    const updatedSections = [...data];
    const updatedItems = [...updatedSections[sectionIndex].items];
    updatedItems.splice(itemIndex, 1);
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      items: updatedItems,
    };
    onChange(updatedSections);
  };

  const handleUpdateItem = (
    sectionIndex: number,
    itemIndex: number,
    field: string,
    value: any,
  ) => {
    const updatedSections = [...data];
    const updatedItems = [...updatedSections[sectionIndex].items];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      [field]: value,
    };
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      items: updatedItems,
    };
    onChange(updatedSections);
  };

  const handleToggleSectionExpand = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const handleToggleItemExpand = (itemId: string) => {
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
          <CardTitle>Custom Sections</CardTitle>
          <CardDescription>Add custom sections to your CV</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus size={16} />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Section</DialogTitle>
              <DialogDescription>
                Create a new custom section for your CV
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="section-name">Section Name</Label>
                <Input
                  id="section-name"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="e.g., Patents, Conferences, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSection}>Add Section</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No custom sections added yet. Click "Add Section" to get started.
          </div>
        ) : (
          <Accordion
            type="multiple"
            value={expandedSections}
            className="space-y-6"
          >
            {data.map((section, sectionIndex) => (
              <AccordionItem
                key={sectionIndex}
                value={`section-${sectionIndex}`}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    <Input
                      value={section.section_name}
                      onChange={(e) =>
                        handleUpdateSectionName(sectionIndex, e.target.value)
                      }
                      className="font-medium border-0 p-0 h-auto text-lg focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleToggleSectionExpand(`section-${sectionIndex}`)
                      }
                    >
                      {expandedSections.includes(`section-${sectionIndex}`) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveSection(sectionIndex)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                <AccordionContent className="pt-4">
                  <div className="flex justify-end mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddItem(sectionIndex)}
                      className="flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Item
                    </Button>
                  </div>

                  {section.items.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No items added yet. Click "Add Item" to get started.
                    </div>
                  ) : (
                    <Accordion
                      type="multiple"
                      value={expandedItems}
                      className="space-y-4"
                    >
                      {section.items.map((item, itemIndex) => {
                        const itemId = `section-${sectionIndex}-item-${itemIndex}`;
                        const itemKeys = Object.keys(item).filter(
                          (key) => key !== "id",
                        );

                        return (
                          <AccordionItem
                            key={itemIndex}
                            value={itemId}
                            className="border rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium">
                                {Object.keys(item).length > 0
                                  ? `Item ${itemIndex + 1}: ${Object.values(item)[0]}`
                                  : `Item ${itemIndex + 1}`}
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleToggleItemExpand(itemId)}
                                >
                                  {expandedItems.includes(itemId) ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )}
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() =>
                                    handleRemoveItem(sectionIndex, itemIndex)
                                  }
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>

                            <AccordionContent className="pt-4">
                              <div className="space-y-4">
                                {/* Dynamic fields based on the first item's structure */}
                                {sectionIndex === 0 &&
                                itemIndex === 0 &&
                                section.items[0] &&
                                Object.keys(section.items[0]).length === 0 ? (
                                  <>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`item-${sectionIndex}-${itemIndex}-field1`}
                                      >
                                        Field 1
                                      </Label>
                                      <Input
                                        id={`item-${sectionIndex}-${itemIndex}-field1`}
                                        value={item.field1 || ""}
                                        onChange={(e) =>
                                          handleUpdateItem(
                                            sectionIndex,
                                            itemIndex,
                                            "field1",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Add a value"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`item-${sectionIndex}-${itemIndex}-field2`}
                                      >
                                        Field 2
                                      </Label>
                                      <Input
                                        id={`item-${sectionIndex}-${itemIndex}-field2`}
                                        value={item.field2 || ""}
                                        onChange={(e) =>
                                          handleUpdateItem(
                                            sectionIndex,
                                            itemIndex,
                                            "field2",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Add a value"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  // If we have a structure from the first item, use it as a template
                                  <>
                                    {/* Get field names from the first item or use existing keys */}
                                    {(itemKeys.length > 0
                                      ? itemKeys
                                      : section.items[0] &&
                                          Object.keys(section.items[0]).length >
                                            0
                                        ? Object.keys(section.items[0])
                                        : ["title", "description", "date"]
                                    ).map((field, fieldIndex) => (
                                      <div
                                        key={fieldIndex}
                                        className="space-y-2"
                                      >
                                        <Label
                                          htmlFor={`item-${sectionIndex}-${itemIndex}-${field}`}
                                        >
                                          {field.charAt(0).toUpperCase() +
                                            field.slice(1).replace(/_/g, " ")}
                                        </Label>
                                        <Input
                                          id={`item-${sectionIndex}-${itemIndex}-${field}`}
                                          value={item[field] || ""}
                                          onChange={(e) =>
                                            handleUpdateItem(
                                              sectionIndex,
                                              itemIndex,
                                              field,
                                              e.target.value,
                                            )
                                          }
                                          placeholder={`Add ${field.replace(/_/g, " ")}`}
                                        />
                                      </div>
                                    ))}
                                  </>
                                )}

                                {/* Add field button */}
                                <div className="pt-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                      >
                                        <Plus size={16} />
                                        Add Field
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          Add Custom Field
                                        </DialogTitle>
                                        <DialogDescription>
                                          Add a new field to this item
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="field-name">
                                            Field Name
                                          </Label>
                                          <Input
                                            id="field-name"
                                            placeholder="e.g., patent_number, conference_name, etc."
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline">
                                          Cancel
                                        </Button>
                                        <Button>Add Field</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
