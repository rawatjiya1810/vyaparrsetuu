import React from "react";
import logoImg from "../assets/logo.png";
import { Language } from "../types";

interface BrandLogoProps {
  variant?: "dark" | "light" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  showSubtitle?: boolean;
  language?: Language;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "dark",
  size = "md",
  className = "",
  showSubtitle = true,
  language = "en",
}) => {
  const isLight = variant === "light" || variant === "white";
  const isHi = language === "hi";

  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official VyaparSetu Logo Image (Transparent PNG) */}
      <img
        src={logoImg}
        alt="VyaparSetu Official Logo"
        className={`${sizeClasses[size]} w-auto object-contain transition-transform`}
      />

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span
            className={`font-heading font-extrabold tracking-tight ${textClasses[size]} ${
              isLight ? "text-white" : "text-[#014D4E]"
            }`}
          >
            Vyapar<span className="text-[#F4C430]">Setu</span>
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-sans text-[10px] uppercase font-bold tracking-wider ${
              isLight ? "text-teal-100" : "text-[#60727A]"
            }`}
          >
            {isHi ? "व्यापार सलाहकार" : "Business Advisory"}
          </span>
        )}
      </div>
    </div>
  );
};
