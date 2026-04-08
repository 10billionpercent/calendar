import { isSameDay, isDateInRange, isToday } from '../utils/dateUtils';

export function DateCell({
  date,
  startDate,
  endDate,
  hasNote,
  accentColor,
  theme,
  onClick,
  onDoubleClick,
}) {
  if (!date) {
    return <div className="w-10 h-10 md:w-11 md:h-11" />;
  }

  const isStart = startDate && isSameDay(date, startDate);
  const isEnd = endDate && isSameDay(date, endDate);
  const isInRange = isDateInRange(date, startDate, endDate);
  const today = isToday(date);

  const getBackgroundStyle = () => {
    if (isStart || isEnd) {
      return { backgroundColor: accentColor };
    }
    if (isInRange) {
      return { backgroundColor: accentColor + '66' }; // 40% opacity
    }
    return {};
  };

  const getTextColor = () => {
    if (isStart || isEnd) {
      return '#ffffff';
    }
    if (theme === 'dark') {
      return 'hsl(262, 10%, 95%)';
    }
    return 'hsl(262, 15%, 15%)';
  };

  return (
    <button
      onClick={() => onClick(date)}
      onDoubleClick={() => onDoubleClick(date)}
      className="relative w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95"
      style={getBackgroundStyle()}
    >
      <span style={{ color: getTextColor() }}>
        {date.getDate()}
      </span>
      
      {today && !isStart && !isEnd && (
        <span 
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      )}
      
      {hasNote && (
        <span 
          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      )}
    </button>
  );
}
