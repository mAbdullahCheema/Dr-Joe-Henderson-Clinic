import * as React from "react";
import { format, startOfToday, isSameDay, isBefore, startOfMonth, addMonths, eachDayOfInterval, endOfMonth, endOfWeek, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface CalendarSchedulerProps {
  onSelect: (date: Date, time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
  canProceed?: boolean;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
];

export function CalendarScheduler({ onSelect, selectedDate, selectedTime, canProceed }: CalendarSchedulerProps) {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(today));
  
  // Generate days for the current selected month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const availableDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDateSelect = (date: Date) => {
    onSelect(date, selectedTime || "");
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onSelect(selectedDate, time);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header and Month/Year Selection */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-headline font-bold text-primary flex items-center gap-2">
            <CalendarIcon className="size-5 text-on-secondary-container" />
            Select a Date
          </h4>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const prevMonth = addMonths(currentMonth, -1);
                if (!isBefore(prevMonth, startOfMonth(today))) {
                  setCurrentMonth(prevMonth);
                }
              }}
              disabled={isBefore(addMonths(currentMonth, -1), startOfMonth(today))}
              className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Month/Year Selection (Smooth Scroll, Highly Animated) */}
        <div className="overflow-x-auto pb-6 mb-2 scrollbar-none custom-scrollbar flex gap-3">
          {Array.from({ length: 12 }).map((_, i) => {
            const mDate = addMonths(startOfMonth(today), i);
            const isSelected = isSameDay(mDate, currentMonth);
            return (
              <button
                key={mDate.toISOString()}
                onClick={() => setCurrentMonth(mDate)}
                className={cn(
                  "flex-shrink-0 px-6 py-3 rounded-2xl border font-headline font-semibold transition-all duration-300",
                  isSelected
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "bg-surface-container-lowest border-outline-variant/10 text-on-surface-variant hover:border-primary/30 hover:bg-surface-container-low"
                )}
              >
                {format(mDate, "MMMM yyyy")}
              </button>
            );
          })}
        </div>
        
        <div className="grid grid-cols-7 gap-3 mt-4">
          {/* Day of week headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-2">
              {day}
            </div>
          ))}
          
          {availableDays.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, today);
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            const isPast = isBefore(day, today);
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            const isDisabled = isWeekend || isPast || !isCurrentMonth;

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isDisabled && handleDateSelect(day)}
                disabled={isDisabled}
                className={cn(
                  "flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300",
                  isSelected
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105 z-10"
                    : "bg-surface-container-lowest border-outline-variant/10 hover:border-primary/30 hover:bg-surface-container-low",
                  isDisabled && "opacity-30 cursor-not-allowed grayscale bg-transparent border-transparent",
                  !isSelected && isToday && "border-primary/50 text-primary"
                )}
              >
                <span className="text-lg font-headline font-extrabold">
                  {format(day, "d")}
                </span>
                {isToday && !isSelected && (
                  <div className="w-1 h-1 rounded-full bg-primary mt-1 absolute bottom-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className={cn("transition-all duration-500", !selectedDate && "opacity-30 pointer-events-none")}>
        <h4 className="text-lg font-headline font-bold text-primary flex items-center gap-2 mb-6">
          <Clock className="size-5 text-on-secondary-container" />
          Available Times
        </h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={cn(
                  "py-3 px-4 rounded-xl border font-body text-sm font-semibold transition-all duration-300",
                  isSelected
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105 z-10"
                    : "bg-surface-container-lowest border-outline-variant/10 hover:border-primary/30 hover:bg-surface-container-low text-on-surface-variant"
                )}
              >
                {time}
              </button>
            );
          })}
        </div>
        
        {!selectedDate && (
          <p className="text-sm text-on-surface-variant mt-4 italic">
            Please select a date first to see available times.
          </p>
        )}
      </div>
    </div>
  );
}
