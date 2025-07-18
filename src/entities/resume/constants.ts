import type { CVData } from "./model/types";

export const defaultCVData: CVData = {
  personal_info: {
    full_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    middle_name: "Michael",
    prefix: "Mr.",
    suffix: "Ph.D.",
    gender: "male",
    birth_date: "1990-05-15",
    nationality: "US",
    marital_status: "single",
    photo_url: "https://example.com/photos/john_doe.jpg",
  },
  contact_info: {
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postal_code: "10001",
      country: "US",
    },
    social_profiles: [
      {
        network: "linkedin",
        url: "https://linkedin.com/in/johndoe",
        username: "johndoe",
      },
      {
        network: "github",
        url: "https://github.com/johndoe",
      },
    ],
  },
  summary:
    "Experienced software engineer with a passion for building scalable and efficient systems. Proficient in Python, Docker, and Kubernetes. Strong problem-solving skills and a commitment to delivering high-quality code.",
  education: [
    {
      institution: "Harvard University",
      degree: "Master of Science",
      field_of_study: "Computer Science",
      start_date: "2010-09-01",
      end_date: "2012-06-30",
      gpa: 3.8,
      max_gpa: 4.0,
      location: "Cambridge, MA, USA",
      is_current: false,
      description: "Specialized in Machine Learning and AI.",
      courses: ["Advanced Algorithms", "Data Mining", "Neural Networks"],
      metadata: {
        extraction_confidence: 0.98,
      },
    },
  ],
  work_experience: [
    {
      company: "Google Inc.",
      position: "Senior Software Engineer",
      start_date: "2015-07-01",
      end_date: "2023-12-31",
      is_current: false,
      location: "Mountain View, CA, USA",
      description:
        "Led a team of 5 engineers to develop scalable backend services.",
      achievements: [
        "Reduced API latency by 40%.",
        "Introduced CI/CD pipeline saving 200+ hours/month.",
      ],
      skills_used: ["Java", "Kubernetes", "gRPC", "PostgreSQL"],
      metadata: {
        extraction_confidence: 0.97,
      },
    },
  ],
  skills: {
    technical: [
      {
        name: "Python",
        level: "expert",
        years_of_experience: 8,
        last_used: "2023-12-01",
      },
      {
        name: "Docker",
        level: "advanced",
        years_of_experience: 5,
      },
    ],
    soft: ["Leadership", "Teamwork", "Problem Solving"],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        issue_date: "2020-05-10",
        expiry_date: "2023-05-10",
        certificate_id: "AWS-12345-XYZ",
      },
    ],
    languages: [
      {
        name: "English",
        proficiency: "native",
      },
      {
        name: "Spanish",
        proficiency: "intermediate",
      },
    ],
  },
  projects: [
    {
      name: "Portfolio Optimization Tool",
      start_date: "2022-01-01",
      end_date: "2022-06-30",
      is_current: false,
      description: "A web app for stock portfolio analysis.",
      technologies: ["React", "Node.js", "MongoDB"],
      url: "https://github.com/johndoe/portfolio-optimizer",
      role: "Full-stack Developer",
    },
  ],
  publications: [
    {
      title: "Deep Learning for NLP: A Survey",
      publisher: "IEEE",
      publication_date: "2021-03-15",
      url: "https://doi.org/10.1109/ACCESS.2021.12345",
      authors: ["John Doe", "Jane Smith"],
    },
  ],
  awards: [
    {
      title: "Best Paper Award at AI Conference 2020",
      issuer: "AI Research Foundation",
      date: "2020-10-20",
      description: "Awarded for groundbreaking work in NLP.",
    },
  ],
  volunteering: [
    {
      organization: "Tech for Good",
      role: "Mentor",
      start_date: "2018-01-01",
      end_date: "2020-12-31",
      description: "Teaching programming to underprivileged youth.",
    },
  ],
  interests: ["Hiking", "Photography", "Blockchain"],
  references: [
    {
      name: "Jane Smith",
      position: "CTO at Google",
      email: "jane.smith@google.com",
      phone: "+1987654321",
      relationship: "Former Manager",
    },
  ],
  custom_sections: [
    {
      section_name: "Patents",
      items: [
        {
          title: "System for Automated CV Parsing",
          patent_number: "US12345678",
          date: "2022-05-10",
        },
      ],
    },
  ],
};
