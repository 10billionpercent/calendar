import { useState, useEffect, useCallback } from 'react';
import { addMonths, formatDateKey, parseDateKey } from '../utils/dateUtils';
import { DEFAULT_ACCENT } from '../constants/colors';

const STORAGE_KEYS = {
  ACCENT: 'calendar_accent_color',
  THEME: 'calendar_theme',
  HERO: 'calendar_hero_image',
  NOTES: 'calendar_global_notes',
  DATE_NOTES: 'calendar_date_notes',
  RANGE: 'calendar_range',
};

// Helper to handle localStorage safely
function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // FIX: Lazy initializers to avoid "setState in useEffect" error
  const [startDate, setStartDate] = useState(() => {
    const savedRange = loadFromStorage(STORAGE_KEYS.RANGE, null);
    return savedRange?.start ? parseDateKey(savedRange.start) : null;
  });

  const [endDate, setEndDate] = useState(() => {
    const savedRange = loadFromStorage(STORAGE_KEYS.RANGE, null);
    return savedRange?.end ? parseDateKey(savedRange.end) : null;
  });

  const [accentColor, setAccentColor] = useState(() => 
    loadFromStorage(STORAGE_KEYS.ACCENT, DEFAULT_ACCENT)
  );
  
  const [theme, setTheme] = useState(() => 
    loadFromStorage(STORAGE_KEYS.THEME, 'dark')
  );
  
  const [heroImage, setHeroImage] = useState(() => 
    loadFromStorage(STORAGE_KEYS.HERO, null)
  );
  
  const [globalNotes, setGlobalNotes] = useState(() => 
    loadFromStorage(STORAGE_KEYS.NOTES, [])
  );
  
  const [dateNotes, setDateNotes] = useState(() => 
    loadFromStorage(STORAGE_KEYS.DATE_NOTES, {})
  );

  const [activeNoteEditor, setActiveNoteEditor] = useState(null);
  const [isPostingNote, setIsPostingNote] = useState(false);

  // --- Persistence Effects ---

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACCENT, accentColor);
  }, [accentColor]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.HERO, heroImage);
  }, [heroImage]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.NOTES, globalNotes);
  }, [globalNotes]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.DATE_NOTES, dateNotes);
  }, [dateNotes]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.RANGE, { 
      start: startDate ? formatDateKey(startDate) : null, 
      end: endDate ? formatDateKey(endDate) : null 
    });
  }, [startDate, endDate]);

  // --- Handlers ---

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, -1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, 1));
  }, []);

  const handleDateClick = useCallback((date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  }, [startDate, endDate]);

  const clearRange = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  const handleHeroUpload = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setHeroImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const removeHeroImage = useCallback(() => {
    setHeroImage(null);
  }, []);

  const addGlobalNote = useCallback((content) => {
    if (!content.trim()) return;
    
    const newNote = {
      id: Date.now(),
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setGlobalNotes(prev => [newNote, ...prev]);
    setIsPostingNote(false);
  }, []);

  const deleteGlobalNote = useCallback((id) => {
    setGlobalNotes(prev => prev.filter(note => note.id !== id));
  }, []);

  const openDateNoteEditor = useCallback((dateKey, dateObj) => {
    // Passing both key and obj so the editor knows which date to display
    setActiveNoteEditor({ dateKey, dateObj });
  }, []);

  const closeDateNoteEditor = useCallback(() => {
    setActiveNoteEditor(null);
  }, []);

  const saveDateNote = useCallback((dateKey, content) => {
    if (content.trim()) {
      setDateNotes(prev => ({
        ...prev,
        [dateKey]: content.trim()
      }));
    } else {
      setDateNotes(prev => {
        const next = { ...prev };
        delete next[dateKey];
        return next;
      });
    }
    setActiveNoteEditor(null);
  }, []);

  const deleteDateNote = useCallback((dateKey) => {
    setDateNotes(prev => {
      const next = { ...prev };
      delete next[dateKey];
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return {
    currentMonth,
    startDate,
    endDate,
    accentColor,
    theme,
    heroImage,
    globalNotes,
    dateNotes,
    activeNoteEditor,
    isPostingNote,
    goToPrevMonth,
    goToNextMonth,
    handleDateClick,
    clearRange,
    setAccentColor,
    handleHeroUpload,
    removeHeroImage,
    addGlobalNote,
    deleteGlobalNote,
    openDateNoteEditor,
    closeDateNoteEditor,
    saveDateNote,
    deleteDateNote,
    toggleTheme,
    setIsPostingNote,
  };
}