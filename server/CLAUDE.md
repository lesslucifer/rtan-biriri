# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS server application written in TypeScript. The project is in early development stages with the basic NestJS structure established but no business logic implemented yet.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Development mode with hot reload
pnpm run dev

# Build the project
pnpm run build

# Run production build
pnpm run start

# Run linting with auto-fix
pnpm run lint

# Format code with Prettier
pnpm run format

# Run tests
pnpm run test              # Unit tests
pnpm run test:watch        # Watch mode
pnpm run test:cov          # Coverage report
pnpm run test:e2e          # End-to-end tests
```

## Architecture

The codebase follows NestJS modular architecture patterns:

- **Entry Point**: `src/main.ts` - Application bootstrap
- **Root Module**: `src/app.module.ts` - Main application module
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Modules**: Organize related functionality with dependency injection

### Current Structure
```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
├── app.controller.ts    # Root controller
├── app.service.ts       # Root service
└── app.controller.spec.ts # Controller tests

test/
├── app.e2e-spec.ts      # E2E tests
└── jest-e2e.json        # E2E test configuration
```

### Key Patterns
- **Dependency Injection**: Services are injected into controllers via constructors
- **Decorators**: Used for routing (`@Controller`, `@Get`), dependency injection (`@Injectable`), and module organization (`@Module`)
- **Observables**: Uses RxJS for reactive programming patterns
- **TypeScript**: Strict typing throughout the codebase

## Code Quality

- **ESLint**: Configured with TypeScript support using flat config format
- **Prettier**: Enforces consistent formatting (single quotes, trailing commas)
- **TypeScript**: Targets ES2023 with strict mode enabled
- **Testing**: Jest with ts-jest for TypeScript support

## Development Notes

- The project uses pnpm as the package manager
- Build output goes to `dist/` directory
- The application runs on port 3000 by default
- All source files should be in the `src/` directory
- Test files follow the pattern `*.spec.ts` for unit tests and `*.e2e-spec.ts` for e2e tests