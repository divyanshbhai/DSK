"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function TopLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary/20 to-primary overflow-hidden">
      <div className="h-full bg-primary animate-pulse" 
           style={{ 
             animation: "loader 1s ease-in-out infinite",
             background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
           }} />
      <style jsx>{`
        @keyframes loader {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}