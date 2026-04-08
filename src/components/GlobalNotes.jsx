import { useState, useRef, useEffect } from 'react';
import { Send, X, Trash2 } from 'lucide-react';
import { formatDateKey } from '../utils/dateUtils';

export function GlobalNotes({ notes, onAdd, onDelete, accentColor, theme }) {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isFocused && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  const handleSubmit = () => {
    if (content.trim()) {
      onAdd(content);
      setContent('');
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
    if (e.key === 'Escape') {
      setIsFocused(false);
      setContent('');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !content && setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Add a note... (Cmd+Enter to post)"
          rows={3}
          className="w-full p-3 rounded-lg resize-none text-sm transition-all duration-200"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            color: theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)',
            borderColor: isFocused ? accentColor : 'transparent',
            borderWidth: '2px',
            outline: 'none'
          }}
        />
        
        {isFocused && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => { setIsFocused(false); setContent(''); }}
              className="p-1.5 rounded hover:opacity-70 transition-opacity"
              style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: accentColor, color: 'white' }}
            >
              <Send className="w-3.5 h-3.5" />
              Post
            </button>
          </div>
        )}
      </div>

      {notes.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-lg group relative"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
              }}
            >
              <p 
                className="text-sm whitespace-pre-wrap"
                style={{ color: theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)' }}
              >
                {note.content}
              </p>
              <p 
                className="text-xs mt-2 opacity-50"
                style={{ color: theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)' }}
              >
                {formatTimestamp(note.timestamp)}
              </p>
              <button
                onClick={() => onDelete(note.id)}
                className="absolute top-2 right-2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)' }}
              >
                <Trash2 className="w-3.5 h-3.5" style={{ color: '#F43F5E' }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
