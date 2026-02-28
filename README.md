# Kingdom Legacy (Digital Fan Adaptation)

This project is a **non-commercial digital fan adaptation** of the board game **Kingdom Legacy**, originally designed by Jonathan Fryxelius and published by FryxGames / Intrafin.  

It provides an **interactive card game interface** built with **React, TypeScript, and drag-and-drop mechanics**, allowing players to manage cards, resources, and campaign progress online.

---

## Features

- **Interactive Card Zones**
  - Deck, Discard, Play Area, Blocked, Permanent, Campaign, and Destroy zones.
  - Mobile-friendly tap actions for interactions.
  - (Debug) Drag & Drop support between zones.

- **Card Editor & Popups**
  - Preview both front/back sides of cards.
  - Upgrade cards with resource costs.
  - (Debug)Inspect and edit any card (resources, effects, upgrades, checkboxes).
  - (Debug) Manage checkboxes (e.g., resources, markers, or progress).

- **Resource Pool Management**
  - Track resources dynamically.
  - (Debug) Increment/decrement with buttons or enter values directly.

- **Game Flow Tools**
  - Start new turns, draw cards, discard, shuffle, and end rounds.
  - (Debug) Preview campaign deck, shuffle subsets, move top discard to deck.

- **Save & Load**
  - Save your game progress (by “Kingdom name”) to local storage.
  - Load or continue a saved game.
  - Reset game state with fail-safe confirmation.

- **Built-in Modals**
  - **Guide**: Links to official rules + instructions for digital controls.
  - **About**: Credits, acknowledgments, and disclaimer.
  - **Discard / Deck Preview**: Browse full discard or deck contents in modal view.

---

## Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** components (`Button`, `Card`, etc.)
- **react-dnd** with `HTML5Backend` for drag & drop
- **LocalStorage** for save/load functionality

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/kingdom-legacy-digital.git
cd kingdom-legacy-digital
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Follow the rules from the official rulebook: [Full Rules (PDF)](https://fryxgames.se/wp-content/uploads/2023/12/FK-Rules-Small.pdf)
- Left click on productions/effects/upgrades to activate diverse effects.
- Select choices on pop-ups
- Play until end of base game and select extensions.
- Save/Load kingdoms via the Settings modal.

## Project Structure

    src/
     ├── App.tsx        # Main game implementation
     ├── types.ts       # GameCard class, types, constants (resources, effects, etc.)
     ├── cards.ts       # Card definitions
     ├── components.ts  # UI components (buttons, cards)
     ├── expansions.ts  # Expansions data
     ├── i18n.tsw       # Text data
     └── tutorial.tsx   # Tutorial scenes
    public/
     ├── effects/       # Effect icons
     ├── badges/        # cards illustrations
     ├── languages/     # Country flags
     ├── resources/     # Resource icons
     └── seals/         # Extension seals

## Credits

- **Original Game Design:** Jonathan Fryxelius  
- **Publisher:** FryxGames / Intrafin  
- **Digital Fan Adaptation:** Keleonix  
- **Assets:** Freepik, Smashicons  
- **Playtesting:** Keleonix  

## Disclaimer

This is an **unofficial fan project**.  
It is **not affiliated with, endorsed by, or sponsored by FryxGames, Intrafin, or Jonathan Fryxelius**.  
All rights to the original **Kingdom Legacy** game, rules, and artwork remain with their respective copyright holders.

## Known bugs

- Cards don't look at bonus production (bandit (14) for example, won't see the scientist as a valid source) => Refactoring needed on getResources from context rather than cards for actual value checks
- Interraction between 44 and 141 make it so lands don't produce double swords
