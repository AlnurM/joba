"use client";

import { Rocket } from "lucide-react";
import { useAuth, useAuthStore } from "@/entities/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/shared/ui";

export function OnboardingModal() {
  const { updateOnboarding } = useAuth();
  const { onboarding } = useAuthStore();

  return (
    <Dialog
      open={onboarding === false}
      onOpenChange={() => updateOnboarding(true)}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to Joba Llama! 🎉
          </DialogTitle>
          <DialogDescription className="text-center pt-2 pb-4">
            Your AI-powered job application assistant that helps you find and
            apply to jobs more efficiently.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6">
          <div className="bg-primary/10 p-6 rounded-full">
            <Rocket className="h-12 w-12 text-primary" />
          </div>
          <p className="text-center">
            Joba Llama helps you create customized CVs, cover letters, and
            automates your job search process. Get started by creating your
            first application flow.
          </p>
          <Button
            size="lg"
            className="w-full"
            asChild
            onClick={() => updateOnboarding(true)}
          >
            <a href="/main/flow/create">
              <Rocket className="mr-2 h-5 w-5" />
              Create First Flow
            </a>
          </Button>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => updateOnboarding(true)}
            className="w-full"
          >
            Explore Dashboard First
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
