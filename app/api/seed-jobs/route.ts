import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const employers = await prisma.user.findMany({
    where: { role: "EMPLOYER" },
  });

  if (employers.length === 0) {
    return NextResponse.json({ error: "No employers found in database" }, { status: 400 });
  }

  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c.id]));

  const jobTemplates = [
    {
      title: "Factory Worker - Electronics",
      description: "Assemble electronic components in a modern manufacturing facility. No experience required, training provided. Join our team and start your career in Japan's thriving electronics industry.",
      requirements: "18+ years old, physically fit, basic English communication skills",
      benefits: "Free accommodation, meals provided, health insurance, overtime pay, annual bonus",
      salary: "¥180,000/month",
      location: "Batam, Indonesia",
      destination: "Japan",
      categoryName: "Manufacturing",
    },
    {
      title: "Hotel Receptionist",
      description: "Greet guests, handle check-ins/outs, provide tourist information at a prestigious 5-star hotel in Singapore's Marina Bay area.",
      requirements: "Good communication skills in English and Indonesian, pleasant personality, customer service experience preferred",
      benefits: "Service charges and tips, shared accommodation, meals included, career growth opportunities",
      salary: "S$2,200/month",
      location: "Batam, Indonesia",
      destination: "Singapore",
      categoryName: "Hospitality",
    },
    {
      title: "Software Developer",
      description: "Develop and maintain web applications for a tech startup in Kuala Lumpur's tech hub. Work with modern technologies and agile teams.",
      requirements: "Bachelor's in Computer Science, 2+ years experience with React/Node.js, English fluent",
      benefits: "Remote work options available, annual bonus, learning and development budget, health insurance",
      salary: "RM 8,000/month",
      location: "Batam, Indonesia",
      destination: "Malaysia",
      categoryName: "Technology",
    },
    {
      title: "CNC Machine Operator",
      description: "Operate CNC machines for precision manufacturing in Shanghai's industrial zone. High-precision work for automotive parts.",
      requirements: "Technical diploma or equivalent, at least 1 year experience with CNC operations, attention to detail",
      benefits: "Housing allowance provided, round-trip air ticket annually, yearly bonus, overtime opportunities",
      salary: "¥15,000/month",
      location: "Batam, Indonesia",
      destination: "China",
      categoryName: "Manufacturing",
    },
    {
      title: "Construction Supervisor",
      description: "Lead construction teams for building projects in Singapore's growing infrastructure. Oversee quality and safety compliance.",
      requirements: "5+ years construction experience, relevant certifications (BCS or equivalent), strong leadership skills",
      benefits: "High salary package, transport allowance, career advancement opportunities, training provided",
      salary: "S$4,500/month",
      location: "Batam, Indonesia",
      destination: "Singapore",
      categoryName: "Construction",
    },
    {
      title: "Restaurant Chef",
      description: "Prepare authentic Indonesian and international cuisine at a renowned restaurant chain in Malaysia. Showcase your culinary skills.",
      requirements: "Culinary school diploma, 3+ years cooking experience, creativity in menu development",
      benefits: "Free meals during work, accommodation support, creative freedom in menu planning",
      salary: "RM 5,500/month",
      location: "Batam, Indonesia",
      destination: "Malaysia",
      categoryName: "Hospitality",
    },
    {
      title: "Electrical Engineer",
      description: "Design and implement electrical systems for manufacturing equipment in Japan's industrial sector.",
      requirements: "Electrical Engineering degree, 2+ years experience, knowledge of Japanese safety standards",
      benefits: "Competitive salary, housing assistance, round-trip flights, professional development",
      salary: "¥250,000/month",
      location: "Batam, Indonesia",
      destination: "Japan",
      categoryName: "Technology",
    },
  ];

  let totalJobsCreated = 0;
  const results: any[] = [];

  for (const employer of employers) {
    for (const template of jobTemplates) {
      await prisma.job.create({
        data: {
          title: template.title,
          description: template.description,
          requirements: template.requirements,
          benefits: template.benefits,
          salary: template.salary,
          location: template.location,
          destination: template.destination,
          categoryId: categoryMap[template.categoryName] || categories[0]?.id,
          employerId: employer.id,
        },
      });
      totalJobsCreated++;
    }
    results.push({
      employerEmail: employer.email,
      jobsCreated: jobTemplates.length,
    });
  }

  return NextResponse.json({
    message: "Jobs seeded successfully for all employers",
    totalEmployers: employers.length,
    totalJobsCreated: totalJobsCreated,
    jobsPerEmployer: jobTemplates.length,
    results: results,
  });
}
