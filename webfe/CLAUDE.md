# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React frontend application built with TypeScript and Vite. It uses modern web development tools including Tailwind CSS for styling and Mantine UI components library.

## Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Preview production build
pnpm preview
```

## Architecture

### Technology Stack
- **React 19.1.1** with TypeScript
- **Vite** (rolldown-vite variant) for fast builds and dev server
- **Tailwind CSS** for utility-first styling
- **Mantine UI** component library (@mantine/core, @mantine/hooks)
- **TypeScript** with strict configuration
- **ESLint** for code linting

### Project Structure
```
src/
├── main.tsx          # Application entry point
├── App.tsx           # Main React component
├── index.css         # Global styles with Tailwind import
├── App.css           # Component-specific styles
└── assets/           # Static assets
```

### Key Configuration Files
- `vite.config.ts` - Vite build configuration with React and Tailwind plugins
- `tsconfig.app.json` - TypeScript configuration with strict mode enabled
- `eslint.config.js` - ESLint configuration for TypeScript and React

### Build Process
1. TypeScript compilation (`tsc -b`)
2. Vite build process with rolldown for optimization
3. Output to `dist/` directory

### Development Notes
- Uses React 19 with createRoot API
- TypeScript strict mode is enabled with comprehensive linting rules
- Tailwind CSS is integrated via Vite plugin
- Mantine UI library is the primary component library - use Mantine components for consistent UI
- Package manager is pnpm (use `pnpm` commands, not `npm`)
- **Do not generate comments while generating code unless super needed**
- **Always try to run `pnpm tsc` and `pnpm lint` to check the code and fix issues that occur after completing the task to make sure we have done the work completely and properly**
- Never runs `pnpm dev` script for checking as it open a service and won't stop so it take a long time to run

### Mantine UI Usage
- Import components from `@mantine/core` and hooks from `@mantine/hooks`
- Mantine provides comprehensive UI components (Button, TextInput, Modal, etc.)
- Use Mantine's theme system and styling props for consistent design
- Refer to Mantine documentation for component APIs and patterns