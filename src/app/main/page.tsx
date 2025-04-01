// import { DashboardStats } from "@/components/dashboard-stats"
// import { RecentApplications } from "@/components/recent-applications"
import {
  SidebarTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import {
  Pause,
  Play,
  RefreshCw,
  FileText,
  PenLine,
  Search,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back to Joba Llama
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">Refresh</span>
          </Button>
          <Button variant="outline" size="sm">
            <Pause className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">Pause Automation</span>
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">Resume</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6">
        {/* <DashboardStats /> */}

        <div className="grid gap-6 md:grid-cols-2">
          {/* <RecentApplications /> */}

          <Card>
            <CardHeader>
              <CardTitle>AI Match Score</CardTitle>
              <CardDescription>
                Your resume match score for recent applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-lg bg-muted/50 flex items-center justify-center">
                Chart placeholder
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate New CV
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <PenLine className="mr-2 h-4 w-4" />
                Create Cover Letter
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Update Job Search
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current status of your automation pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>CV Generator</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Cover Letter Customizer</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span>LinkedIn Integration</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Degraded
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Job Search API</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Operational
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
