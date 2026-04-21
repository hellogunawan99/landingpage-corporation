"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Briefcase } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Global Career?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Join thousands of Indonesian workers who have successfully built their careers abroad with Tunaskarya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* For Job Seekers */}
            <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full hover:bg-gray-700 transition-colors">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Find a Job</h3>
              <p className="text-gray-400 mb-6">
                Browse thousands of overseas opportunities and apply today
              </p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white"
                asChild
              >
                <Link href="/portal">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* For Employers */}
            <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full hover:bg-gray-700 transition-colors">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hire Talent</h3>
              <p className="text-gray-400 mb-6">
                Post jobs and connect with qualified Indonesian workers
              </p>
              <Button
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
                asChild
              >
                <Link href="/auth/register">
                  Post a Job
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
