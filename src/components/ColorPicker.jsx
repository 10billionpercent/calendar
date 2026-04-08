import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PRESET_COLORS } from '../constants/colors';

export function ColorPicker({ selected, theme, onChange }) {
  // ringColor is used for both the gap and the check icon now
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
              className="w-8 h-8 rounded-full transition-all duration-500 relative flex items-center justify-center group"
              style={{ 
                backgroundColor: color.hex,
                // The gap ring transitions perfectly with the theme
                boxShadow: isSelected 
                  ? `0 0 0 2px ${ringColor}, 0 0 0 4px ${color.hex}` 
                  : 'none',
                transition: 'box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease'
              }}
              title={color.name}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Check 
                      className="w-4 h-4" 
                      style={{ 
                        color: ringColor, // Matches the ring color
                        transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)' // THE FIX: Syncs with theme fade
                      }} 
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