"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Workers Placed",
    description: "Successful placements worldwide",
  },
  {
    value: 50,
    suffix: "+",
    label: "Partner Companies",
    description: "Trusted employer partnerships",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
    description: "Industry expertise since 2014",
  },
  {
    value: 4,
    suffix: "",
    label: "Countries",
    description: "Japan, China, Malaysia, Singapore",
  },
];

function Counter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Track Record
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Years of experience connecting Indonesian talent with global opportunities
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="text-xl font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-sm text-white/70">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
