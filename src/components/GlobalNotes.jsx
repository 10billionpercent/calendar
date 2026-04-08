import { useState, useRef, useEffect } from 'react';
import { Trash2, StickyNote, Plus, X, Clock } from 'lucide-react'; // Added Clock icon
import { AnimatePresence, motion } from 'framer-motion';

export function GlobalNotes({ notes, onAdd, onDelete, accentColor, theme }) {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [viewingNote, setViewingNote] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isFocused && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  const handleSubmit = () => {
    if (content.trim()) {
      onAdd(content.trim(), Date.now());
      setContent('');
      setIsFocused(false);
    }
  };

  const formatTimestamp = (ts) => {
    const d = new Date(ts);
    const dateStr = d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    const timeStr = d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return { dateStr, timeStr };
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          key={theme}
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !content && setIsFocused(false)}
          placeholder="Add a global note."
          rows={isFocused ? 3 : 1}
          className="w-full p-3 pr-12 rounded-xl resize-none text-sm transition-all duration-300"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
            color: theme === 'dark' ? '#fff' : '#000',
            borderColor: isFocused ? accentColor : 'transparent',
            borderWidth: '2px',
            outline: 'none',
            minHeight: isFocused ? '100px' : '48px'
          }}
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-2 p-2 rounded-lg transition-all duration-300 active:scale-90"
          style={{ 
            backgroundColor: accentColor,
            opacity: content.trim() ? 1 : 0,
            pointerEvents: content.trim() ? 'auto' : 'none',
            transform: content.trim() ? 'scale(1)' : 'scale(0.8)'
          }}
        >
          <Plus className="w-5 h-5 text-black" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={note.id}
            >
              <button
                onClick={() => setViewingNote(note)}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ backgroundColor: `${accentColor}33` }}
              >
                <StickyNote className="w-5 h-5" style={{ color: accentColor }} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {viewingNote && (
          <div 
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            onClick={() => setViewingNote(null)}
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
                <div className="flex flex-col">
                  <h3 className="font-medium" style={{ color: accentColor }}>
                    {formatTimestamp(viewingNote.timestamp).dateStr}
                    &nbsp; {formatTimestamp(viewingNote.timestamp).timeStr}
                    </h3>
                </div>
                <button
                  onClick={() => setViewingNote(null)}
                  className="p-1 rounded hover:opacity-70 transition-opacity"
                >
                  <X className="w-5 h-5" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }} />
                </button>
              </div>
              
              <div className="p-4">
                <div 
                  className="w-full p-3 rounded-lg text-sm min-h-25 whitespace-pre-wrap"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    color: theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)',
                    borderColor: accentColor,
                    borderWidth: '2px'
                  }}
                >
                  {viewingNote.content}
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => {
                      onDelete(viewingNote.id);
                      setViewingNote(null);
                    }}
                    className="p-2 rounded-lg hover:bg-red-500/20 transition-colors group"
                  >
                    <Trash2 className="w-5 h-5 text-red-500/60 group-hover:text-red-500" />
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingNote(null)}
                      className="px-4 py-2 text-sm rounded-lg transition-all duration-150"
                      style={{
                        color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)'
                      }}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setViewingNote(null)}
                      className="px-4 py-2 text-sm rounded-lg font-medium transition-all duration-150 hover:opacity-90 active:scale-95"
                      style={{ 
                        backgroundColor: accentColor, 
                        color: theme === 'dark' ? 'hsl(262, 15%, 15%)' : 'hsl(262, 10%, 95%)' 
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}