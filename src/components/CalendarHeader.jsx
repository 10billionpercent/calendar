import { formatMonthYear } from '../utils/dateUtils';

export function CalendarHeader({ 
  currentMonth, 
  theme 
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-opacity-20"
      style={{ 
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }}
    >
      <h2 
        className="text-xl md:text-2xl font-semibold"
        style={{ color: theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)' }}
      >
        {formatMonthYear(currentMonth)}
      </h2>
    </div>
  );
}
