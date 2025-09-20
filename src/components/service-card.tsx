"use client";

import type { Service } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

type ServiceCardProps = {
  service: Service;
  language: "en" | "hi";
};

export function ServiceCard({ service, language }: ServiceCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in bg-card/60 backdrop-blur-lg border border-white/20 shadow-inner shadow-white/10 bg-gradient-to-br from-white/20 to-transparent">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="font-headline text-lg font-bold leading-tight">
            {service.name[language]}
          </CardTitle>
          {service.isOfficial && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BadgeCheck className="h-5 w-5 text-accent shrink-0" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{language === 'en' ? 'Official Government Service' : 'आधिकारिक सरकारी सेवा'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <CardDescription className="text-sm line-clamp-2 min-h-[40px]">
          {service.description[language]}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto p-4">
        <Button asChild size="sm" className="w-full bg-primary/40 backdrop-blur-sm border border-primary/40 shadow-inner shadow-white/10 hover:bg-primary/50">
          <a href={service.link} target="_blank" rel="noopener noreferrer">
            {language === 'en' ? 'Visit Site' : 'साइट पर जाएं'} <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
