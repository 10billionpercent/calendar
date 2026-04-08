import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function DateNoteEditor({ 
  date, 
  existingNote, 
  onSave, 
  onCancel, 
  accentColor,
  theme 
}) {
  const [content, setContent] = useState(existingNote || '');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSave(content);
    }
  };

  const formatDateDisplay = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme === 'dark' ? 'hsl(262, 10%, 18%)' : 'white'
        }}
      >
        <div 
          className="px-4 py-3 flex items-center justify-between border-b"
          style={{ 
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}
        >
          <h3 className="font-medium" style={{ color: accentColor }}>
            {formatDateDisplay(date)}
          </h3>
          <button
            onClick={onCancel}
            className="p-1 rounded hover:opacity-70 transition-opacity"
          >
            <X className="w-5 h-5" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }} />
          </button>
        </div>
        
        <div className="p-4">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a note for this day..."
            rows={4}
            className="w-full p-3 rounded-lg resize-none text-sm"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              color: theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)',
              borderColor: accentColor,
              borderWidth: '2px',
              outline: 'none'
            }}
          />
          
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-lg transition-all duration-150"
              style={{
                color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)'
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(content)}
              className="px-4 py-2 text-sm rounded-lg font-medium transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: accentColor, color: 'white' }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
