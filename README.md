# Game Studio

A collection of browser-based games built with vanilla JavaScript, HTML5 Canvas, and CSS.

## Games

### Game Starter
A simple arcade-style game where you dodge enemies and collect points.

- **Play:** Open `index.html` in a browser
- **Controls:** Arrow Keys to move
- **Objective:** Avoid red enemies, survive as long as possible

## Quick Start

1. Clone this repo
2. Open `index.html` directly in your browser
3. No server or installation required

Or use a simple local server:

```bash
python -m http.server 8000
```

Then visit: `http://localhost:8000`

## File Structure

```
.
├── index.html          # Main game (playable)
├── launch.html         # Launch/menu page
├── README.md           # This file
└── games/              # Game collection folder
    ├── starter-game/   # First game project
    │   ├── index.html
    │   ├── style.css
    │   └── game.js
    └── README.md
```

## Build & Run

Simplest way:
- Open `index.html` in any modern browser
- Click "Play" on the launch page

## Future Games

Planned additions:
- Platformer game
- Puzzle game
- Top-down shooter
- Multiplayer games
- Mobile-friendly games

## Development Notes

- All games run in the browser without external dependencies
- Uses HTML5 Canvas for rendering
- Vanilla JavaScript (no frameworks required)
- Mobile responsive design

## License

Free to use and modify.
