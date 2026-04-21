import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, DollarSign, Clock, Users } from "lucide-react";
import Link from "next/link";
import ApplyButton from "@/app/components/apply-button";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      employer: {
        select: { id: true, name: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  });

  if (!job) {
    notFound();
  }

  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/portal"
              className="text-white/80 hover:text-white mb-4 inline-block"
            >
              ← Back to Jobs
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-2 items-center text-white/90">
              <Badge className="bg-white/20 text-white">{job.category.name}</Badge>
              <span className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                {job.employer.name || "Company"}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location} → {job.destination}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                  {job.description}
                </div>
              </div>

              {job.requirements && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Requirements</h2>
                  <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                    {job.requirements}
                  </div>
                </div>
              )}

              {job.benefits && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Benefits</h2>
                  <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                    {job.benefits}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium">{job.salary || "Negotiable"}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-medium">{job.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Applicants</p>
                      <p className="font-medium">{job._count.applications}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Posted</p>
                      <p className="font-medium">{postedDate}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <ApplyButton jobId={job.id} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">About Employer</h3>
                <p className="text-gray-600">{job.employer.name || "Company"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
