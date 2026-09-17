// components/common/TokenIcon.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

interface TokenIconProps {
  src: string;
  alt?: string;
  symbol: string; // to show as fallback text
  size?: number;
  className?: string;
  showFallbackSymbol?: boolean; // New prop to control fallback content
}

const TokenIcon: React.FC<TokenIconProps> = ({
  src,
  alt = "token",
  symbol,
  size = 20,
  className = "",
  showFallbackSymbol = true, // Default to true to avoid breaking other components
}) => {
  const [error, setError] = useState(!src); // Also consider empty src as an error state

  if (error) {
    if (showFallbackSymbol) {
      return (
        <span
          style={{ width: size, height: size, fontSize: size > 20 ? '9px' : '8px' }}
          className={`bg-white/10 text-white/70 flex items-center justify-center rounded-full ${className}`}
        >
          {symbol?.slice(0, 4).toUpperCase()}
        </span>
      );
    }
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-white/5 border border-white/10 rounded-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      onError={() => setError(true)}
    />
  );
};

export default TokenIcon;
