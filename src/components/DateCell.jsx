import { useRef } from 'react';
import { isSameDay, isDateInRange } from '../utils/dateUtils';

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
  const timerRef = useRef(null);
  const isLongPress = useRef(false);

  const handlePointerDown = (e) => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      onDoubleClick(date); 
            if (window.navigator.vibrate) window.navigator.vibrate(50);
    }, 500); 
  };

  const handlePointerUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleClick = (e) => {
    if (!isLongPress.current) {
      onClick(date);
    }
  };


  if (!date) return <div className="w-full py-2 h-12" />;

  const isStart = startDate && isSameDay(date, startDate);
  const isEnd = endDate && isSameDay(date, endDate);
  const isInRange = isDateInRange(date, startDate, endDate);

  const getBorderRadius = () => {
    if (isStart && isEnd) return '8px';

    if (isStart && !endDate) return '8px 0 0 8px'; 
    
    if (isStart) return '8px 0 0 8px';
    if (isEnd) return '0 8px 8px 0';
    if (isInRange) return '0';
    
    return '8px';
  };

  const getBackgroundStyle = () => {
    if (isStart || isEnd) return { backgroundColor: accentColor };
    if (isInRange) return { backgroundColor: `${accentColor}33` }; 
    return {};
  };

  const getTextColor = () => {
    if (isStart || isEnd) return 'hsl(262, 10%, 15%)';
    if (theme === 'dark') return 'hsl(262, 10%, 95%)';
    return 'hsl(262, 15%, 15%)';
  };

  return (
    <button
      onClick={handleClick}
      onDoubleClick={() => onDoubleClick(date)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full py-2 flex items-center justify-center text-sm font-medium transition-all duration-150"
      style={{
        ...getBackgroundStyle(),
        borderRadius: getBorderRadius(),
      }}
    >
      <div 
        className={`
          flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200
          ${hasNote ? 'border-2' : 'border-transparent'}
        `}
        style={{ 
          borderColor: hasNote 
            ? (isStart || isEnd ? 'hsl(262, 10%, 15%)' : accentColor) 
            : 'transparent' 
        }}
      >
        <span className="relative z-10" style={{ color: getTextColor() }}>
          {date.getDate()}
        </span>
      </div>
    </button>
  );
}