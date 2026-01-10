# Users Dashboard

A modern React TypeScript dashboard application for browsing, searching, and sorting users from the JSONPlaceholder API. Built with a mobile-first responsive design and featuring real-time search with debouncing, comprehensive sorting options, and theme support.

## 🚀 Features

### Core Functionality
- **User Browsing**: Fetch and display users from JSONPlaceholder API
- **Advanced Search**: Real-time search across multiple fields (name, username, email, phone, address, website, company) with 300ms debounce delay
- **Flexible Sorting**: Sort users by name, username, email, phone, address, company, or website in ascending/descending order
- **Theme Support**: Toggle between light and dark themes with persistence using localStorage
- **Responsive Design**: Mobile-first approach that works seamlessly on all screen sizes
  - Mobile: Single column layout
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large screens: 4 columns

### User Experience
- Loading states with spinner animations
- Error handling with retry functionality
- Empty states with contextual messages
- Smooth animations and transitions
- Accessible UI components with ARIA labels

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server

### State Management
- **Redux Toolkit** - Predictable state management
  - Users slice for user data and sorting
  - Search slice for search functionality
  - Theme slice for theme management
  - Loading slice for loading states

### UI & Styling
- **Material-UI (MUI)** - Component library for form inputs
- **SCSS** - Styling with variables, mixins, and functions
- **CSS Grid & Flexbox** - Responsive layouts

### Utilities
- **Custom Hooks**: `useDebounce`, `useLocalStorage`, `reduxHooks`
- **Path Aliases**: Clean imports with `constants`, `types`, `utils`, `store`, `hooks`
- **Barrel Exports**: Organized module exports

## 📦 Installation

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd users-dashboard
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Development

### Start Development Server

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable UI components
│   │   ├── Button.tsx      # Custom button component
│   │   ├── EmptyState.tsx  # Empty state message
│   │   ├── ErrorState.tsx  # Error display with retry
│   │   ├── LoadingState.tsx # Loading spinner
│   │   └── Spinner.tsx      # Loading spinner component
│   └── dashboard/      # Dashboard-specific components
│       ├── UsersDashboard.tsx   # Main dashboard component
│       ├── UsersToolbar.tsx     # Search and sort controls
│       └── UsersList/           # User list components
│           ├── UsersList.tsx    # User list container
│           └── UsersListItem.tsx # Individual user card
│
├── constants/          # Application constants
│   ├── texts.ts       # Text constants and labels
│   ├── theme.ts       # Theme values (light/dark)
│   ├── store.ts       # Redux store constants
│   ├── sortOptions.ts # Sort configuration
│   └── sortConfig.ts  # Sort field definitions
│
├── hooks/             # Custom React hooks
│   ├── useDebounce.ts      # Debounce hook for search
│   ├── useLocalStorage.ts  # LocalStorage sync hook
│   └── reduxHooks.ts       # Typed Redux hooks
│
├── store/             # Redux store and slices
│   ├── store.ts           # Store configuration
│   ├── usersSlice.ts      # Users data and sorting
│   ├── searchSlice.ts     # Search functionality
│   ├── themeSlice.ts      # Theme management
│   ├── loadingSlice.ts    # Loading states
│   └── storeState.ts      # State type definitions
│
├── styles/            # SCSS stylesheets
│   ├── abstracts/     # Variables, mixins, functions
│   ├── base/          # Base styles and resets
│   ├── components/    # Component-specific styles
│   ├── layout/        # Layout styles
│   └── animations/    # CSS animations
│
├── types/             # TypeScript type definitions
│   ├── user.ts            # User data types
│   ├── store.ts           # Redux store types
│   ├── storeState.ts      # State slice types
│   ├── theme.ts           # Theme type
│   ├── uiProps.ts         # UI component props
│   └── userProps.ts       # User component props
│
├── utils/             # Utility functions
│   ├── localStorage.ts    # LocalStorage helper
│   └── textUtils.ts       # Text formatting utilities
│
├── App.tsx            # Root app component
└── main.tsx           # Application entry point
```

## 🏗️ Architecture

### State Management

The application uses Redux Toolkit for state management with four main slices:

1. **Users Slice** (`usersSlice.ts`)
   - Manages user data fetched from API
   - Handles user sorting by various fields
   - Provides filtered users selector

2. **Search Slice** (`searchSlice.ts`)
   - Manages search term state
   - Persists search to localStorage

3. **Theme Slice** (`themeSlice.ts`)
   - Manages light/dark theme
   - Persists theme preference to localStorage

4. **Loading Slice** (`loadingSlice.ts`)
   - Tracks loading state during API calls

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `constants` → `src/constants`
- `types` → `src/types`
- `utils` → `src/utils`
- `store` → `src/store`
- `hooks` → `src/hooks`
- `components/common` → `src/components/common`

Example:
```typescript
// Instead of: import { User } from "../../../types/user"
import type { User } from "types";

// Instead of: import { USER_CARD_EMAIL_LABEL } from "../../../constants/texts"
import { USER_CARD_EMAIL_LABEL } from "constants";
```

### Component Structure

- **Dashboard Component**: Main container that orchestrates all features
- **Toolbar Component**: Search input and sort dropdown
- **List Components**: Display filtered and sorted users in responsive grid
- **Common Components**: Reusable UI components for states (loading, error, empty)

## 🎨 Styling

- **SCSS** with BEM methodology
- **CSS Variables** for theming
- **Responsive Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Grid Layout** for equal-height cards on desktop
- **Mobile-first** approach

## 🔍 Features in Detail

### Search
- Real-time search with 300ms debounce
- Searches across: name, username, email, phone, address, website, company
- Case-insensitive matching
- Persisted in localStorage

### Sorting
- Sort by: Name, Username, Email, Phone, Address, Company, Website
- Each field supports ascending and descending order
- Visual indicators for current sort field

### Theme
- Light and dark mode support
- Theme preference saved in localStorage
- Smooth transitions between themes
- MUI theme integration

## 📝 Development Notes

- All imports use path aliases (no relative paths)
- Type safety enforced throughout
- Barrel exports for clean module organization
- Comprehensive inline comments for code clarity

## 🚀 Build

The production build generates optimized static assets:

```bash
npm run build
```

Output directory: `dist/`

## 📄 License

This project is private.
