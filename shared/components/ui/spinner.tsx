import { cn } from "@/shared/lib/utils";
import React from "react";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Spinner: React.FC<SpinnerProps> = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className={cn("loader", sizeClasses[size], className)}>
      <style jsx>{`
        .loader {
          border-radius: 50%;
          display: inline-block;
          position: relative;
          border: 3px solid;
          border-color: currentColor currentColor transparent transparent;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }
        .loader::after,
        .loader::before {
          content: '';  
          box-sizing: border-box;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          border: 3px solid;
          border-color: transparent transparent currentColor currentColor;
          border-radius: 50%;
          animation: rotationBack 0.5s linear infinite;
          transform-origin: center center;
        }
        .loader::before {
          border-color: currentColor currentColor transparent transparent;
          animation: rotation 1.5s linear infinite;
        }
        
        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        } 
        @keyframes rotationBack {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};