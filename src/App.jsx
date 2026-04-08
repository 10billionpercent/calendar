import { useState, useMemo } from "react";
import { Sparkles, Eraser, HelpCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Hooks & Utils
import { useCalendar } from "./hooks/useCalendar";
import { generateTheme } from "./utils/colorUtils";
import { formatDateKey } from "./utils/dateUtils";

// Components
import { HeroImage } from "./components/HeroImage";
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from "./components/CalendarGrid";
import { ColorPicker } from "./components/ColorPicker";
import { ThemeToggle } from "./components/ThemeToggle";
import { NotesSection } from "./components/NotesSection";
import { DateNoteEditor } from "./components/DateNoteEditor"; 

function App() {
  // 1. Move all local hooks to the TOP (Rule of Hooks)
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // 2. Custom Hook
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

  // 3. Memoized Styles
  const themeColors = useMemo(() => generateTheme(accentColor), [accentColor]);

  const textColor = theme === "dark" ? themeColors.lightText : themeColors.darkText;
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  const dynamicGradient = `
    radial-gradient(circle at 15% 15%, ${accentColor} 0%, transparent 45%), 
    radial-gradient(circle at 85% 15%, ${accentColor} 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 70%), 
    radial-gradient(circle at 85% 85%, ${accentColor} 0%, transparent 45%),
    radial-gradient(circle at 15% 85%, ${accentColor} 0%, transparent 45%),
    ${theme === 'dark' ? 'hsl(262, 20%, 2%)' : 'hsl(262, 20%, 98%)'}
  `;

  const handleDateDoubleClick = (date) => {
    openDateNoteEditor(formatDateKey(date), date);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-200 p-4 lg:p-12 flex items-center justify-center"
      style={{ background: dynamicGradient, backdropFilter: 'saturate(200%) brightness(1.2)', transition: 'background 0.7s ease-in-out, background-color 0.7s ease-in-out' }}
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
          <div className="lg:w-2/5 border-r" style={{ borderColor }}>
            <HeroImage
              src={heroImage}
              onUpload={handleHeroUpload}
              theme={theme}
              accentColor={accentColor}
            />
          </div>

          <div className="lg:w-3/5 flex flex-col relative">
            <div className="flex items-center justify-between px-6 py-4">
              <CalendarHeader currentMonth={currentMonth} theme={theme} /> 
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowHelp(true)}
                  className="p-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: `${accentColor}33` }}
                  title="Help & Shortcuts"
                >
                  <HelpCircle className="w-5 h-5" style={{ color: accentColor }} />
                </button>
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="p-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: `${accentColor}33` }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
                </button>
                <ThemeToggle theme={theme} onToggle={toggleTheme} accentColor={accentColor} />
              </div>
            </div>

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

              <div className="px-6 py-4 flex items-center justify-between border-t border-b" style={{ borderColor }}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: textColor }}>
                    {startDate ? (
                      <span>
                        {startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        {endDate && ` - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                      </span>
                    ) : (
                      <span className="opacity-60">Click to select range</span>
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
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, marginBottom: 20 }}
                    exit={{ height: 0, opacity: 0 }}
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

              {showHelp && (
                <div 
                  className="absolute inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-sm"
                  style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                  onClick={() => setShowHelp(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xs rounded-2xl p-6 shadow-2xl border"
                    style={{ 
                      backgroundColor: theme === 'dark' ? 'hsl(262, 10%, 18%)' : 'white',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold uppercase tracking-widest text-xs" style={{ color: accentColor }}>Quick Guide</h3>
                      <button onClick={() => setShowHelp(false)}>
                        <X className="w-4 h-4" style={{ color: theme === 'dark' ? 'white' : 'black' }} />
                      </button>
                    </div>
                    
                    <ul className="space-y-4 text-sm" style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>
                      <li className="flex gap-3">
                        <span className="font-bold" style={{ color: accentColor }}>•</span>
                        <p><span className="font-bold" style={{ color: theme === 'dark' ? 'white' : 'black' }}>Click:</span> Select range start/end</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold" style={{ color: accentColor }}>•</span>
                        <p><span className="font-bold" style={{ color: theme === 'dark' ? 'white' : 'black' }}>Double Click:</span> Add/edit date note or hero image</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold" style={{ color: accentColor }}>•</span>
                        <p><span className="font-bold" style={{ color: theme === 'dark' ? 'white' : 'black' }}>Long Press:</span> Shortcut for mobile interactions</p>
                      </li>
                    </ul>

                    <button 
                      onClick={() => setShowHelp(false)}
                      className="w-full mt-6 py-2 rounded-xl font-bold transition-all active:scale-95 hover:opacity-90"
                      style={{ backgroundColor: accentColor, color: theme === 'dark' ? '#000' : '#fff' }}
                    >
                      Got it!
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;