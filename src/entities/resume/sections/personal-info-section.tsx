"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import type { PersonalInfo } from "../model/types";

interface PersonalInfoSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoSection({
  data,
  onChange,
}: PersonalInfoSectionProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Enter your personal details for your CV
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="prefix">Prefix</Label>
              <Select
                value={data.prefix || ""}
                onValueChange={(value) => handleChange("prefix", value)}
              >
                <SelectTrigger id="prefix">
                  <SelectValue placeholder="Select prefix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="Mr.">Mr.</SelectItem>
                  <SelectItem value="Mrs.">Mrs.</SelectItem>
                  <SelectItem value="Ms.">Ms.</SelectItem>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                  <SelectItem value="Prof.">Prof.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="suffix">Suffix</Label>
              <Select
                value={data.suffix || ""}
                onValueChange={(value) => handleChange("suffix", value)}
              >
                <SelectTrigger id="suffix">
                  <SelectValue placeholder="Select suffix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="Ph.D.">Ph.D.</SelectItem>
                  <SelectItem value="M.D.">M.D.</SelectItem>
                  <SelectItem value="MBA">MBA</SelectItem>
                  <SelectItem value="Jr.">Jr.</SelectItem>
                  <SelectItem value="Sr.">Sr.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={data.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="middle_name">Middle Name</Label>
              <Input
                id="middle_name"
                value={data.middle_name || ""}
                onChange={(e) => handleChange("middle_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={data.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={data.gender || ""}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prefer_not_to_say">
                    Prefer not to say
                  </SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth_date">Birth Date</Label>
              <Input
                id="birth_date"
                type="date"
                value={data.birth_date || ""}
                onChange={(e) => handleChange("birth_date", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={data.nationality || ""}
                onChange={(e) => handleChange("nationality", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marital_status">Marital Status</Label>
              <Select
                value={data.marital_status || ""}
                onValueChange={(value) => handleChange("marital_status", value)}
              >
                <SelectTrigger id="marital_status">
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prefer_not_to_say">
                    Prefer not to say
                  </SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
