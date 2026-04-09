import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PRESET_COLORS } from '../constants/colors';

export function ColorPicker({ selected, theme, onChange }) {
  const ringColor = theme === 'dark' ? 'hsl(262, 10%, 16%)' : '#ffffff';
  const textColor = theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)';

  return (
    <div className="space-y-3">
      <h4         
        className="text-xs font-bold uppercase tracking-widest opacity-70 transition-colors duration-500"
        style={{ color: textColor }}
      > 
        Select an accent color 
      </h4>
      <div className="grid grid-cols-8 gap-2">
        {PRESET_COLORS.map((color) => {
          const isSelected = selected === color.hex;
          
          return (
            <button
              key={color.hex}
              onClick={() => onChange(color.hex)}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full relative flex items-center justify-center group outline-none"
              style={{ 
                backgroundColor: color.hex,
                boxShadow: isSelected 
                  ? `0 0 0 2px ${ringColor}, 0 0 0 4px ${color.hex}` 
                  : '0 0 0 0px transparent',
                transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease'
              }}
              title={color.name}
            >
              <AnimatePresence mode="wait">
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 45, opacity: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    className="flex items-center justify-center pointer-events-none"
                  >
                    <Check 
                      className="w-4 h-4 stroke-[3px]" 
                      style={{ color: ringColor }} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}