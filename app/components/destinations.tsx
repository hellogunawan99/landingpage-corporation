"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const destinations = [
  {
    country: "Japan",
    flag: "🇯🇵",
    description: "Experience world-class technology and unique work culture",
    jobCount: 120,
    color: "bg-red-500",
  },
  {
    country: "China",
    flag: "🇨🇳",
    description: "Dynamic economy with diverse industry opportunities",
    jobCount: 85,
    color: "bg-yellow-500",
  },
  {
    country: "Malaysia",
    flag: "🇲🇾",
    description: "Southeast Asian hub with familiar culture",
    jobCount: 150,
    color: "bg-blue-600",
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    description: "Global financial center and innovation hub",
    jobCount: 95,
    color: "bg-red-600",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Global Career Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore exciting job opportunities in top destinations across Asia
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.country}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                {/* Flag Header */}
                <div className={`${dest.color} h-32 flex items-center justify-center relative`}>
                  <span className="text-7xl">{dest.flag}</span>
                  <Badge className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30">
                    {dest.jobCount} jobs
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dest.country}
                  </h3>
                  <p className="text-gray-600 text-sm">{dest.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
