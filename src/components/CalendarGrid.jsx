import { CalendarHeader } from './CalendarHeader';
import { DateCell } from './DateCell';
import { getMonthDays, formatDateKey } from '../utils/dateUtils';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarGrid({
  currentMonth,
  startDate,
  endDate,
  dateNotes,
  accentColor,
  theme,
  onDateClick,
  onDateDoubleClick,
}) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const allDays = getMonthDays(year, month);

  const displayDays = allDays[35] === null && allDays.length > 35 
    ? allDays.slice(0, 35) 
    : allDays;

  return (
    <div className="flex flex-col">
      <CalendarHeader
        currentMonth={currentMonth}
        theme={theme}
      />
      
      <div className="p-4">
        <div className="grid grid-cols-7">
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              className="w-full md:w-11 flex items-center justify-center text-xs font-medium"
              style={{ 
                color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
              }}
            >
              {label}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-x-0 gap-y-2"> 
          {displayDays.map((date, index) => (
            <DateCell
              key={index}
              date={date}
              startDate={startDate}
              endDate={endDate}
              hasNote={date ? !!dateNotes[formatDateKey(date)] : false}
              accentColor={accentColor}
              theme={theme}
              onClick={onDateClick}
              onDoubleClick={onDateDoubleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
