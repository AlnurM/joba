"use client";

import { useState } from "react";
import { SuggestionsPanel } from "@/features/resume-suggestions";
import { ResumeChat } from "@/features/resume-chat";
import type { CVData } from "@/entities/resume";
import { defaultCVData } from "@/entities/resume";
import {
  PersonalInfoSection,
  ContactInfoSection,
  SummarySection,
  EducationSection,
  WorkExperienceSection,
  SkillsSection,
  ProjectsSection,
  PublicationsSection,
  AwardsSection,
  VolunteeringSection,
  InterestsSection,
  ReferencesSection,
  CustomSectionsSection,
} from "@/entities/resume/sections";
import {
  Button,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";

export function ResumePage() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);

  const handleSave = () => {
    console.log("Saving CV data:", cvData);
    // Here you would typically save to a database or export as JSON/PDF
    alert("CV data saved successfully!");
  };

  const updateCVData = (section: keyof CVData, data: any) => {
    setCVData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  return (
    <div className="flex h-screen">
      {/* CV Editor sections */}
      <div className="w-full lg:w-2/3 h-full">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            <PersonalInfoSection
              data={cvData.personal_info}
              onChange={(data) => updateCVData("personal_info", data)}
            />
            <ContactInfoSection
              data={cvData.contact_info}
              onChange={(data) => updateCVData("contact_info", data)}
            />
            <SummarySection
              data={cvData.summary}
              onChange={(data) => updateCVData("summary", data)}
            />
            <EducationSection
              data={cvData.education}
              onChange={(data) => updateCVData("education", data)}
            />
            <WorkExperienceSection
              data={cvData.work_experience}
              onChange={(data) => updateCVData("work_experience", data)}
            />
            <SkillsSection
              data={cvData.skills}
              onChange={(data) => updateCVData("skills", data)}
            />
            <ProjectsSection
              data={cvData.projects}
              onChange={(data) => updateCVData("projects", data)}
            />
            <PublicationsSection
              data={cvData.publications}
              onChange={(data) => updateCVData("publications", data)}
            />
            <AwardsSection
              data={cvData.awards}
              onChange={(data) => updateCVData("awards", data)}
            />
            <VolunteeringSection
              data={cvData.volunteering}
              onChange={(data) => updateCVData("volunteering", data)}
            />
            <InterestsSection
              data={cvData.interests}
              onChange={(data) => updateCVData("interests", data)}
            />
            <ReferencesSection
              data={cvData.references}
              onChange={(data) => updateCVData("references", data)}
            />
            <CustomSectionsSection
              data={cvData.custom_sections}
              onChange={(data) => updateCVData("custom_sections", data)}
            />

            <div className="flex justify-end gap-4 pt-4 pb-10">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSave}>Save CV</Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Combined Suggestions and Chat panel */}
      <div className="hidden lg:block lg:w-1/3 border-l h-full">
        <Tabs defaultValue="suggestions" className="h-full flex flex-col">
          <TabsList className="w-full justify-start px-4 py-2 rounded-none border-b">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="chat">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="flex-1 m-0 p-0">
            <SuggestionsPanel cvData={cvData} />
          </TabsContent>

          <TabsContent value="chat" className="flex-1 m-0 p-0">
            <ResumeChat />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
