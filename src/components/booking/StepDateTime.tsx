"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { availableDays } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepDateTimeProps {
  selected: { date?: string; time?: string };
  onNext: (date: string, time: string) => void;
  onBack: () => void;
}

export function StepDateTime({ selected, onNext, onBack }: StepDateTimeProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    selected.date ? parseISO(selected.date) : undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(selected.time);

  const availableDateStrings = availableDays.map((d) => d.date);

  const availableSlots = selectedDate
    ? availableDays.find((d) => d.date === format(selectedDate, "yyyy-MM-dd"))?.slots ?? []
    : [];

  const isDateAvailable = (date: Date) => {
    const str = format(date, "yyyy-MM-dd");
    return availableDateStrings.includes(str);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const canContinue = selectedDate && selectedTime;

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-4xl font-light text-[#f0ece4] mb-2">
          Pick your date & time
        </h2>
        <p className="text-sm text-[#666666]">
          Only available slots are shown. Highlighted dates have openings.
        </p>
      </div>

      {/* Calendar */}
      <div className="flex justify-center mb-6">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) =>
            date < new Date(new Date().setHours(0, 0, 0, 0)) || !isDateAvailable(date)
          }
          modifiers={{ available: (date) => isDateAvailable(date) }}
          modifiersClassNames={{
            available: "rdp-day-available",
          }}
          classNames={{
            root: "rdp-custom",
            months: "flex flex-col",
            month: "space-y-4",
            caption: "flex justify-center relative items-center mb-2",
            caption_label: "text-sm text-[#f0ece4] font-medium tracking-wider uppercase",
            nav: "flex items-center gap-1",
            nav_button:
              "h-7 w-7 flex items-center justify-center text-[#666666] hover:text-[#f0ece4] transition-colors",
            table: "w-full border-collapse",
            head_row: "flex mb-1",
            head_cell:
              "w-9 h-9 flex items-center justify-center text-[10px] tracking-widest uppercase text-[#444444]",
            row: "flex w-full",
            cell: "relative p-0",
            day: cn(
              "w-9 h-9 flex items-center justify-center text-sm transition-all duration-150",
              "text-[#666666] hover:text-[#f0ece4] hover:bg-[#1a1a1a] cursor-pointer"
            ),
            day_selected: "bg-[#c4a35a] text-[#080808] hover:bg-[#c4a35a] hover:text-[#080808]",
            day_today: "text-[#f0ece4] font-medium",
            day_disabled: "text-[#2a2a2a] cursor-not-allowed hover:bg-transparent hover:text-[#2a2a2a]",
            day_outside: "opacity-30",
          }}
        />
      </div>

      {/* Available dot legend */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-[#666666] mb-6 tracking-widest uppercase">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#c4a35a] rounded-full" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 border border-[#c4a35a]/50 rounded-full" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#1c1c1c] rounded-full" />
          <span>Unavailable</span>
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mb-8">
          <p className="text-xs tracking-[0.1em] uppercase text-[#888888] mb-3">
            Available times — {format(selectedDate, "EEEE, MMMM d")}
          </p>
          {availableSlots.length === 0 ? (
            <p className="text-sm text-[#444444]">No slots available this day.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  className={cn(
                    "py-2.5 text-sm border transition-all duration-150",
                    !slot.available && "border-[#1c1c1c] text-[#2a2a2a] cursor-not-allowed",
                    slot.available &&
                      selectedTime === slot.time
                      ? "border-[#c4a35a] bg-[#c4a35a]/10 text-[#c4a35a]"
                      : slot.available
                      ? "border-[#242424] text-[#888888] hover:border-[#c4a35a]/50 hover:text-[#f0ece4]"
                      : ""
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="muted" size="md" onClick={onBack} className="w-24">
          Back
        </Button>
        <Button
          className="flex-1"
          disabled={!canContinue}
          onClick={() =>
            canContinue &&
            onNext(format(selectedDate!, "yyyy-MM-dd"), selectedTime!)
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
