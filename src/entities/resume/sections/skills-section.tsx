"use client";

import { Trash2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import type {
  Skills,
  TechnicalSkill,
  Certification,
  Language,
} from "../model/types";

interface SkillsSectionProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const handleChange = <K extends keyof Skills>(field: K, value: Skills[K]) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Technical Skills
  const handleAddTechnicalSkill = () => {
    handleChange("technical", [
      ...data.technical,
      { name: "", level: "beginner" },
    ]);
  };

  const handleUpdateTechnicalSkill = (
    index: number,
    field: keyof TechnicalSkill,
    value: any,
  ) => {
    const updatedSkills = [...data.technical];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };
    handleChange("technical", updatedSkills);
  };

  const handleRemoveTechnicalSkill = (index: number) => {
    const updatedSkills = [...data.technical];
    updatedSkills.splice(index, 1);
    handleChange("technical", updatedSkills);
  };

  // Soft Skills
  const handleSoftSkillsChange = (skillsText: string) => {
    const skills = skillsText
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    handleChange("soft", skills);
  };

  // Certifications
  const handleAddCertification = () => {
    handleChange("certifications", [
      ...data.certifications,
      { name: "", issuer: "", issue_date: "" },
    ]);
  };

  const handleUpdateCertification = (
    index: number,
    field: keyof Certification,
    value: any,
  ) => {
    const updatedCertifications = [...data.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    handleChange("certifications", updatedCertifications);
  };

  const handleRemoveCertification = (index: number) => {
    const updatedCertifications = [...data.certifications];
    updatedCertifications.splice(index, 1);
    handleChange("certifications", updatedCertifications);
  };

  // Languages
  const handleAddLanguage = () => {
    handleChange("languages", [
      ...data.languages,
      { name: "", proficiency: "beginner" },
    ]);
  };

  const handleUpdateLanguage = (
    index: number,
    field: keyof Language,
    value: any,
  ) => {
    const updatedLanguages = [...data.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    };
    handleChange("languages", updatedLanguages);
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = [...data.languages];
    updatedLanguages.splice(index, 1);
    handleChange("languages", updatedLanguages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          Showcase your technical and soft skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="technical" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="soft">Soft Skills</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
          </TabsList>

          {/* Technical Skills */}
          <TabsContent value="technical">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Technical Skills</h3>
              <Button
                onClick={handleAddTechnicalSkill}
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Add Skill
              </Button>
            </div>

            {data.technical.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No technical skills added yet. Click "Add Skill" to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {data.technical.map((skill, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border p-4 rounded-md"
                  >
                    <div className="space-y-2">
                      <Label htmlFor={`skill-name-${index}`}>Skill</Label>
                      <Input
                        id={`skill-name-${index}`}
                        value={skill.name}
                        onChange={(e) =>
                          handleUpdateTechnicalSkill(
                            index,
                            "name",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Python"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`skill-level-${index}`}>Level</Label>
                      <Select
                        value={skill.level || "beginner"}
                        onValueChange={(value) =>
                          handleUpdateTechnicalSkill(index, "level", value)
                        }
                      >
                        <SelectTrigger id={`skill-level-${index}`}>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`skill-years-${index}`}>
                        Years of Experience
                      </Label>
                      <Input
                        id={`skill-years-${index}`}
                        type="number"
                        min="0"
                        value={skill.years_of_experience || ""}
                        onChange={(e) =>
                          handleUpdateTechnicalSkill(
                            index,
                            "years_of_experience",
                            Number.parseInt(e.target.value) || "",
                          )
                        }
                      />
                    </div>

                    <div className="flex items-end">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveTechnicalSkill(index)}
                        className="ml-auto"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Soft Skills */}
          <TabsContent value="soft">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Soft Skills</h3>
              <div className="space-y-2">
                <Label htmlFor="soft-skills">Skills</Label>
                <Input
                  id="soft-skills"
                  value={data.soft.join(", ")}
                  onChange={(e) => handleSoftSkillsChange(e.target.value)}
                  placeholder="Leadership, Communication, Teamwork, etc."
                />
                <p className="text-sm text-muted-foreground">
                  Enter skills separated by commas
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Certifications */}
          <TabsContent value="certifications">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Certifications</h3>
              <Button
                onClick={handleAddCertification}
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Add Certification
              </Button>
            </div>

            {data.certifications.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No certifications added yet. Click "Add Certification" to get
                started.
              </div>
            ) : (
              <div className="space-y-4">
                {data.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md"
                  >
                    <div className="space-y-2">
                      <Label htmlFor={`cert-name-${index}`}>
                        Certification Name
                      </Label>
                      <Input
                        id={`cert-name-${index}`}
                        value={cert.name}
                        onChange={(e) =>
                          handleUpdateCertification(
                            index,
                            "name",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
                      <Input
                        id={`cert-issuer-${index}`}
                        value={cert.issuer}
                        onChange={(e) =>
                          handleUpdateCertification(
                            index,
                            "issuer",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`cert-issue-date-${index}`}>
                        Issue Date
                      </Label>
                      <Input
                        id={`cert-issue-date-${index}`}
                        type="date"
                        value={cert.issue_date}
                        onChange={(e) =>
                          handleUpdateCertification(
                            index,
                            "issue_date",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`cert-expiry-date-${index}`}>
                        Expiry Date
                      </Label>
                      <Input
                        id={`cert-expiry-date-${index}`}
                        type="date"
                        value={cert.expiry_date || ""}
                        onChange={(e) =>
                          handleUpdateCertification(
                            index,
                            "expiry_date",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`cert-id-${index}`}>Certificate ID</Label>
                      <Input
                        id={`cert-id-${index}`}
                        value={cert.certificate_id || ""}
                        onChange={(e) =>
                          handleUpdateCertification(
                            index,
                            "certificate_id",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="flex justify-end md:col-span-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveCertification(index)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Languages */}
          <TabsContent value="languages">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Languages</h3>
              <Button
                onClick={handleAddLanguage}
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Add Language
              </Button>
            </div>

            {data.languages.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No languages added yet. Click "Add Language" to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {data.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border p-4 rounded-md"
                  >
                    <div className="space-y-2">
                      <Label htmlFor={`lang-name-${index}`}>Language</Label>
                      <Input
                        id={`lang-name-${index}`}
                        value={lang.name}
                        onChange={(e) =>
                          handleUpdateLanguage(index, "name", e.target.value)
                        }
                        placeholder="e.g., English"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`lang-proficiency-${index}`}>
                        Proficiency
                      </Label>
                      <Select
                        value={lang.proficiency}
                        onValueChange={(value) =>
                          handleUpdateLanguage(index, "proficiency", value)
                        }
                      >
                        <SelectTrigger id={`lang-proficiency-${index}`}>
                          <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="fluent">Fluent</SelectItem>
                          <SelectItem value="native">Native</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end md:col-span-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveLanguage(index)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
