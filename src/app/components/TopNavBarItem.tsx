"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...args: Parameters<typeof clsx>) => twMerge(clsx(...args));

/** 48×48 leading icon button (Figma: buttons) */
export function TopNavBarLeadingButton({
  icon,
  onClick,
  "aria-label": ariaLabel,
  className,
}: {
  icon: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--Grid-Radius-L,12px)] transition-colors hover:bg-[color:var(--colorBackgroundBase3Default)]",
        className
      )}
    >
      <span className="flex h-6 w-6 items-center justify-center [&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </span>
    </button>
  );
}

/** Weather info block (Figma: item_weather_info) — weather icon + location + temp/extra */
export function TopNavBarWeatherInfo({
  weatherIcon,
  location = "서울시 중구",
  temp = "-1°C",
  extra = "미세먼지 좋음",
  className,
}: {
  weatherIcon?: ReactNode;
  location?: string;
  temp?: string;
  extra?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-0.5 shrink-0", className)}>
      {weatherIcon != null && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center [&>svg]:h-8 [&>svg]:w-8">
          {weatherIcon}
        </span>
      )}
      <div className="flex flex-col items-end gap-0.5">
        <div className="flex items-center justify-end gap-0.5">
          <span className="whitespace-nowrap text-[length:var(--Typography-font-size-Label-XS,12px)] font-semibold leading-[1.2] text-[color:var(--colorElementBase3Default,#8e9099)]">
            {location}
          </span>
          {/* Pin drop 16×16 could be inserted here */}
        </div>
        <div className="flex items-center gap-0.5 text-[color:var(--colorElementBase3Default,#8e9099)]">
          <span className="text-[length:var(--Typography-font-size-Label-XS,12px)] font-semibold leading-[1.2]">
            {temp}
          </span>
          <span className="text-[10px] leading-[1.2]">,</span>
          <span className="text-[length:var(--Typography-font-size-Label-XS,12px)] font-semibold leading-[1.2]">
            {extra}
          </span>
        </div>
      </div>
    </div>
  );
}
