import { Calendar } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface CalendlyButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function CalendlyButton({
  className = "",
  variant = "primary",
  size = "md",
}: CalendlyButtonProps) {
  const { language } = useLanguage();

  const handleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/georgiana17stanciu/30min",
      });
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-archivo font-bold rounded-xl transition-all duration-300 cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#badad5] to-[#a6b6e0] text-[#233d36] hover:shadow-xl hover:shadow-[#badad5]/30 hover:scale-105 shadow-lg",
    secondary:
      "bg-[#233d36] text-[#badad5] border-2 border-[#badad5]/30 hover:bg-[#badad5]/10 hover:border-[#badad5]/50 shadow-lg",
    outline:
      "bg-transparent text-[#badad5] border-2 border-[#badad5]/50 hover:bg-[#badad5]/10 hover:border-[#badad5]",
  };

  const label = language === "ro" ? "Programează o întâlnire" : "Schedule a meeting";

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      <Calendar className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}
