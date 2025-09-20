"use client";

import { useState, useMemo, useEffect } from "react";
import type { Shortcut } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, List } from "lucide-react";
import * as LucideIcons from "lucide-react";

type ShortcutToolsProps = {
  shortcuts: Shortcut[];
};

export function ShortcutTools({ shortcuts }: ShortcutToolsProps) {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage) {
      const savedLanguage = localStorage.getItem("language") as "en" | "hi";
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
      
      const handleStorageChange = () => {
        const newLanguage = localStorage.getItem("language") as "en" | "hi";
        if (newLanguage) {
          setLanguage(newLanguage);
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  const groupedShortcuts = useMemo(() => {
    return shortcuts.reduce((acc, shortcut) => {
      const category = shortcut.category[language];
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(shortcut);
      return acc;
    }, {} as Record<string, Shortcut[]>);
  }, [shortcuts, language]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="bg-card/60 backdrop-blur-lg border border-white/20 shadow-inner shadow-white/10 bg-gradient-to-br from-white/20 to-transparent">
        <CardHeader>
          <CardTitle className="font-headline text-2xl font-bold text-primary">
            {language === "en" ? "Shortcut Tools" : "शॉर्टकट उपकरण"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full" defaultValue={Object.keys(groupedShortcuts)}>
            {Object.entries(groupedShortcuts).map(([category, items]) => (
              <AccordionItem value={category} key={category} className="border-white/20">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {items.map((shortcut) => {
                      const Icon = (LucideIcons as any)[shortcut.icon] || List;
                      return (
                        <Button
                          key={shortcut.id}
                          asChild
                          variant="outline"
                          className="h-auto justify-start p-3 text-left bg-background/50"
                        >
                          <a
                            href={shortcut.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3"
                          >
                            <Icon className="h-5 w-5 shrink-0 text-primary" />
                            <span className="flex-1 text-sm leading-tight">
                              {shortcut.name[language]}
                            </span>
                             <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
