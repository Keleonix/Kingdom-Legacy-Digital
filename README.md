# Kingdom Legacy (Digital Fan Adaptation)

This project is a **non-commercial digital fan adaptation** of the board game **Kingdom Legacy**, originally designed by Jonathan Fryxelius and published by FryxGames / Intrafin.  

It provides an **interactive card game interface** built with **React, TypeScript, and drag-and-drop mechanics**, allowing players to manage cards, resources, and campaign progress online.

---

## ✨ Features

- **Interactive Card Zones**
  - Deck, Discard, Play Area, Blocked, Permanent, Campaign, and Destroy zones.
  - Drag & Drop support between zones.
  - Mobile-friendly tap actions for editing and upgrading cards.

- **Card Editor & Popups**
  - Inspect and edit any card (resources, effects, upgrades, checkboxes).
  - Preview both front/back sides of cards.
  - Upgrade cards with resource costs.
  - Manage checkboxes (e.g., resources, markers, or progress).

- **Resource Pool Management**
  - Track resources dynamically.
  - Increment/decrement with buttons or enter values directly.

- **Game Flow Tools**
  - Start new turns, draw cards, discard, shuffle, and end rounds.
  - Special campaign features: preview campaign deck, shuffle subsets, move top discard to deck.

- **Save & Load**
  - Save your game progress (by “Kingdom name”) to local storage.
  - Load or continue a saved game.
  - Reset game state with fail-safe confirmation.

- **Built-in Modals**
  - **Guide**: Links to official rules + instructions for digital controls.
  - **About**: Credits, acknowledgments, and disclaimer.
  - **Discard / Deck Preview**: Browse full discard or deck contents in modal view.

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** components (`Button`, `Card`, etc.)
- **react-dnd** with `HTML5Backend` for drag & drop
- **LocalStorage** for save/load functionality

---

## 🚀 Getting Started

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

## 📖 Usage

- Drag cards between zones to play, discard, or block them.
- Tap a card (on mobile) or right-click (on desktop) to open the Card Editor.
- Use checkboxes for tracking progress or conditions.
- Manage resources via the pool at the bottom.
- Save/Load kingdoms via the Settings modal.
- Follow the rules from the official rulebook: [Full Rules (PDF)](https://fryxgames.se/wp-content/uploads/2023/12/FK-Rules-Small.pdf)

## 📂 Project Structure

    src/
     ├── App.tsx        # Main game implementation
     ├── types.ts       # GameCard class, types, constants (resources, effects, etc.)
     ├── cards.ts       # Card definitions
     └── components/    # UI components (buttons, cards)
    public/
     ├── effects/       # Effect icons
     └── resources/     # Resource icons

## 🎨 Credits

- **Original Game Design:** Jonathan Fryxelius  
- **Publisher:** FryxGames / Intrafin  
- **Digital Fan Adaptation:** Keleonix  
- **Assets:** Freepik, Smashicons  
- **Playtesting:** Keleonix  

## ⚠️ Disclaimer

This is an **unofficial fan project**.  
It is **not affiliated with, endorsed by, or sponsored by FryxGames, Intrafin, or Jonathan Fryxelius**.  
All rights to the original **Kingdom Legacy** game, rules, and artwork remain with their respective copyright holders.
