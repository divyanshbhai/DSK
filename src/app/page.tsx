import { ServiceDirectory } from "@/components/service-directory";
import { parse } from 'papaparse';
import type { Service, Category } from "@/lib/types";

async function getServices(): Promise<Service[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/services.csv`);
  const csvFile = await res.text();

  return new Promise((resolve) => {
    parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const services = results.data.map((row: any) => ({
          id: row.id,
          category: row.category,
          name: { en: row.name_en, hi: row.name_hi },
          description: { en: row.description_en, hi: row.description_hi },
          link: row.link,
          isOfficial: row.isOfficial === 'true',
        }));
        resolve(services as Service[]);
      },
    });
  });
}

async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/categories.csv`);
    const csvFile = await res.text();

    return new Promise((resolve) => {
        parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const categories = results.data.map((row: any) => ({
                    id: row.id,
                    name: { en: row.name_en, hi: row.name_hi },
                    icon: row.icon,
                }));
                resolve(categories as Category[]);
            },
        });
    });
}

export default async function Home() {
  const services = await getServices();
  const categories = await getCategories();

  return (
    <main className="min-h-screen w-full">
      <ServiceDirectory services={services} categories={categories} />
    </main>
  );
}
