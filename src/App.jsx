import { useState, useMemo } from "react";
import { Sparkles, Eraser } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendar } from "./hooks/useCalendar";
import { generateTheme } from "./utils/colorUtils";
import { formatDateKey } from "./utils/dateUtils";
import { HeroImage } from "./components/HeroImage";
import { CalendarGrid } from "./components/CalendarGrid";
import { ColorPicker } from "./components/ColorPicker";
import { ThemeToggle } from "./components/ThemeToggle";
import { NotesSection } from "./components/NotesSection";
import { DateNoteEditor } from "./components/DateNoteEditor"; // Added this import

function App() {
  const {
    currentMonth,
    startDate,
    endDate,
    accentColor,
    theme,
    heroImage,
    globalNotes,
    dateNotes,
    activeNoteEditor,
    handleDateClick,
    clearRange,
    setAccentColor,
    handleHeroUpload,
    addGlobalNote,
    deleteGlobalNote,
    openDateNoteEditor,
    closeDateNoteEditor,
    saveDateNote,
    toggleTheme,
  } = useCalendar();

  const themeColors = useMemo(() => generateTheme(accentColor), [accentColor]);

  const textColor =
    theme === "dark" ? themeColors.lightText : themeColors.darkText;
  const borderColor =
    theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  const handleDateDoubleClick = (date) => {
    openDateNoteEditor(formatDateKey(date));
  };

  const [showColorPicker, setShowColorPicker] = useState(false);

  const dynamicGradient = `
  radial-gradient(circle at 15% 15%, ${accentColor} 0%, transparent 45%), 
  radial-gradient(circle at 85% 15%, ${accentColor} 0%, transparent 45%),
  radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 70%), 
  radial-gradient(circle at 85% 85%, ${accentColor} 0%, transparent 45%),
  radial-gradient(circle at 15% 85%, ${accentColor} 0%, transparent 45%),
  ${theme === 'dark' ? 'hsl(262, 20%, 2%)' : 'hsl(262, 20%, 98%)'}
`;

  return (
    <div
      className="min-h-screen transition-colors duration-200 p-4 lg:p-12 flex items-center justify-center"
      style={{ background: dynamicGradient, backdropFilter: 'saturate(200%) brightness(1.2)' }}
    >
      <div className="max-w-6xl w-full mx-auto">
        <div
          className="flex flex-col lg:flex-row overflow-hidden shadow-2xl"
          style={{
            backgroundColor: theme === "dark" ? "hsl(262, 10%, 16%)" : "white",
            borderRadius: "24px",
            boxShadow: theme === "dark" 
              ? "0 20px 50px rgba(0,0,0,0.5)" 
              : "0 20px 50px rgba(0,0,0,0.1)",
          }}
        >
          {/* Left Side: Hero Image */}
          <div className="lg:w-2/5 border-r" style={{ borderColor }}>
            <HeroImage
              src={heroImage}
              onUpload={handleHeroUpload}
              theme={theme}
              accentColor={accentColor}
            />
          </div>

          {/* Right Side: Calendar & Notes (RELATIVE for Note Editor) */}
          <div className="lg:w-3/5 flex flex-col relative"> 
            <div className="flex-1">
              <CalendarGrid
                currentMonth={currentMonth}
                startDate={startDate}
                endDate={endDate}
                dateNotes={dateNotes}
                accentColor={accentColor}
                theme={theme}
                onDateClick={handleDateClick}
                onDateDoubleClick={handleDateDoubleClick}
              />

              <div
                className="px-6 py-4 flex items-center justify-between border-t border-b"
                style={{ borderColor }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: textColor }}
                  >
                    {startDate ? (
                      <span>
                        {startDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        {endDate &&
                          ` - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                      </span>
                    ) : (
                      <span className="opacity-80">Click to select range</span>
                    )}
                  </div>

                  {(startDate || endDate) && (
                    <button
                      onClick={clearRange}
                      className="p-1.5 rounded-md transition-all hover:scale-110 active:scale-95"
                      style={{ backgroundColor: accentColor + "20" }}
                      title="Clear selection"
                    >
                      <Eraser className="w-4 h-4" style={{ color: accentColor }} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="p-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                    style={{ backgroundColor: `${accentColor}33` }}
                  >
                    <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
                  </button>
                  <ThemeToggle
                    theme={theme}
                    onToggle={toggleTheme}
                    accentColor={accentColor}
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                    animate={{ height: "auto", opacity: 1, marginBottom: 20 }}
                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-xl border" style={{ borderColor }}>
                      <ColorPicker selected={accentColor} theme={theme} onChange={setAccentColor} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <NotesSection
                globalNotes={globalNotes}
                dateNotes={dateNotes}
                activeNoteEditor={activeNoteEditor}
                theme={theme}
                accentColor={accentColor}
                onAddGlobalNote={addGlobalNote}
                onDeleteGlobalNote={deleteGlobalNote}
                onOpenDateNote={openDateNoteEditor}
                onCloseDateNote={closeDateNoteEditor}
                onSaveDateNote={saveDateNote}
              />
            </div>

            <AnimatePresence>
              {activeNoteEditor && (
                <DateNoteEditor
                  date={activeNoteEditor.dateObj}
                  existingNote={dateNotes[activeNoteEditor.dateKey]}
                  onSave={(content) => saveDateNote(activeNoteEditor.dateKey, content)}
                  onCancel={closeDateNoteEditor}
                  accentColor={accentColor}
                  theme={theme}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;