import Link from "next/link";
import Image from "next/image";
import { Button, Input } from "@/shared/ui";
import {
  BriefcaseIcon,
  CheckCircle,
  Clock,
  FileTextIcon,
  Rocket,
  Sparkles,
  Target,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold text-xl">Joba</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="#faq"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden py-10 md:py-16 lg:py-20">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/50"></div>
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>

          <div className="container relative px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
              <div className="flex flex-col justify-center space-y-8">
                <div className="w-fit inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary transition-colors">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Coming Soon - Join the Waitlist</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Your AI-Powered{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      Job Hunter
                    </span>{" "}
                    <Rocket className="ml-2 inline-block h-10 w-10 animate-pulse text-primary" />
                  </h1>
                  <p className="max-w-[700px] text-xl text-muted-foreground md:text-2xl">
                    Joba is your ultimate AI job-hunting assistant, designed to
                    automate your job search and land interviews faster.
                  </p>
                </div>

                <p className="text-lg text-muted-foreground md:text-xl">
                  With auto-generated, tailored resumes and cover letters, Joba
                  applies to jobs for you—so you can focus on preparing for
                  interviews, not filling out applications.
                </p>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                    <div className="flex-1 sm:max-w-md">
                      <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                        <Input
                          className="h-12 flex-1 rounded-lg border-2 border-muted bg-background/80 px-4 text-base backdrop-blur"
                          placeholder="Enter your email"
                          type="email"
                        />
                        <Button
                          type="submit"
                          className="h-12 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground hover:bg-primary/90"
                        >
                          Join Waitlist
                        </Button>
                      </form>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium md:text-base">
                        One-Click Applications
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium md:text-base">
                        Smart CV & Cover Letters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium md:text-base">
                        Job Matching
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium md:text-base">
                        Time-Saving
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"></div>
                <div className="relative h-[350px] w-[350px] overflow-hidden rounded-2xl border-8 border-background shadow-2xl sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"></div>
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Joba AI Job Hunter"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-lg border bg-background p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-green-500 p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      Applied to 128 jobs this week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-6 md:py-12 lg:py-16 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Why Joba?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Features That Get You Hired
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our AI-powered platform streamlines your job search from start
                  to finish.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BriefcaseIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  One-Click Applications
                </h3>
                <p className="text-center text-muted-foreground">
                  Apply to dozens of jobs in minutes, not hours.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileTextIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">CV & Cover Letters</h3>
                <p className="text-center text-muted-foreground">
                  AI crafts personalized documents for each role.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Job Matching</h3>
                <p className="text-center text-muted-foreground">
                  Finds the best-fit openings based on your skills.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Time-Saving</h3>
                <p className="text-center text-muted-foreground">
                  No more manual applications or repetitive forms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-6 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Simple 3-Step Process
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Getting started with Joba is quick and easy.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-lg font-bold text-primary-foreground">
                  1
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Create Profile"
                  className="rounded-md object-cover"
                />
                <h3 className="pt-4 text-xl font-bold">Create Your Profile</h3>
                <p className="text-center text-muted-foreground">
                  Upload your existing resume or build one from scratch with our
                  AI assistant.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-lg font-bold text-primary-foreground">
                  2
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Set Preferences"
                  className="rounded-md object-cover"
                />
                <h3 className="pt-4 text-xl font-bold">Set Your Preferences</h3>
                <p className="text-center text-muted-foreground">
                  Tell us what jobs you're looking for, your skills, and
                  preferred locations.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-lg font-bold text-primary-foreground">
                  3
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Automated Applications"
                  className="rounded-md object-cover"
                />
                <h3 className="pt-4 text-xl font-bold">Let Joba Do The Rest</h3>
                <p className="text-center text-muted-foreground">
                  Our AI finds matching jobs, creates tailored applications, and
                  submits them automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-6 md:py-12 lg:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Early Access Feedback
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  What Our Beta Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Hear from our early access users who are already experiencing
                  the future of job hunting.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "Joba saved me at least 15 hours a week on job applications.
                    The tailored cover letters were so good that my interview
                    rate tripled!"
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="rounded-full bg-muted p-1">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Michael K.</p>
                    <p className="text-sm text-muted-foreground">
                      Software Engineer
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "As a recent graduate, I was struggling to get noticed.
                    Joba's AI-generated resumes highlighted my skills perfectly.
                    I got 3 interviews in my first week!"
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="rounded-full bg-muted p-1">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah J.</p>
                    <p className="text-sm text-muted-foreground">
                      Marketing Graduate
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The job matching feature is incredible. Joba found
                    positions I would have never discovered on my own, and they
                    were perfect fits for my experience."
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="rounded-full bg-muted p-1">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">David L.</p>
                    <p className="text-sm text-muted-foreground">
                      Product Manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-6 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Everything you need to know about Joba.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  When will Joba be available?
                </h3>
                <p className="text-muted-foreground">
                  We're currently in private beta and plan to launch publicly in
                  Q3 2025. Join our waitlist to get early access!
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  How does the AI create personalized resumes?
                </h3>
                <p className="text-muted-foreground">
                  Our AI analyzes job descriptions and matches them with your
                  skills and experience to create tailored resumes that
                  highlight the most relevant qualifications for each position.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Which job boards does Joba work with?
                </h3>
                <p className="text-muted-foreground">
                  Joba integrates with all major job boards including LinkedIn,
                  Indeed, Glassdoor, ZipRecruiter, and many more.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Is my data secure?</h3>
                <p className="text-muted-foreground">
                  Yes, we take data security seriously. All your personal
                  information is encrypted and we never share your data with
                  third parties without your explicit consent.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">How much will Joba cost?</h3>
                <p className="text-muted-foreground">
                  We'll offer multiple pricing tiers to suit different needs.
                  Waitlist members will receive special early-bird pricing and
                  discounts.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  Can I review applications before they're sent?
                </h3>
                <p className="text-muted-foreground">
                  You'll have full control over your applications. You can
                  choose to review each one before it's submitted or let Joba
                  handle everything automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-6 md:py-12 lg:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Job Search?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join the waitlist today and be the first to experience
                  effortless job hunting with Joba.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground"
                  >
                    Get Early Access
                  </Button>
                </form>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    No credit card required
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Cancel anytime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link href="/" className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">Joba</span>
            </Link>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Joba, Inc. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
