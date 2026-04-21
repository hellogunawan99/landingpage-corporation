import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import JobCard from "@/app/components/job-card";
import JobFilter from "@/app/components/job-filter";

export default async function PortalPage() {
  const [jobs, categories] = await Promise.all([
    prisma.job.findMany({
      where: { status: "ACTIVE" },
      include: {
        category: true,
        employer: {
          select: { id: true, name: true },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Job Portal
            </h1>
            <p className="text-lg text-gray-600">
              Find your dream overseas job opportunity
            </p>
          </div>

          <JobFilter categories={categories} />

          <div className="mb-6">
            <p className="text-gray-600">
              {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
