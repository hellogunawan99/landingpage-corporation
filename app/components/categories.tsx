"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Factory,
  UtensilsCrossed,
  Code,
  HardHat,
  Stethoscope,
  Briefcase,
  Building2,
  Car,
} from "lucide-react";

const categories = [
  {
    name: "Manufacturing",
    icon: Factory,
    description: "Factory work, assembly, production",
    color: "bg-blue-500",
    count: 234,
  },
  {
    name: "Hospitality",
    icon: UtensilsCrossed,
    description: "Hotels, restaurants, retail",
    color: "bg-orange-500",
    count: 156,
  },
  {
    name: "Technology",
    icon: Code,
    description: "IT, software, engineering",
    color: "bg-purple-500",
    count: 89,
  },
  {
    name: "Construction",
    icon: HardHat,
    description: "Skilled trades, infrastructure",
    color: "bg-yellow-600",
    count: 178,
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description: "Medical, nursing, care",
    color: "bg-red-500",
    count: 67,
  },
  {
    name: "Finance",
    icon: Briefcase,
    description: "Banking, accounting, finance",
    color: "bg-green-600",
    count: 45,
  },
  {
    name: "Corporate",
    icon: Building2,
    description: "Management, admin, HR",
    color: "bg-indigo-500",
    count: 98,
  },
  {
    name: "Transportation",
    icon: Car,
    description: "Logistics, driving, delivery",
    color: "bg-cyan-500",
    count: 123,
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Browse by Industry
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find opportunities across diverse industries matching your skills
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className={`${cat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                    <cat.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
                  <p className="text-sm font-medium text-primary">{cat.count} jobs</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
