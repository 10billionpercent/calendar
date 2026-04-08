# Interactive Personalized Calendar — SPEC.md

## 1. Concept & Vision

A premium, wall-mounted digital calendar that feels personal and alive. Users don't just view dates—they curate their time with custom images, color themes, and meaningful notes. The experience should feel like a beautifully designed productivity tool, not a basic date picker.

---

## 2. Design Language

### Aesthetic Direction
Clean, modern, and warm. Inspired by premium productivity apps like Linear and Notion—minimal chrome, generous whitespace, purposeful color.

### Color Palette (HSL-Based Dynamic System)

**Core Accent Colors (User Selectable):**
- Coral `#FF6B6B` → HSL(0°, 100%, 71%)
- Amber `#FFB347` → HSL(33°, 100%, 65%)
- Lime `#84CC16` → HSL(84°, 70%, 55%)
- Emerald `#10B981` → HSL(160°, 84%, 39%)
- Sky `#0EA5E9` → HSL(199°, 89%, 48%)
- Violet `#8B5CF6` → HSL(262°, 83%, 58%)
- Rose `#F43F5E` → HSL(350°, 89%, 60%)
- Slate `#64748B` → HSL(215°, 16%, 47%)
- Custom picker option

**Dynamic Theme Variations (Generated from Accent):**
- Light background: HSL(H, 15%, 94%) — warm off-white
- Dark background: HSL(H, 10%, 12%) — deep charcoal
- Light text: HSL(H, 10%, 95%)
- Dark text: HSL(H, 15%, 15%)
- Accent mid: HSL(H, S%, 50%) — the selected color
- Accent light: HSL(H, S%, 85%) — highlights, selections
- Accent dark: HSL(H, S%, 35%) — pressed states

### Typography
- **Primary Font**: Inter (Google Fonts) — clean, modern, highly legible
- **Fallback**: system-ui, -apple-system, sans-serif
- **Scale**:
  - Month title: 24px/600
  - Day labels: 14px/500
  - Date numbers: 16px/400
  - Notes: 14px/400
  - Small indicators: 10px/500

### Spatial System
- Base unit: 4px
- Component padding: 16px (4 units)
- Section gaps: 24px (6 units)
- Border radius: 8px (cards), 4px (buttons), 50% (indicators)
- Max content width: 1200px

### Motion Philosophy
- Subtle, purposeful transitions only
- Theme changes: 200ms ease-out
- Hover states: 150ms ease
- No bouncy or playful animations
- Focus on micro-feedback: slight scale on date hover

### Visual Assets
- Icons: Lucide React (lightweight, consistent)
- Default hero image: Abstract gradient or calendar illustration
- User uploads: Stored as base64 in localStorage
- Note indicator: Small filled circle (6px)

---

## 3. Layout & Structure

### Mobile Layout (< 768px) — Vertical Stack
```
┌─────────────────────────┐
│       Hero Image        │  200px height, full width
│    (double-click upload)│
├─────────────────────────┤
│   Month Nav  | Theme    │  Sticky header
├─────────────────────────┤
│   S  M  T  W  T  F  S   │  Day labels
│   [Calendar Grid 7x6]  │
├─────────────────────────┤
│   Notes Section         │  Expandable
│   - Global notes        │
│   - Date-specific notes │
└─────────────────────────┘
```

### Desktop Layout (≥ 768px) — Split View
```
┌──────────────────────────────────────────────────┐
│  Hero Image (40%)  │  Calendar + Notes (60%)    │
│                    │  ┌─────────────────────┐   │
│  (double-click     │  │ Month Nav | Theme   │   │
│   to upload)       │  ├─────────────────────┤   │
│                    │  │ S  M  T  W  T  F  S │   │
│                    │  │ [Calendar Grid]    │   │
│                    │  ├─────────────────────┤   │
│                    │  │ Notes Section       │   │
│                    │  └─────────────────────┘   │
└──────────────────────────────────────────────────┘
```

### Responsive Strategy
- Breakpoint: 768px
- Fluid typography within bounds
- Touch targets: minimum 44px on mobile
- No horizontal scroll at any viewport

---

## 4. Features & Interactions

### 4.1 Hero Image
- **Default**: Display placeholder gradient or Unsplash image
- **Double-click**: Opens file picker (accept: image/*)
- **On upload**: Replace with user image, store as base64
- **Hover state**: Subtle overlay with upload icon hint
- **Responsive**: Full width on mobile, left 40% on desktop

### 4.2 Calendar Grid
- Display current month by default
- 7 columns (Sun-Sat), up to 6 rows
- Day labels: S M T W T F S
- Navigation: < Previous | Month Year | Next >
- Each date cell: 44px minimum touch target

### 4.3 Date Range Selection
- **First click**: Sets start date (solid accent fill)
- **Second click**: Sets end date (solid accent fill)
- **Range highlight**: Middle dates get accent at 40% opacity
- **Clear**: Click same date again, or new first click resets
- **Edge cases**:
  - Clicking end before start swaps them
  - Single date = start = end
  - Range persists until explicitly cleared

### 4.4 Accent Color System
- **Presets**: 12-16 color swatches in a grid (4x4)
- **Custom**: Color picker input for hex value
- **Active state**: Ring around selected color
- **Application**: All accent elements use this color
- **Persistence**: Save to localStorage

### 4.5 Theme Toggle
- Light/Dark toggle button (sun/moon icon)
- Smooth transition on toggle
- Accent color adapts to both themes
- Persist preference in localStorage

### 4.6 Global Notes
- **Location**: Below calendar
- **UI**: Single textarea, placeholder "Add a note..."
- **Focus behavior**: Show "Post" button on focus
- **Post action**: 
  - Save to localStorage
  - Show saved note with delete option
  - Hide textarea
- **Multiple notes**: Stack vertically with timestamps
- **Delete**: Small X button on hover

### 4.7 Per-Date Notes
- **Trigger**: Double-click on date cell
- **UI**: Small modal/popover with textarea
- **Single editor**: Only one date editor open at a time
- **Save**: Store note with date key
- **Indicator**: Small accent dot on dates with notes
- **Click outside**: Cancel without saving

### 4.8 State Management
All state lives in a single `useCalendar` hook:

```javascript
{
  currentMonth: Date,        // Currently viewed month
  startDate: Date | null,     // Range start
  endDate: Date | null,       // Range end
  accentColor: string,        // Hex color
  theme: 'light' | 'dark',
  heroImage: string | null,   // Base64 or URL
  globalNotes: Note[],
  dateNotes: Record<string, string>, // 'YYYY-MM-DD': note
  activeNoteEditor: string | null,  // Date string or null
  isPostingNote: boolean
}
```

---

## 5. Component Inventory

### `App.jsx`
- Root component
- Provides theme context
- Manages primary state
- Renders layout

### `HeroImage.jsx`
- Props: `src`, `onUpload`, `theme`
- States: default, hover, loading
- Double-click handler for upload

### `CalendarHeader.jsx`
- Props: `month`, `onPrev`, `onNext`, `accentColor`
- Displays month/year, navigation arrows

### `CalendarGrid.jsx`
- Props: `currentMonth`, `startDate`, `endDate`, `dateNotes`, `onDateClick`, `onDateDoubleClick`, `accentColor`
- Renders day labels + date cells
- Determines which dates are in range

### `DateCell.jsx`
- Props: `date`, `isInRange`, `isStart`, `isEnd`, `hasNote`, `isToday`, `accentColor`, `onClick`, `onDoubleClick`
- States: default, hover, selected, in-range, today

### `ColorPicker.jsx`
- Props: `selected`, `onChange`, `accentColor`
- Grid of preset swatches
- Custom color input
- Shows selected state

### `ThemeToggle.jsx`
- Props: `theme`, `onToggle`, `accentColor`
- Sun/Moon icon button
- Smooth icon transition

### `GlobalNotes.jsx`
- Props: `notes`, `onAdd`, `onDelete`, `accentColor`
- Textarea with conditional Post button
- List of saved notes

### `DateNoteEditor.jsx`
- Props: `date`, `note`, `onSave`, `onCancel`, `accentColor`
- Small modal/popover
- Textarea + Save/Cancel buttons

### `NotesSection.jsx`
- Container for GlobalNotes and date note handling

---

## 6. Technical Approach

### Framework & Build
- **React 18+** with Vite
- **Tailwind CSS v3** for styling
- **lucide-react** for icons

### Key Utilities
```javascript
// Hex to HSL conversion
function hexToHSL(hex) { ... }

// Generate theme colors from accent
function generateTheme(accentHex) {
  return {
    accent: accentHex,
    accentLight: hslString(h, s, 85),
    accentMid: hslString(h, s, 50),
    accentDark: hslString(h, s, 35),
    lightBg: hslString(h, 15, 94),
    darkBg: hslString(h, 10, 12),
    lightText: hslString(h, 10, 95),
    darkText: hslString(h, 15, 15)
  };
}

// Date utilities
function getDaysInMonth(year, month) { ... }
function getFirstDayOfMonth(year, month) { ... }
function isSameDay(date1, date2) { ... }
function isDateInRange(date, start, end) { ... }
function formatDateKey(date) { ... } // 'YYYY-MM-DD'
```

### localStorage Keys
- `calendar_accent_color`: string (hex)
- `calendar_theme`: 'light' | 'dark'
- `calendar_hero_image`: string (base64)
- `calendar_global_notes`: JSON array
- `calendar_date_notes`: JSON object
- `calendar_range`: { start: string, end: string } | null

### File Structure
```
src/
├── main.jsx
├── App.jsx
├── index.css
├── hooks/
│   └── useCalendar.js
├── utils/
│   ├── colorUtils.js
│   └── dateUtils.js
├── components/
│   ├── HeroImage.jsx
│   ├── CalendarHeader.jsx
│   ├── CalendarGrid.jsx
│   ├── DateCell.jsx
│   ├── ColorPicker.jsx
│   ├── ThemeToggle.jsx
│   ├── GlobalNotes.jsx
│   ├── DateNoteEditor.jsx
│   └── NotesSection.jsx
└── constants/
    └── colors.js
```

---

## 7. Acceptance Criteria

- [ ] Calendar displays correct month, navigates forward/back
- [ ] Date range selection highlights correctly
- [ ] Color picker updates all accent elements
- [ ] Theme toggle works, accent adapts
- [ ] Hero image uploads and displays
- [ ] Global notes save/delete
- [ ] Per-date notes save, show indicator
- [ ] All state persists across refresh
- [ ] Mobile layout is usable
- [ ] Desktop layout matches spec
- [ ] No console errors
- [ ] Touch targets ≥ 44px on mobile
