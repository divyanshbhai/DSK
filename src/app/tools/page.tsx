import { ShortcutTools } from "@/components/shortcut-tools";
import { parse } from 'papaparse';
import type { Shortcut } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getShortcuts(): Promise<Shortcut[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/shortcuts.csv`);
    const csvFile = await res.text();

    return new Promise((resolve) => {
        parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const shortcuts = results.data.map((row: any) => ({
                    id: row.id,
                    name: { en: row.name_en, hi: row.name_hi },
                    link: row.link,
                    category: { en: row.category_en, hi: row.category_hi },
                    icon: row.icon,
                }));
                resolve(shortcuts as Shortcut[]);
            },
        });
    });
}

export default async function ToolsPage() {
  const shortcuts = await getShortcuts();

  return (
    <main className="min-h-screen w-full">
       <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>
      <ShortcutTools shortcuts={shortcuts} />
    </main>
  );
}
