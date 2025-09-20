"use client";

import { ServiceDirectory } from "@/components/service-directory";
import { useState, useEffect } from "react";
import { parse } from 'papaparse';
import type { Service, Category } from "@/lib/types";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesRes, categoriesRes] = await Promise.all([
          fetch('/data/services.csv'),
          fetch('/data/categories.csv')
        ]);

        const [servicesText, categoriesText] = await Promise.all([
          servicesRes.text(),
          categoriesRes.text()
        ]);

        parse(servicesText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const servicesData = results.data.map((row: any) => ({
              id: row.id,
              category: row.category,
              name: { en: row.name_en, hi: row.name_hi },
              description: { en: row.description_en, hi: row.description_hi },
              link: row.link,
              isOfficial: row.isOfficial === 'true',
            }));
            setServices(servicesData as Service[]);
          },
        });

        parse(categoriesText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const categoriesData = results.data.map((row: any) => ({
              id: row.id,
              name: { en: row.name_en, hi: row.name_hi },
              icon: row.icon,
            }));
            setCategories(categoriesData as Category[]);
          },
        });
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen w-full">
      <ServiceDirectory services={services} categories={categories} />
    </main>
  );
}