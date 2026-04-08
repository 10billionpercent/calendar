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
  if (!date) return <div className="w-10 h-10 md:w-11 md:h-11" />;

  const isStart = startDate && isSameDay(date, startDate);
  const isEnd = endDate && isSameDay(date, endDate);
  const isInRange = isDateInRange(date, startDate, endDate);
  const isSelected = isStart || isEnd || isInRange;
  const today = isToday(date);

  // LOGIC: Determine rounding based on position in range
  const getBorderRadius = () => {
    if (isStart && isEnd) return '8px'; // Single day selected
    if (isStart) return '8px 0 0 8px';  // Round left side
    if (isEnd) return '0 8px 8px 0';    // Round right side
    if (isInRange) return '0';          // Middle dates are flat squares
    return '8px';                       // Default unselected
  };

  const getBackgroundStyle = () => {
    if (isStart || isEnd) return { backgroundColor: accentColor };
    // Using a lighter opacity for the "bridge" between dates
    if (isInRange) return { backgroundColor: `${accentColor}33` }; 
    return {};
  };

  const getTextColor = () => {
    if (isStart || isEnd) return '#ffffff';
    if (theme === 'dark') return 'hsl(262, 10%, 95%)';
    return 'hsl(262, 15%, 15%)';
  };

  return (
    <button
      onClick={() => onClick(date)}
      onDoubleClick={() => onDoubleClick(date)}
      // Removed rounded-lg and added w-full to make them touch
      className="relative w-full md:h-11 flex items-center justify-center text-sm font-medium transition-all duration-150"
      style={{
        ...getBackgroundStyle(),
        borderRadius: getBorderRadius(),
      }}
    >
      <span className="relative z-10" style={{ color: getTextColor() }}>
        {date.getDate()}
      </span>
      
      {/* Today Indicator */}
      {today && !isSelected && (
        <span 
          className="absolute bottom-1.5 w-1 h-1 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      )}
      
      {/* Note Indicator */}
      {hasNote && (
        <span 
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full border-2 border-transparent"
          style={{ backgroundColor: isStart || isEnd ? 'white' : accentColor }}
        />
      )}
    </button>
  );
}