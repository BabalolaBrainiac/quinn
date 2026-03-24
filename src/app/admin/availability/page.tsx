"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
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

  const availableDateObjects = days.map((d) => parseISO(d.date));

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-4xl font-light text-[#f0ece4]">Availability</h1>
          <p className="text-sm text-[#666666] mt-1">
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
        <div className="border border-[#1c1c1c] p-5">
          <p className="text-xs tracking-[0.15em] uppercase text-[#888888] mb-4">
            Select Dates
          </p>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
            modifiers={{ hasSlots: availableDateObjects }}
            modifiersClassNames={{ hasSlots: "rdp-day-has-slots" }}
            classNames={{
              root: "rdp-admin",
              months: "flex flex-col",
              month: "space-y-4",
              caption: "flex justify-center relative items-center mb-2",
              caption_label: "text-sm text-[#f0ece4] font-medium tracking-wider uppercase",
              nav: "flex items-center gap-1",
              nav_button: "h-7 w-7 flex items-center justify-center text-[#666666] hover:text-[#f0ece4]",
              table: "w-full border-collapse",
              head_row: "flex mb-1",
              head_cell: "w-9 h-9 flex items-center justify-center text-[10px] tracking-widest uppercase text-[#444444]",
              row: "flex w-full",
              cell: "relative p-0",
              day: "w-9 h-9 flex items-center justify-center text-sm transition-all text-[#666666] hover:text-[#f0ece4] hover:bg-[#1a1a1a]",
              day_selected: "bg-[#c4a35a] text-[#080808]",
              day_today: "text-[#f0ece4] font-medium",
              day_disabled: "text-[#2a2a2a] cursor-not-allowed",
              day_outside: "opacity-30",
            }}
          />

          {selectedDate && !dayEntry && (
            <Button className="w-full mt-4" size="sm" onClick={handleAddDate}>
              <Plus className="h-3.5 w-3.5" />
              Add {format(selectedDate, "MMM d")} as available
            </Button>
          )}
        </div>

        {/* Slot editor */}
        <div className="border border-[#1c1c1c] p-5">
          <p className="text-xs tracking-[0.15em] uppercase text-[#888888] mb-4">
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
                      ? "border-[#c4a35a]/40 text-[#f0ece4] bg-[#c4a35a]/5"
                      : "border-[#1c1c1c] text-[#444444]"
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
            <p className="text-sm text-[#444444] text-center py-8">
              {selectedDate ? "This date has no slots yet." : "Select a date to manage slots."}
            </p>
          )}
        </div>

        {/* Active dates list */}
        <div className="border border-[#1c1c1c] p-5">
          <p className="text-xs tracking-[0.15em] uppercase text-[#888888] mb-4">
            Available Dates ({days.length})
          </p>
          {days.length === 0 ? (
            <p className="text-sm text-[#444444]">No dates set.</p>
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
                          ? "border-[#c4a35a]/40 bg-[#c4a35a]/5"
                          : "border-[#1c1c1c] hover:border-[#2a2a2a]"
                      )}
                      onClick={() => setSelectedDate(parseISO(day.date))}
                    >
                      <div>
                        <p className="text-sm text-[#f0ece4]">
                          {format(parseISO(day.date), "EEE, MMM d")}
                        </p>
                        <p className="text-[10px] text-[#666666] mt-0.5">
                          {openCount} slot{openCount !== 1 ? "s" : ""} open
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDate(day.date);
                        }}
                        className="text-[#2a2a2a] hover:text-red-500 transition-colors p-1"
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
