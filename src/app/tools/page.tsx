"use client";

import { ShortcutTools } from "@/components/shortcut-tools";
import { useState, useEffect } from "react";
import { parse } from 'papaparse';
import type { Shortcut } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ToolsPage() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    const loadShortcuts = async () => {
      try {
        const res = await fetch('/data/shortcuts.csv');
        const csvFile = await res.text();

        parse(csvFile, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const shortcutsData = results.data.map((row: any) => ({
              id: row.id,
              name: { en: row.name_en, hi: row.name_hi },
              link: row.link,
              category: { en: row.category_en, hi: row.category_hi },
              icon: row.icon,
            }));
            setShortcuts(shortcutsData as Shortcut[]);
          },
        });
      } catch (error) {
        console.error('Failed to load shortcuts:', error);
      }
    };

    loadShortcuts();
  }, []);

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