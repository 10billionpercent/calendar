import { Check } from 'lucide-react';
import { PRESET_COLORS } from '../constants/colors';

export function ColorPicker({ selected, theme, onChange }) {
  return (
    <div className="space-y-3">
      <h4         
      style={{ color: theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)' }}
> Select an accent color </h4>
      <div className="grid grid-cols-8 gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color.hex}
            onClick={() => onChange(color.hex)}
            className="w-7 h-7 rounded-full transition-all duration-150 hover:scale-110 relative group"
            style={{ 
              backgroundColor: color.hex,
              boxShadow: selected === color.hex 
                ? `0 0 0 2px white, 0 0 0 4px ${color.hex}` 
                : 'none'
            }}
            title={color.name}
          >
            {selected === color.hex && (
              <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-md" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
