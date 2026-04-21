"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Search, FileText, Plane, Users, Briefcase, CheckCircle } from "lucide-react";

const jobSeekerSteps = [
  {
    icon: Search,
    title: "Browse Jobs",
    description: "Explore thousands of overseas job opportunities",
  },
  {
    icon: FileText,
    title: "Apply Online",
    description: "Submit your application with resume",
  },
  {
    icon: CheckCircle,
    title: "Get Hired",
    description: "Interview and secure your position",
  },
];

const employerSteps = [
  {
    icon: Briefcase,
    title: "Post a Job",
    description: "Create your job listing in minutes",
  },
  {
    icon: Users,
    title: "Review Candidates",
    description: "Browse qualified Indonesian talent",
  },
  {
    icon: Plane,
    title: "Hire & Place",
    description: "Onboard your new team member",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, transparent process for both job seekers and employers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* For Job Seekers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">
              For Job Seekers
            </h3>
            <div className="space-y-6">
              {jobSeekerSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-primary">
                              Step {index + 1}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* For Employers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">
              For Employers
            </h3>
            <div className="space-y-6">
              {employerSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-secondary">
                              Step {index + 1}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
