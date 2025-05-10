"use client";

import type React from "react";
import { MenuSidebar } from "@/widgets/sidebar";
import { OnboardingModal } from "@/features/onboarding-modal";
import { AuthGuard } from "@/entities/auth";
import { ThemeProvider, SidebarProvider, SidebarInset } from "@/shared/ui";
import "@/app/globals.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Joba Llama Admin Panel</title>
        <meta name="description" content="Joba Llama Admin Panel" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <MenuSidebar />
            <SidebarInset>
              <AuthGuard>{children}</AuthGuard>
            </SidebarInset>
          </SidebarProvider>
          <OnboardingModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
