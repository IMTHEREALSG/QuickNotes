# QuickNotes

A simple and elegant note-taking application built with [Lit](https://lit.dev/) web components and styled with [Tailwind CSS](https://tailwindcss.com/).

## Features

- ✍️ **Create Notes**: Add notes with optional titles and content
- 🗂️ **View Modes**: Switch between grid and list layouts
- 💾 **Local Storage**: Notes are automatically saved to browser localStorage
- 🗑️ **Delete Notes**: Remove notes you no longer need
- 📱 **Responsive Design**: Works well on different screen sizes
- ⚡ **Fast & Lightweight**: Built with modern web components

## Tech Stack

- **[Lit](https://lit.dev/)** - Modern web components library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite](https://vite.dev/)** - Fast build tool and dev server
- **Vanilla JavaScript** - No heavy frameworks, just clean JS

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QuickNotes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

To build the application for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── counter.js          # Counter component (demo/example code)
├── main.js            # Original Vite entry point
├── notes_main.js      # Main QuickNotes app component
├── noteinput.js       # Note input form component
├── notes_list.js      # Notes display component
├── style.css          # Tailwind CSS imports
├── javascript.svg     # JavaScript logo
└── ...
```

## Components

### QuickNotesApp (`notes_main.js`)
The main application component that:
- Manages the global state of notes
- Handles switching between grid and list views
- Coordinates communication between child components
- Manages localStorage persistence

### NoteInput (`noteinput.js`)
Input form component that:
- Provides title and content input fields
- Handles note creation and validation
- Emits custom events for save/cancel actions
- Supports collapsible state

### NotesList (`notes_list.js`)
Display component that:
- Renders notes in grid or list layout
- Shows note creation dates
- Handles note deletion
- Displays "no notes" state when empty

## Usage

1. **Creating a Note**: Click on the input field, add a title (optional) and content, then click "Save"
2. **Viewing Notes**: Use the "Grid View" and "List View" buttons to change the layout
3. **Deleting Notes**: Click the "Delete" button on any note card

## Data Persistence

Notes are automatically saved to the browser's localStorage under the key `'qnotes'`. This means your notes will persist between browser sessions but are specific to each browser/device.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

