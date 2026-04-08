import { useMemo } from "react";
import { Calendar, Sparkles, Eraser } from "lucide-react";
import { useCalendar } from "./hooks/useCalendar";
import { generateTheme } from "./utils/colorUtils";
import { formatDateKey } from "./utils/dateUtils";
import { HeroImage } from "./components/HeroImage";
import { CalendarGrid } from "./components/CalendarGrid";
import { ColorPicker } from "./components/ColorPicker";
import { ThemeToggle } from "./components/ThemeToggle";
import { NotesSection } from "./components/NotesSection";

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
    goToPrevMonth,
    goToNextMonth,
    handleDateClick,
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

  const bgColor = theme === "dark" ? themeColors.darkBg : themeColors.lightBg;
  const textColor =
    theme === "dark" ? themeColors.lightText : themeColors.darkText;
  const borderColor =
    theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  const handleDateDoubleClick = (date) => {
    openDateNoteEditor(formatDateKey(date));
  };

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="md:flex items-stretch">
          <div className="md:w-2/5 flex-1 p-4 md:p-6 space-y-4">
            <HeroImage
              src={heroImage}
              onUpload={handleHeroUpload}
              theme={theme}
              accentColor={accentColor}
            />
          </div>

          <div className="md:w-3/5 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-4 md:p-6 space-y-4">
                <div
                  className="rounded-xl overflow-hidden shadow-lg"
                  style={{
                    backgroundColor:
                      theme === "dark" ? "hsl(262, 10%, 16%)" : "white",
                    boxShadow:
                      theme === "dark"
                        ? "0 4px 20px rgba(0,0,0,0.4)"
                        : "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <CalendarGrid
                    currentMonth={currentMonth}
                    startDate={startDate}
                    endDate={endDate}
                    dateNotes={dateNotes}
                    accentColor={accentColor}
                    theme={theme}
                    onPrev={goToPrevMonth}
                    onNext={goToNextMonth}
                    onDateClick={handleDateClick}
                    onDateDoubleClick={handleDateDoubleClick}
                  />

                  <div
                    className="px-4 py-3 flex items-center justify-between border-t"
                    style={{ borderColor }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{ color: textColor }}
                      >
                        <Calendar
                          className="w-4 h-4"
                          style={{ color: accentColor }}
                        />
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
                          <span className="opacity-60">
                            Click to select range
                          </span>
                        )}
                      </div>

                      {(startDate || endDate) && (
                        <button
                          onClick={() => {}}
                          className="p-1.5 rounded transition-opacity hover:opacity-70"
                          style={{ backgroundColor: accentColor + "20" }}
                          title="Clear selection"
                        >
                          <Eraser
                            className="w-4 h-4"
                            style={{ color: accentColor }}
                          />
                        </button>
                      )}
                    </div>

                    <ThemeToggle
                      theme={theme}
                      onToggle={toggleTheme}
                      accentColor={accentColor}
                    />
                  </div>
                </div>

                <div
                  className="rounded-xl p-4 shadow-lg"
                  style={{
                    backgroundColor:
                      theme === "dark" ? "hsl(262, 10%, 16%)" : "white",
                    boxShadow:
                      theme === "dark"
                        ? "0 4px 20px rgba(0,0,0,0.4)"
                        : "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles
                      className="w-4 h-4"
                      style={{ color: accentColor }}
                    />
                    <h3
                      className="text-sm font-medium"
                      style={{ color: textColor }}
                    >
                      Accent Color
                    </h3>
                  </div>
                  <ColorPicker
                    selected={accentColor}
                    onChange={setAccentColor}
                  />
                </div>

                <div
                  className="rounded-xl p-4 shadow-lg"
                  style={{
                    backgroundColor:
                      theme === "dark" ? "hsl(262, 10%, 16%)" : "white",
                    boxShadow:
                      theme === "dark"
                        ? "0 4px 20px rgba(0,0,0,0.4)"
                        : "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
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
              </div>

              <footer
                className="px-6 py-4 text-center text-xs border-t"
                style={{
                  borderColor,
                  color:
                    theme === "dark"
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(0,0,0,0.3)",
                }}
              >
                Double-click dates to add notes. Click twice to select a date
                range.
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
