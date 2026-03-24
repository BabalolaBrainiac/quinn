"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  isAvailable?: (date: Date) => boolean;
  disablePast?: boolean;
  className?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Calendar({
  selected,
  onSelect,
  isAvailable,
  disablePast = true,
  className,
}: CalendarProps) {
  const [viewDate, setViewDate] = useState<Date>(
    selected ?? new Date()
  );

  const today = startOfDay(new Date());
  const firstDay = startOfMonth(viewDate);
  const lastDay = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });

  // Leading empty cells so the first day lands on the right column
  const startOffset = getDay(firstDay);

  const handleDayClick = (day: Date) => {
    const isDisabled =
      (disablePast && isBefore(day, today)) ||
      (isAvailable && !isAvailable(day));
    if (isDisabled) return;
    if (selected && isSameDay(day, selected)) {
      onSelect(undefined);
    } else {
      onSelect(day);
    }
  };

  return (
    <div className={cn("w-full select-none", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setViewDate((d) => subMonths(d, 1))}
          className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#f0ece4] hover:bg-[#1a1a1a] transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="text-sm tracking-[0.15em] uppercase text-[#f0ece4] font-medium">
          {format(viewDate, "MMMM yyyy")}
        </span>

        <button
          onClick={() => setViewDate((d) => addMonths(d, 1))}
          className="w-8 h-8 flex items-center justify-center text-[#666666] hover:text-[#f0ece4] hover:bg-[#1a1a1a] transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="h-8 flex items-center justify-center text-[10px] tracking-[0.12em] uppercase text-[#444444]"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {/* Leading empty cells */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const isPast = disablePast && isBefore(day, today);
          const available = isAvailable ? isAvailable(day) : true;
          const isDisabled = isPast || !available;
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isToday = isSameDay(day, today);
          const isCurrentMonth = isSameMonth(day, viewDate);

          return (
            <div
              key={day.toISOString()}
              className="flex flex-col items-center gap-0.5"
            >
              <button
                onClick={() => handleDayClick(day)}
                disabled={isDisabled}
                className={cn(
                  "w-9 h-9 flex items-center justify-center text-sm transition-all duration-150 relative",
                  // Base
                  !isDisabled && !isSelected &&
                    "hover:bg-[#1a1a1a] hover:text-[#f0ece4] cursor-pointer",
                  // Selected
                  isSelected &&
                    "bg-[#c4a35a] text-[#080808] font-medium cursor-pointer",
                  // Today (not selected)
                  isToday && !isSelected &&
                    "text-[#f0ece4] font-medium",
                  // Disabled
                  isDisabled &&
                    "text-[#2a2a2a] cursor-not-allowed",
                  // Available (not disabled, not selected)
                  !isDisabled && !isSelected && available &&
                    "text-[#f0ece4]",
                  // Not current month
                  !isCurrentMonth && "opacity-20"
                )}
              >
                {format(day, "d")}
              </button>

              {/* Available dot indicator */}
              {available && !isPast && !isSelected && (
                <div className="w-1 h-1 rounded-full bg-[#c4a35a]/60" />
              )}
              {isSelected && (
                <div className="w-1 h-1 rounded-full bg-[#c4a35a]" />
              )}
              {(isDisabled || !available) && (
                <div className="w-1 h-1" /> // spacer to keep grid aligned
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-[#1c1c1c]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
          <span className="text-[10px] tracking-[0.1em] uppercase text-[#666666]">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-5 bg-[#c4a35a] flex items-center justify-center">
            <span className="text-[10px] text-[#080808] font-medium">d</span>
          </div>
          <span className="text-[10px] tracking-[0.1em] uppercase text-[#666666]">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a]" />
          <span className="text-[10px] tracking-[0.1em] uppercase text-[#444444]">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
