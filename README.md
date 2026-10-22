# Nexora — Smart Productivity Dashboard

A bilingual (English / Arabic) productivity dashboard built with **vanilla HTML, CSS and JavaScript**: no frameworks, no libraries, no build step.

🔗 **Live demo:** _coming soon_

## Features

### ✓ Tasks
- Add, complete, edit (✎ or double-click) and delete tasks
- **Due dates** with "Today", "Tomorrow" and **Overdue** labels
- **Priorities**: click the badge to cycle high → medium → low
- **Drag & drop reordering** that works with mouse, touch and keyboard (focus the ⋮⋮ handle and use ↑ / ↓)
- **Undo** for deletes and "Delete completed"
- Live search plus status and priority filters
- Confetti celebration 🎉 when every task is done

### ▥ Insights
- Bar chart of tasks completed in the last 7 days
- Day streak, tasks completed today, focus minutes and completion rate
- Pending tasks broken down by priority

### ⌗ Calculator
- Correct operator precedence (`2+3*4 = 14`) using a custom expression parser instead of `eval()`
- Handles floating point noise (`0.1+0.2 = 0.3`), percentages, negative numbers and division by zero
- Full keyboard support

### ◷ Focus timer
- Animated progress ring, presets and a custom hours:minutes:seconds timer
- Uses the real clock, so it stays accurate when the tab is in the background
- Countdown in the browser tab title, a sound when it ends (Web Audio API), and a daily session counter

### ⌨ Keyboard shortcuts
| Key | Action |
|---|---|
| `N` | New task |
| `/` | Search tasks |
| `1` – `4` | Switch tools |
| `Space` | Start / pause the timer |
| `T` | Toggle theme |
| `L` | Switch language |
| `?` | Show all shortcuts |

Shortcuts use the physical key (`event.code`), so they also work with an Arabic keyboard layout.

### Interface
- English / Arabic with a full RTL layout, driven by `data-i18n` attributes
- Dark and light themes: follows the system setting on the first visit, then remembers your choice
- Responsive from small phones to large desktops
- Glassmorphism design with smooth animations and `prefers-reduced-motion` support
- Everything is saved in `localStorage`

## Tech

| | |
|---|---|
| Markup | Semantic HTML5, ARIA labels |
| Styling | CSS3: custom properties, Grid, Flexbox, keyframe animations, media queries |
| Logic | JavaScript (ES6+): DOM, event delegation, Pointer Events, Canvas (confetti), SVG, Web Audio API, `localStorage` |

## Run locally

Clone the repo and open `index.html` in your browser, or use the **Live Server** extension in VS Code.

## Author

**Amany Khaled**
