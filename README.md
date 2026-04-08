🗓️ Interactive Wall Calendar

A responsive, interactive calendar component built with React and Tailwind CSS, designed to combine clean UI, intuitive interactions, and strong personalization.

This project reimagines a traditional wall calendar as a modern, interactive product — focusing not just on functionality, but on how the experience feels to use.

---

✨ Core Highlights

- 🎯 Personalization-first design
- 🎨 Dynamic accent-based UI system
- 🧠 Thoughtful interaction design (not just static UI)
- 📱 Fully responsive across devices
- ⚡ Clean, minimal, and intuitive user experience

---

🎨 Personalization (Primary Focus)

This project heavily prioritizes user personalization, making the interface feel adaptable rather than fixed.

- Multiple preset accent colors
- Accent color applied consistently across:
  - Date highlights
  - UI elements
  - Buttons and interactions
- Visual coherence maintained across themes

The goal was to move beyond a generic calendar and create something that feels user-owned and customizable.

---

📅 Calendar & Date Range Selection

- Monthly calendar grid with proper alignment
- Click to select start and end dates
- Automatic highlighting of the selected range

Visual System:

- Start date → solid accent color
- End date → solid accent color
- Intermediate dates → softer accent (reduced opacity)

This creates clear visual hierarchy and improves readability.

---

🖼️ Hero Image Interaction

- Dedicated hero section inspired by physical wall calendars
- Double-click to upload a custom image
- Acts as a visual anchor for the entire layout

This adds a layer of personalization beyond just colors.

---

📝 Notes System

Global Notes

- Minimal textarea for general notes
- “Add” button appears only on interaction (focus-based UX)
- Keeps interface clean when not in use

Per-Date Notes

- Double-click any date to add a note
- Only one note editor open at a time (prevents clutter)
- Dates with notes are visually marked

This introduces contextual interaction without overwhelming the UI.

---

🌙 Theme Support

- Light/Dark mode toggle
- Accent color system 
- Maintains readability and visual consistency

---

📱 Responsive Design

Designed with a mobile-first approach:

Mobile

- Vertical stacking:
  - Hero image
  - Calendar
  - Notes

Desktop

- Horizontal layout:
  - Hero | (Calendar | Notes)

Ensures usability across all screen sizes without compromising layout clarity.

---

🧠 Design Philosophy

This project focuses on:

- Clarity over complexity
- Minimal UI with meaningful interactions
- Consistency through design systems (accent-based styling)
- User control through personalization
- Reducing friction in interaction flows

Instead of overloading features, emphasis was placed on making each feature feel intentional and usable.

---

🛠️ Tech Stack

- React – Component-based architecture
- Tailwind CSS – Rapid styling and responsive design
- LocalStorage – Lightweight persistence for user data

---

⚙️ How to Run Locally

git clone 
cd calendar
npm install
npm run dev

---

🚀 Live Demo

Deployed on GitHub Pages:
👉 https://10billionpercent.github.io/calendar/

---

🧩 Scope & Decisions

- No backend (frontend-focused implementation)
- Calendar logic handled entirely on client-side
- Focused on UX and interaction rather than feature overload
- Avoided unnecessary complexity to maintain clarity and stability

---

📸 Screenshots

<!-- Add screenshots here -->---

---

📌 Final Note

This project was built with the intention of going beyond a basic component — aiming instead to create a small, self-contained product experience that balances usability, aesthetics, and personalization.