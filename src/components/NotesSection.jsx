import { GlobalNotes } from './GlobalNotes';
import { DateNoteEditor } from './DateNoteEditor';

export function NotesSection({
  globalNotes,
  dateNotes,
  activeNoteEditor,
  theme,
  accentColor,
  onAddGlobalNote,
  onDeleteGlobalNote,
  onOpenDateNote,
  onCloseDateNote,
  onSaveDateNote,
}) {
  return (
    <>
      <div className="space-y-4">
        <div>
          <h3 
            className="text-sm font-medium mb-3"
            style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}
          >
            Notes
          </h3>
          <GlobalNotes
            notes={globalNotes}
            onAdd={onAddGlobalNote}
            onDelete={onDeleteGlobalNote}
            accentColor={accentColor}
            theme={theme}
          />
        </div>
        
        {Object.keys(dateNotes).length > 0 && (
          <div>
            <h3 
              className="text-sm font-medium mb-3"
              style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}
            >
              Date Notes
            </h3>
            <div className="space-y-2">
              {Object.entries(dateNotes).map(([dateKey, note]) => (
                <div
                  key={dateKey}
                  className="p-3 cursor-pointer group"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                  }}
                  onClick={() => onOpenDateNote(dateKey)}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-sm font-medium"
                      style={{ color: accentColor }}
                    >
                      {new Date(dateKey).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span 
                      className="text-xs opacity-50 group-hover:opacity-100"
                      style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }}
                    >
                      Click to edit
                    </span>
                  </div>
                  <p 
                    className="text-sm mt-1 line-clamp-2"
                    style={{ color: theme === 'dark' ? 'hsl(262, 10%, 95%)' : 'hsl(262, 15%, 15%)' }}
                  >
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeNoteEditor && (
        <DateNoteEditor
          date={new Date(activeNoteEditor)}
          existingNote={dateNotes[activeNoteEditor]}
          onSave={(content) => onSaveDateNote(activeNoteEditor, content)}
          onCancel={onCloseDateNote}
          accentColor={accentColor}
          theme={theme}
        />
      )}
    </>
  );
}
