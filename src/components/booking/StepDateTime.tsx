"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { availableDays } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

  const isDateAvailable = (date: Date) =>
    availableDateStrings.includes(format(date, "yyyy-MM-dd"));

  const availableSlots = selectedDate
    ? availableDays.find((d) => d.date === format(selectedDate, "yyyy-MM-dd"))?.slots ?? []
    : [];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const canContinue = selectedDate && selectedTime;

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-4xl font-light text-foreground mb-2">
          Pick your date & time
        </h2>
        <p className="text-sm text-muted-foreground">
          Dates with a gold dot have open slots. Select one to see available times.
        </p>
      </div>

      {/* Calendar */}
      <div className="border border-border bg-surface p-5 mb-6">
        <Calendar
          selected={selectedDate}
          onSelect={handleDateSelect}
          isAvailable={isDateAvailable}
          disablePast
        />
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mb-8">
          <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-3">
            Available times — {format(selectedDate, "EEEE, MMMM d")}
          </p>
          {availableSlots.length === 0 ? (
            <p className="text-sm text-muted-foreground">No slots available this day.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  className={cn(
                    "py-3 text-sm border transition-all duration-150",
                    !slot.available &&
                      "border-border text-muted-foreground cursor-not-allowed",
                    slot.available && selectedTime === slot.time &&
                      "border-gold bg-gold/10 text-gold",
                    slot.available && selectedTime !== slot.time &&
                      "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground cursor-pointer"
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedDate && (
        <div className="mb-8 py-6 border border-dashed border-border text-center">
          <p className="text-sm text-muted-foreground">Select a date above to see available times</p>
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
            canContinue && onNext(format(selectedDate!, "yyyy-MM-dd"), selectedTime!)
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
