"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Link from "next/link";
import { useDebounce, useAuth, authApi } from "@/entities/auth";
import { AuthResponse } from "@/entities/auth";

export default function SignUpPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState({
    email: false,
    username: false,
  });

  const debouncedEmail = useDebounce(formData.email, 1000);
  const debouncedUsername = useDebounce(formData.username, 1000);

  const checkAvailability = async (
    field: "email" | "username",
    value: string,
  ) => {
    if (!value) return;

    setChecking((prev) => ({ ...prev, [field]: true }));
    try {
      const data = await authApi.checkAvailability(field, value);

      if (!data.is_available) {
        setErrors((prev) => ({
          ...prev,
          [field]: data.message || `${field} is already taken`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    } catch (e) {
      console.log(e);
      setErrors((prev) => ({
        ...prev,
        [field]: "Error checking availability",
      }));
    } finally {
      setChecking((prev) => ({ ...prev, [field]: false }));
    }
  };

  useEffect(() => {
    if (debouncedEmail) {
      checkAvailability("email", debouncedEmail);
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (debouncedUsername) {
      checkAvailability("username", debouncedUsername);
    }
  }, [debouncedUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, general: "" }));
    setLoading(true);

    try {
      const data: AuthResponse = await authApi.signup(
        formData.email,
        formData.username,
        formData.password,
      );
      login(data);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general:
          err instanceof Error
            ? err.message
            : "An error occurred during registration",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={checking.email}
              />
              {checking.email && (
                <p className="text-sm text-gray-500">Checking...</p>
              )}
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                disabled={checking.username}
              />
              {checking.username && (
                <p className="text-sm text-gray-500">Checking...</p>
              )}
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            {errors.general && (
              <p className="text-sm text-red-500">{errors.general}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
