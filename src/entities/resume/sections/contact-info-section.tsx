"use client";

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
} from "@/shared/ui";
import { Trash2, Plus } from "lucide-react";
import type { ContactInfo, SocialProfile } from "../model/types";

interface ContactInfoSectionProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

export function ContactInfoSection({
  data,
  onChange,
}: ContactInfoSectionProps) {
  const handleChange = (field: keyof ContactInfo, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleAddressChange = (
    field: keyof typeof data.address,
    value: string,
  ) => {
    onChange({
      ...data,
      address: {
        ...data.address,
        [field]: value,
      },
    });
  };

  const handleSocialProfileChange = (
    index: number,
    field: keyof SocialProfile,
    value: string,
  ) => {
    const updatedProfiles = [...data.social_profiles];
    updatedProfiles[index] = {
      ...updatedProfiles[index],
      [field]: value,
    };
    handleChange("social_profiles", updatedProfiles);
  };

  const handleAddSocialProfile = () => {
    handleChange("social_profiles", [
      ...data.social_profiles,
      { network: "", url: "" },
    ]);
  };

  const handleRemoveSocialProfile = (index: number) => {
    const updatedProfiles = [...data.social_profiles];
    updatedProfiles.splice(index, 1);
    handleChange("social_profiles", updatedProfiles);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          How can potential employers reach you?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                value={data.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={data.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={data.address.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input
                id="postal_code"
                value={data.address.postal_code}
                onChange={(e) =>
                  handleAddressChange("postal_code", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={data.address.country}
                onChange={(e) => handleAddressChange("country", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Social Profiles</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddSocialProfile}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              Add Profile
            </Button>
          </div>

          {data.social_profiles.map((profile, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
            >
              <div className="space-y-2">
                <Label htmlFor={`network-${index}`}>Network</Label>
                <Select
                  value={profile.network}
                  onValueChange={(value) =>
                    handleSocialProfileChange(index, "network", value)
                  }
                >
                  <SelectTrigger id={`network-${index}`}>
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`url-${index}`}>URL</Label>
                <div className="flex gap-2">
                  <Input
                    id={`url-${index}`}
                    value={profile.url}
                    onChange={(e) =>
                      handleSocialProfileChange(index, "url", e.target.value)
                    }
                    className="flex-1"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveSocialProfile(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
