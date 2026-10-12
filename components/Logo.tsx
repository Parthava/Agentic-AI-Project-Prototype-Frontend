"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo({ size = 32 }: { size?: number }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // SSR mismatch avoid karne ke liye
  if (!mounted) {
    return <div style={{ width: size, height: size }} aria-hidden />;
  }

  const logoSrc = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <Image
      src={logoSrc}
      alt="Chronicle"
      width={size}
      height={size}
      priority
      className="object-contain"
    />
  );
}