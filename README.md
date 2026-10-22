# Nexora — Smart Productivity Dashboard

A bilingual (English / Arabic) productivity dashboard built with **vanilla HTML, CSS and JavaScript**: no frameworks and no build step.

🔗 **Live demo:** _coming soon_

## Features

**Tasks**
- Add, complete, edit (✎ button or double-click) and delete tasks
- Priorities (high / medium / low) with color badges
- Live search plus status and priority filters
- Progress ring and stats (total / done / pending)
- Data is saved in `localStorage`, so tasks survive a page refresh

**Calculator**
- Correct operator precedence (`2+3*4 = 14`) using a custom expression parser instead of `eval()`
- Handles floating point noise (`0.1+0.2 = 0.3`), percentages, negative numbers and division by zero
- Full keyboard support (digits, `+ - * /`, `Enter`, `Backspace`, `Esc`)

**Focus timer**
- Presets (5 / 15 / 25 / 45 min) and a custom hours:minutes:seconds timer
- Uses the real clock, so it stays accurate even when the tab is in the background
- Shows the countdown in the browser tab title and plays a sound when it finishes (Web Audio API)

**Interface**
- English / Arabic with full RTL layout, driven by `data-i18n` attributes
- Dark and light themes (remembered between visits)
- Responsive from small phones to large desktops
- Glassmorphism design with subtle animations and `prefers-reduced-motion` support

## Tech

| | |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3: custom properties, Grid, Flexbox, media queries |
| Logic | JavaScript (ES6+): DOM, events, event delegation, `localStorage`, Web Audio API |

## Run locally

Clone the repo and open `index.html` in your browser, or use the **Live Server** extension in VS Code.

## Author

**Amany Khaled**
