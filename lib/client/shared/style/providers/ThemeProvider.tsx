"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect,useState } from "react";

const ThemeProvider = ({ children }: React.ComponentProps<typeof NextThemesProvider>) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  ) : null;
};

export default ThemeProvider;
