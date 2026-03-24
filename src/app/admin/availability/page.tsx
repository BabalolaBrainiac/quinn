"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { availableDays } from "@/lib/data";
import { AvailableDay, TimeSlot } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_SLOTS: TimeSlot[] = [
  { time: "10:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "6:00 PM", available: true },
];

export default function AdminAvailabilityPage() {
  const [days, setDays] = useState<AvailableDay[]>(availableDays);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [saved, setSaved] = useState(false);

  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const dayEntry = days.find((d) => d.date === selectedDateStr);

  const handleAddDate = () => {
    if (!selectedDateStr || dayEntry) return;
    setDays((prev) => [
      ...prev,
      { date: selectedDateStr, slots: DEFAULT_SLOTS.map((s) => ({ ...s })) },
    ]);
  };

  const handleRemoveDate = (dateStr: string) => {
    setDays((prev) => prev.filter((d) => d.date !== dateStr));
    if (selectedDateStr === dateStr) setSelectedDate(undefined);
  };

  const toggleSlot = (dateStr: string, time: string) => {
    setDays((prev) =>
      prev.map((d) =>
        d.date === dateStr
          ? {
              ...d,
              slots: d.slots.map((s) =>
                s.time === time ? { ...s, available: !s.available } : s
              ),
            }
          : d
      )
    );
  };

  const handleSave = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const isDateAvailable = (date: Date) =>
    days.some((d) => d.date === format(date, "yyyy-MM-dd"));

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-4xl font-light text-foreground">Availability</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Set which dates and times are open for bookings.
          </p>
        </div>
        <Button onClick={handleSave} variant="outline" size="sm">
          <Save className="h-3.5 w-3.5" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar picker */}
        <div className="border border-border p-5">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Select Dates
          </p>
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            isAvailable={isDateAvailable}
            disablePast
          />

          {selectedDate && !dayEntry && (
            <Button className="w-full mt-4" size="sm" onClick={handleAddDate}>
              <Plus className="h-3.5 w-3.5" />
              Add {format(selectedDate, "MMM d")} as available
            </Button>
          )}
        </div>

        {/* Slot editor */}
        <div className="border border-border p-5">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
            {selectedDate && dayEntry
              ? `Slots — ${format(selectedDate, "EEEE, MMM d")}`
              : "Time Slots"}
          </p>

          {dayEntry ? (
            <div className="space-y-2">
              {dayEntry.slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => toggleSlot(dayEntry.date, slot.time)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 border text-sm transition-all",
                    slot.available
                      ? "border-gold/40 text-foreground bg-gold/5"
                      : "border-border text-muted-foreground"
                  )}
                >
                  <span>{slot.time}</span>
                  <Badge variant={slot.available ? "success" : "muted"}>
                    {slot.available ? "Open" : "Closed"}
                  </Badge>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              {selectedDate ? "This date has no slots yet." : "Select a date to manage slots."}
            </p>
          )}
        </div>

        {/* Active dates list */}
        <div className="border border-border p-5">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Available Dates ({days.length})
          </p>
          {days.length === 0 ? (
            <p className="text-sm text-muted-foreground">No dates set.</p>
          ) : (
            <div className="space-y-2">
              {days
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((day) => {
                  const openCount = day.slots.filter((s) => s.available).length;
                  return (
                    <div
                      key={day.date}
                      className={cn(
                        "flex items-center justify-between p-3 border transition-colors cursor-pointer",
                        selectedDateStr === day.date
                          ? "border-gold/40 bg-gold/5"
                          : "border-border hover:border-border"
                      )}
                      onClick={() => setSelectedDate(parseISO(day.date))}
                    >
                      <div>
                        <p className="text-sm text-foreground">
                          {format(parseISO(day.date), "EEE, MMM d")}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {openCount} slot{openCount !== 1 ? "s" : ""} open
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDate(day.date);
                        }}
                        className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
