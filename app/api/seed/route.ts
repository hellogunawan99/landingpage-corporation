import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const categories = [
  { name: "Manufacturing", icon: "Factory" },
  { name: "Hospitality", icon: "UtensilsCrossed" },
  { name: "Technology", icon: "Code" },
  { name: "Construction", icon: "HardHat" },
  { name: "Healthcare", icon: "Stethoscope" },
  { name: "Finance", icon: "Briefcase" },
  { name: "Corporate", icon: "Building2" },
  { name: "Transportation", icon: "Car" },
];

export async function POST() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  return NextResponse.json({ message: "Categories seeded successfully" });
}
