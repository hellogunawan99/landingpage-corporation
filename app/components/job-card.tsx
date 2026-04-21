import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Clock } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    location: string;
    destination: string;
    salary: string | null;
    category: { name: string };
    employer: { name: string | null };
    createdAt: Date;
    _count: { applications: number };
  };
}

export default function JobCard({ job }: JobCardProps) {
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/portal/jobs/${job.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <Building2 className="h-4 w-4 mr-1" />
                {job.employer.name || "Company"}
              </div>
            </div>
            <Badge variant="secondary">{job.category.name}</Badge>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              {job.location} → {job.destination}
            </div>
            {job.salary && (
              <div className="font-medium text-primary">{job.salary}</div>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 border-t bg-gray-50">
          <div className="flex justify-between items-center w-full text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {postedDate}
            </div>
            <div>{job._count.applications} applicants</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
