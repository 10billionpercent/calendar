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
