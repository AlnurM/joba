import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Github,
  CloudLightningIcon as Lightning,
  LineChart,
  Linkedin,
  Mail,
  Package,
  RefreshCw,
  Shield,
  Twitter,
  User,
} from "lucide-react";
import { ThemeToggle } from "@/widgets/theme";
import {
  Button,
  Card,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  CardContent,
} from "@/shared/ui";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              JobaLlama
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#how-it-works"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              How it works
            </Link>
            <Link
              href="#benefits"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Benefits
            </Link>
            <Link
              href="#pricing"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 dark:from-purple-500 dark:to-purple-600"
            >
              <Link href="#pricing">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section */}
        <section className="pt-20 pb-16 px-4 md:px-6 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/30 dark:to-background">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Automate your job search in{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                    frontend development
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  JobaLlama sends applications for you while you prepare for
                  technical interviews
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    <Link href="#pricing">Try for free</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <Link href="#pricing">Start for $30</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
                  <Card className="relative">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="mr-2 bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center">
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">
                            Sent today
                          </div>
                          <div className="text-sm text-gray-500">
                            15 applications
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          Latest activity
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <div>
                            Application sent to{" "}
                            <span className="font-medium">Google</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <div>
                            Application sent to{" "}
                            <span className="font-medium">Microsoft</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          Efficiency
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full w-[78%]"></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>78% efficiency</span>
                          <span>Above average</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          Invitations
                        </div>
                        <div className="flex items-center">
                          <div className="text-3xl font-bold text-purple-600 mr-2">
                            3
                          </div>
                          <div className="text-sm text-gray-500">
                            new interview
                            <br />
                            invitations
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="p-6 bg-red-50 dark:bg-red-950/30 rounded-xl mb-6 max-w-md mx-auto md:mx-0">
                  <h3 className="text-2xl font-bold text-red-500 mb-2">
                    The Problem
                  </h3>
                  <p className="text-lg text-gray-700">
                    10 hours for 100 applications ={" "}
                    <span className="font-semibold">5 minutes each</span>
                  </p>
                  <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-gray-700">
                        Finding suitable vacancies
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-gray-700">
                        Adapting resume for each job
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-gray-700">
                        Filling forms on different websites
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-xl max-w-md mx-auto md:mx-0">
                  <h3 className="text-2xl font-bold text-green-500 mb-2">
                    The Solution
                  </h3>
                  <p className="text-lg text-gray-700">
                    JobaLlama does it for you{" "}
                    <span className="font-semibold">automatically</span>
                  </p>
                  <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        Finding relevant vacancies
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">AI-optimized resume</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        Automatic application submission
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="py-20 px-4 md:px-6 bg-purple-50 dark:bg-purple-950/20"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How it works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Four simple steps to automate your job search
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="relative">
                <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  1
                </div>
                <CardContent className="pt-8">
                  <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <User className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    Connect your profiles
                  </h3>
                  <p className="text-gray-600 text-center">
                    Integrate LinkedIn, GitHub and other job search platforms
                  </p>
                </CardContent>
              </Card>
              <Card className="relative">
                <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  2
                </div>
                <CardContent className="pt-8">
                  <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Package className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    Set up templates
                  </h3>
                  <p className="text-gray-600 text-center">
                    Upload your CV and cover letters for automation
                  </p>
                </CardContent>
              </Card>
              <Card className="relative">
                <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  3
                </div>
                <CardContent className="pt-8">
                  <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Package className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    JobaLlama finds jobs
                  </h3>
                  <p className="text-gray-600 text-center">
                    Our system automatically finds and sends applications
                  </p>
                </CardContent>
              </Card>
              <Card className="relative">
                <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  4
                </div>
                <CardContent className="pt-8">
                  <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    Get invitations
                  </h3>
                  <p className="text-gray-600 text-center">
                    Focus on interview preparation while we send applications
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                JobaLlama Benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Why our users choose automation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="transition-all hover:shadow-lg hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Time Saving</h3>
                  <p className="text-gray-600">
                    Save up to 10 hours per week on searching and applying for
                    jobs
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <Lightning className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    AI Optimization
                  </h3>
                  <p className="text-gray-600">
                    Automatic optimization of CV and cover letters for each job
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <LineChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Efficiency Analytics
                  </h3>
                  <p className="text-gray-600">
                    Get detailed reports on the effectiveness of your
                    applications
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Automatic Follow-ups
                  </h3>
                  <p className="text-gray-600">
                    System sends follow-up emails to increase your chances of
                    getting a response
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <RefreshCw className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">A/B Testing</h3>
                  <p className="text-gray-600">
                    Test different versions of resumes and letters to identify
                    the most effective ones
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Results Guarantee
                  </h3>
                  <p className="text-gray-600">
                    Refund up to 90% if you don't receive any interview
                    invitations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing plans */}
        <section
          id="pricing"
          className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-purple-50 dark:from-background dark:to-purple-950/20"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pricing Plans
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose a plan that fits your needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="transition-all hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Starter</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold">$30</span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      For those just starting their job search
                    </p>
                    <hr className="my-6" />
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>15 automatic applications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>1 CV template + AI tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>2 Cover Letter templates + AI tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Additional applications: $1.2 each</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Insurance: 50% refund if 0 interviews</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    Choose Starter
                  </Button>
                </CardContent>
              </Card>
              <Card className="relative border-purple-600 transition-all hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50">
                <div className="absolute -top-3 right-5 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Pro</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold">$80</span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    <p className="text-gray-600 mb-6">For active job seekers</p>
                    <hr className="my-6" />
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>100 automatic applications</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>3 CV templates + AI tools</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>6 Cover Letter templates + AI tools</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>Advanced analytics</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>Follow-ups (Email integration)</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        Additional applications: <strong>$0.88 each</strong>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        <strong>Insurance: 90% refund if 0 interviews</strong>
                      </span>
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                    Choose Pro
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Guarantee/Insurance */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-6">Our Guarantee</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    We're confident in JobaLlama's effectiveness and ready to
                    prove it:
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="font-medium">
                      90% refund if you don't receive any interview invitations
                    </p>
                  </div>
                  <p className="text-gray-600 mb-6">
                    We track every application sent and guarantee results. If
                    our system doesn't bring you any interview invitations —
                    we'll refund 90% of your payment.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                    Try Risk-Free
                  </Button>
                </div>
                <div className="bg-purple-600 p-10 text-white flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-6">
                    Success Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-4xl font-bold mb-2">87%</p>
                      <p className="text-purple-200">
                        users receive at least 3 invitations
                      </p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold mb-2">92%</p>
                      <p className="text-purple-200">
                        time saved on job search
                      </p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold mb-2">68%</p>
                      <p className="text-purple-200">
                        increase in application to interview conversion
                      </p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold mb-2">&lt;2%</p>
                      <p className="text-purple-200">
                        users request a refund under guarantee
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="py-20 px-4 md:px-6 bg-gray-50 dark:bg-gray-950/50"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Answers to common questions about JobaLlama
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How does automatic submission work?
                  </AccordionTrigger>
                  <AccordionContent>
                    JobaLlama uses special APIs and algorithms to interact with
                    popular job search sites. The system finds suitable
                    vacancies, optimizes your resume for each one, and
                    automatically fills out application forms on employer
                    websites. You receive notifications for each application
                    sent and can track their status in your personal account.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Which sites does JobaLlama use?
                  </AccordionTrigger>
                  <AccordionContent>
                    JobaLlama is integrated with leading job search platforms,
                    including LinkedIn Jobs, Indeed, AngelList, Glassdoor, Stack
                    Overflow Jobs, GitHub Jobs, and many other specialized
                    platforms for frontend developers. We constantly add new
                    platforms to expand job coverage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How does the AI for CV work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our AI analyzes the job description and your resume to
                    identify key words and skills in demand at the specific
                    company. The system then adapts your resume, highlighting
                    relevant experience and skills important for the position.
                    This significantly increases the chances of passing through
                    ATS (Applicant Tracking Systems) and getting a response from
                    recruiters.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How is the guarantee calculated?
                  </AccordionTrigger>
                  <AccordionContent>
                    The guarantee is valid for 30 days from the moment of plan
                    activation. If during this period you don't receive any
                    interview invitations (provided you've sent at least 50
                    applications for the "Pro" plan or 15 applications for the
                    "Starter" plan), we'll refund 90% (for Pro) or 50% (for
                    Starter) of the plan cost. To activate the guarantee, you
                    need to provide your application history from your personal
                    account.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Can I control which vacancies applications are sent to?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, you can set detailed search parameters: position level,
                    required skills, salary expectations, location, company
                    size, and other parameters. You can also set up a
                    pre-approval mode where the system will request your
                    confirmation before sending an application.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 md:px-6 bg-purple-700 dark:bg-purple-800 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start getting more invitations today
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10">
              Join hundreds of frontend developers who have already automated
              their job search with JobaLlama
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 dark:bg-gray-100 dark:text-purple-800"
              >
                <Link href="#pricing">Start for free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-purple-600 dark:hover:bg-purple-700"
              >
                <Link href="#pricing">Learn more</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">JobaLlama</h3>
              <p className="text-gray-400">
                Automated job search for frontend developers
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact us</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    support@joballama.com
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    +1 (555) 123-4567
                  </Link>
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
            <p>© 2025 JobaLlama. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
