# JSON to Excel Converter

A powerful Next.js application that converts nested JSON data into structured Excel tables with intuitive section management, editing capabilities, and export functionality.

## Features

### Core Functionality
- **JSON Input**: Support for both text paste and file upload (.json)
- **JSON Parsing**: Validates and parses JSON with clear error messages
- **Nested JSON Support**: Handles deeply nested objects and arrays
- **Flattening**: Automatically flattens nested structures using dot notation

### Table Features
- **Interactive Table**: Sort, filter, and edit data directly in the table
- **Column Management**: Rename columns, resize, and reorder
- **Row Operations**: Delete rows, edit cells inline
- **Real-time Filtering**: Filter columns with instant search

### Section Management
- **Logical Grouping**: Organize columns into logical sections
- **Drag & Drop**: Intuitive drag-and-drop for sections and columns
- **Section Operations**:
  - Add new sections
  - Merge sections
  - Delete sections
  - Reorder sections
- **Visual Organization**: Clear visual hierarchy with section headers

### Excel Export
- **Single Sheet Mode**: All data in one sheet with section headers
- **Multi Sheet Mode**: One sheet per section
- **Styled Output**: Professional formatting with header styling
- **Auto-sizing**: Columns automatically sized for readability

### User Experience
- **Undo/Redo**: Full history support (10 steps)
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Toast Notifications**: Clear feedback for all actions
- **Error Handling**: Graceful error handling with user-friendly messages

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Input JSON**: Paste JSON text or upload a .json file
2. **Parse**: Click "Parse JSON" to process the data
3. **Organize**: Create sections and drag columns to organize logically
4. **Edit**: Click cells to edit, use filters to find data, sort columns
5. **Export**: Choose single or multi-sheet mode and export to Excel

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Excel Export**: xlsx (SheetJS)
- **Drag & Drop**: react-beautiful-dnd
- **Notifications**: react-hot-toast
- **Icons**: lucide-react

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with toast provider
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── JsonInput.tsx       # JSON input component
│   ├── DataTable.tsx       # Interactive table component
│   ├── SectionManager.tsx  # Section management UI
│   └── DragDropWrapper.tsx # SSR wrapper for drag-drop
├── lib/
│   ├── jsonParser.ts       # JSON parsing and flattening
│   ├── excelExporter.ts    # Excel export functionality
│   └── history.ts          # Undo/redo history management
└── package.json
```

## Features in Detail

### JSON Parsing
- Handles arrays of objects
- Supports nested objects
- Flattens arrays with indexed notation
- Preserves data types

### Section Management
- Visual drag-and-drop interface
- Merge sections with conflict resolution
- Reorder sections to match Excel layout
- Unassigned columns area for organization

### Excel Export
- Professional formatting
- Header styling
- Auto-sized columns
- Support for large datasets (up to Excel's row limit)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Performance

- Handles JSON files up to 10MB
- Optimized parsing for large datasets
- Efficient rendering with React optimizations
- Client-side processing (no server required)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

