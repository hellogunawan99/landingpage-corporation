export type Role = "JOB_SEEKER" | "EMPLOYER" | "ADMIN";
export type JobStatus = "ACTIVE" | "CLOSED" | "DRAFT";
export type ApplicationStatus = "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED";

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: Role;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  salary: string | null;
  location: string;
  destination: string;
  categoryId: string;
  category: Category;
  employerId: string;
  employer: User;
  status: JobStatus;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string | null;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  coverLetter: string | null;
  resumeUrl: string | null;
  createdAt: Date;
  user?: User;
  job?: Job;
}
