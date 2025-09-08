"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/loading-screen";

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // jab bhi pathname change hoga → loading show karo
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); // thoda delay taki smooth lage

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <LoadingScreen />}
      {children}
    </>
  );
}
