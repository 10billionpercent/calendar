import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ theme, onToggle, accentColor }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
      style={{ 
        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" style={{ color: accentColor }} />
      ) : (
        <Sun className="w-5 h-5" style={{ color: accentColor }} />
      )}
    </button>
  );
}
