"use client";

import { cn } from "@/shared/lib/utils";
import { Search, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { Api } from "@/shared/services/api-client";
import Link from "next/link";
import Image from "next/image";
import { KeyboardWithVariants } from "@/@types/api";

interface Props {
  className?: string;
  onMobileExpand?: (expanded: boolean) => void;
}

export const SearchInput: React.FC<Props> = ({ className, onMobileExpand }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [keyboards, setKeyboards] = useState<KeyboardWithVariants[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    if (!isMobileExpanded) {
      setFocused(false);
      setSearchQuery("");
    }
  });

  useDebounce(
    async () => {
      if (searchQuery.trim().length > 0) {
        setIsLoading(true);
        try {
          const results = await Api.keyboards.search(searchQuery);
          setKeyboards(results);
        } catch (error) {
          console.error("Search error:", error);
          setKeyboards([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setKeyboards([]);
      }
    },
    300,
    [searchQuery]
  );

  const handleLinkClick = () => {
    setFocused(false);
    setSearchQuery("");
    setKeyboards([]);
    setIsMobileExpanded(false);
    onMobileExpand?.(false);
  };

  const handleFocus = () => {
    setFocused(true);
    // Check if mobile viewport
    if (window.innerWidth < 768) {
      setIsMobileExpanded(true);
      onMobileExpand?.(true);
    }
  };

  const handleClose = () => {
    setFocused(false);
    setSearchQuery("");
    setKeyboards([]);
    setIsMobileExpanded(false);
    onMobileExpand?.(false);
  };

  return (
    <>
      {focused && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={handleClose}
        />
      )}

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl justify-between relative h-11 z-30 transition-all duration-300",
          isMobileExpanded ? "fixed left-[5%] right-[5%] top-4 w-[90%]" : "flex-1",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11 pr-4"
          type="text"
          placeholder="Find Keyboard..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
        />

        {isMobileExpanded && (
          <button
            onClick={handleClose}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {focused && searchQuery.trim().length > 0 && (
          <div
            className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-lg
             max-h-96 overflow-y-auto overscroll-contain py-2"
          >
            {isLoading ? (
              <div className="px-4 py-8 text-center text-gray-500">
                Searching...
              </div>
            ) : keyboards.length > 0 ? (
              <div className="flex flex-col">
                {keyboards.map((keyboard) => (
                  <Link
                    key={keyboard.id}
                    href={`/keyboard/${keyboard.id}`}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    {keyboard.colorVariants[0]?.imageUrl ? (
                      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={keyboard.colorVariants[0].imageUrl}
                          alt={keyboard.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {keyboard.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                No keyboards found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};