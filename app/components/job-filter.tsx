"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const destinations = [
  { value: "all", label: "All Destinations" },
  { value: "Japan", label: "Japan" },
  { value: "China", label: "China" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Singapore", label: "Singapore" },
];

interface Category {
  id: string;
  name: string;
}

interface JobFilterProps {
  categories: Category[];
}

export default function JobFilter({ categories }: JobFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [destination, setDestination] = useState(
    searchParams.get("destination") || "all"
  );
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || "all"
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (destination && destination !== "all") params.set("destination", destination);
    if (categoryId && categoryId !== "all") params.set("categoryId", categoryId);

    const query = params.toString();
    router.push(query ? `/portal?${query}` : "/portal", { scroll: false });
  }, [search, destination, categoryId, router]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={destination} onValueChange={setDestination}>
          <SelectTrigger>
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            {destinations.map((dest) => (
              <SelectItem key={dest.value} value={dest.value}>
                {dest.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
