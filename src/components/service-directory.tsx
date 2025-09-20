"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { Service, Category } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServiceCard } from "@/components/service-card";
import { AppLogo } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Search, Siren, Phone, ShieldAlert, List, Wrench } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Fuse from "fuse.js";
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type ServiceDirectoryProps = {
  services: Service[];
  categories: Category[];
};

const emergencyServices = [
    { name: { en: "Police", hi: "पुलिस" }, number: "100", icon: ShieldAlert },
    { name: { en: "Ambulance", hi: "एंबुलेंस" }, number: "102", icon: Siren },
    { name: { en: "Fire", hi: "दमकल" }, number: "101", icon: Siren },
    { name: { en: "Disaster Management", hi: "आपदा प्रबंधन" }, number: "108", icon: ShieldAlert },
];


export function ServiceDirectory({ services, categories }: ServiceDirectoryProps) {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [fuse, setFuse] = useState<Fuse<Service> | null>(null);
  
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    const fuseInstance = new Fuse(services, {
      keys: [
        'name.en',
        'name.hi',
        'description.en',
        'description.hi',
      ],
      includeScore: true,
      threshold: 0.4,
    });
    setFuse(fuseInstance);
  }, [services]);

  const filteredServices = useMemo(() => {
    const servicesByCategory = services.filter((service) => {
        return selectedCategory === "all" || service.category === selectedCategory;
    });

    if (searchTerm.trim() === "") {
        return servicesByCategory.sort((a, b) => (a.isOfficial === b.isOfficial) ? 0 : a.isOfficial ? -1 : 1);
    }
    
    if (!fuse) return [];

    const fuseResults = fuse.search(searchTerm);
    
    const categoryFilteredFuseResults = fuseResults
        .map(result => result.item)
        .filter(service => selectedCategory === 'all' || service.category === selectedCategory);

    return categoryFilteredFuseResults.sort((a, b) => (a.isOfficial === b.isOfficial) ? 0 : a.isOfficial ? -1 : 1);

  }, [services, searchTerm, selectedCategory, fuse]);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage) {
      const savedLanguage = localStorage.getItem('language') as 'en' | 'hi';
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('language', lang);
    }
  };
  
  const allCategoryDetails = { id: "all", name: { en: "All", hi: "सभी" }, icon: 'List' as const };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-4">
          <div className="bg-primary rounded-lg p-2">
            <AppLogo className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              {language === "en" ? "Delhi Seva Kendra" : "दिल्ली सेवा केंद्र"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Your one-stop portal for essential services."
                : "आवश्यक सेवाओं के लिए आपका वन-स्टॉप पोर्टल।"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button asChild variant="outline" className="rounded-full">
              <Link href="/tools">
                <Wrench className="mr-2 h-4 w-4" />
                {language === "en" ? "Tools" : "उपकरण"}
              </Link>
            </Button>
           <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30">
                <Siren className="mr-2 h-4 w-4 animate-pulse" />
                {language === "en" ? "Emergency" : "आपातकालीन"}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card/80 backdrop-blur-lg">
              <DialogHeader>
                <DialogTitle>{language === 'en' ? 'Emergency Contacts' : 'आपातकालीन संपर्क'}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {emergencyServices.map(service => (
                    <Button key={service.number} asChild variant="outline" className="h-16 justify-start text-left rounded-lg">
                        <a href={`tel:${service.number}`} className="flex items-center gap-4">
                           <div className="bg-red-100 p-3 rounded-md">
                             <service.icon className="h-6 w-6 text-red-600" />
                           </div>
                           <div>
                                <p className="font-semibold">{service.name[language]}</p>
                                <p className="text-muted-foreground flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {service.number}
                                </p>
                           </div>
                        </a>
                    </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex rounded-full border border-white/20 bg-card/60 backdrop-blur-lg p-1">
            <Button
              size="sm"
              variant={language === "en" ? "default" : "ghost"}
              onClick={() => handleLanguageChange("en")}
              className={cn("w-14 rounded-full", language === "en" && "bg-primary text-primary-foreground shadow-sm")}
            >
              EN
            </Button>
            <Button
              size="sm"
              variant={language === "hi" ? "default" : "ghost"}
              onClick={() => handleLanguageChange("hi")}
              className={cn("w-14 rounded-full", language === "hi" && "bg-primary text-primary-foreground shadow-sm")}
            >
              HI
            </Button>
          </div>
        </div>
      </header>

      <div className="mb-10 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={
              language === "en"
                ? "Search for services (e.g., Aadhaar, Water Bill...)"
                : "सेवाएं खोजें (उदा. आधार, पानी बिल...)"
            }
            className="w-full rounded-full bg-card/60 backdrop-blur-lg py-7 pl-12 pr-6 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-white/20 shadow-inner shadow-white/10 bg-gradient-to-br from-white/20 to-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
            <Button
                variant={selectedCategory === allCategoryDetails.id ? "default" : "outline"}
                className={cn(
                "transition-all shrink-0 rounded-full font-semibold",
                selectedCategory === allCategoryDetails.id ? "bg-primary text-primary-foreground" : "bg-card/60 backdrop-blur-lg text-card-foreground border-white/20 shadow-inner shadow-white/10 bg-gradient-to-br from-white/20 to-transparent"
                )}
                onClick={() => setSelectedCategory(allCategoryDetails.id)}
            >
                <List className="mr-2 h-4 w-4" />
                {allCategoryDetails.name[language]}
            </Button>
            <Carousel 
                className="w-full overflow-hidden"
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.play}
            >
                <CarouselContent className="-ml-2">
                    {categories.map((category) => {
                    const IconComponent = (LucideIcons as any)[category.icon];
                    const Icon = IconComponent ? <IconComponent className="mr-2 h-4 w-4" /> : <List className="mr-2 h-4 w-4" />;
                    return (
                        <CarouselItem key={category.id} className="basis-auto pl-2">
                        <Button
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            className={cn(
                                "transition-all w-full rounded-full font-semibold",
                                selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-card/60 backdrop-blur-lg text-card-foreground border-white/20 shadow-inner shadow-white/10 bg-gradient-to-br from-white/20 to-transparent"
                            )}
                            onClick={() => setSelectedCategory(category.id)}
                            >
                            {Icon}
                            {category.name[language]}
                            </Button>
                        </CarouselItem>
                    );
                    })}
                </CarouselContent>
            </Carousel>
        </div>
      </div>
      
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              language={language}
            />
          ))}
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-24 text-center bg-card/50 backdrop-blur-lg">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {language === 'en' ? 'No services found' : 'कोई सेवा नहीं मिली'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {language === 'en'
                ? "Try adjusting your search or category filters."
                : 'अपनी खोज या श्रेणी फ़िल्टर समायोजित करने का प्रयास करें।'}
            </p>
          </div>
      )}
    </div>
  );
}
