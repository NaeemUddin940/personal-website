"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // আপনার যদি cn ইউটিলিটি থাকে
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
// ইন্টারফেস ডিফাইন করুন
interface DatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export const DatePicker = ({
  selectedDate,
  setSelectedDate,
}: DatePickerProps) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  console.log(selectedDate);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];
    // Previous Month Days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        month: month - 1,
        year,
        isCurrentMonth: false,
      });
    }
    // Current Month Days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, month: month, year, isCurrentMonth: true });
    }
    // Next Month Days
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({ day: i, month: month + 1, year, isCurrentMonth: false });
    }
    return days;
  }, [viewDate]);

  const handleDateSelect = (d: any) => {
    const newDate = new Date(d.year, d.month, d.day);
    setSelectedDate(newDate);
    setOpen(false); // তারিখ সিলেক্ট করলে পপওভার বন্ধ হবে
  };

  return (
    <div className="w-full">
      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 ml-1 text-muted-foreground">
        Select Date
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="sm:w-full md:w-55">
          <div className="rounded-lg px-3 py-3 w-full flex items-center justify-between cursor-pointer border bg-muted border-border shadow-sm hover:border-primary/50 transition-all">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-GB")
                  : "Choose a date"}
              </span>
            </div>
            {selectedDate && (
              <X
                className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDate(null);
                }}
              />
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-82.5 p-0 border-none shadow-none"
          align="start"
        >
          <div className="rounded-xl border bg-card shadow-lg overflow-hidden border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-2 py-2 border-b border-muted">
              <button
                onClick={() =>
                  setViewDate(
                    new Date(
                      viewDate.getFullYear(),
                      viewDate.getMonth() - 1,
                      1,
                    ),
                  )
                }
                className="p-1.5 hover:bg-muted rounded"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h3 className="text-xs font-bold">
                {months[viewDate.getMonth()]} {viewDate.getFullYear()}
              </h3>
              <button
                onClick={() =>
                  setViewDate(
                    new Date(
                      viewDate.getFullYear(),
                      viewDate.getMonth() + 1,
                      1,
                    ),
                  )
                }
                className="p-1.5 hover:bg-muted rounded"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-2">
              <div className="grid grid-cols-7 mb-1">
                {daysOfWeek.map((day, i) => (
                  <div
                    key={i}
                    className="text-center text-[10px] font-bold text-muted-foreground py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px">
                {calendarDays.map((d, index) => {
                  const isSel =
                    selectedDate?.getDate() === d.day &&
                    selectedDate?.getMonth() === d.month &&
                    selectedDate?.getFullYear() === d.year;
                  const isTod =
                    new Date().toDateString() ===
                    new Date(d.year, d.month, d.day).toDateString();

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(d)}
                      className={cn(
                        "relative h-8 w-full flex items-center justify-center text-[11px] font-medium rounded-md transition-all",
                        isSel
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                        !d.isCurrentMonth && "text-muted-foreground/40",
                      )}
                    >
                      {d.day}
                      {isTod && !isSel && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-2 flex justify-between items-center border-t bg-muted/30 border-border">
              <button
                onClick={() => {
                  const n = new Date();
                  setSelectedDate(n);
                  setViewDate(n);
                  setOpen(false);
                }}
                className="text-[10px] font-bold text-primary px-2 py-1"
              >
                Today
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-[10px] font-bold text-muted-foreground px-2 py-1"
              >
                Close
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
