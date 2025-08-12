# Hallini Project Structure

This Angular project follows a well-organized folder structure with clear separation of concerns.

## Project Structure

```
src/app/
├── core/                          # Core application modules (singletons)
│   ├── constants/                 # Application constants
│   │   ├── app.constants.ts       # API endpoints, roles, storage keys
│   │   └── index.ts               # Barrel export
│   ├── guards/                    # Route guards
│   │   ├── auth.guard.ts          # Authentication guard
│   │   ├── role.guard.ts          # Role-based access guard
│   │   └── index.ts               # Barrel export
│   ├── interceptors/              # HTTP interceptors
│   │   ├── auth.interceptor.ts    # JWT token interceptor
│   │   └── index.ts               # Barrel export
│   ├── models/                    # TypeScript interfaces/types
│   │   ├── api.model.ts           # API response types
│   │   ├── auth.model.ts          # Authentication types
│   │   ├── user.model.ts          # User-related types
│   │   └── index.ts               # Barrel export
│   ├── services/                  # Singleton services
│   │   ├── auth.service.ts        # Authentication service
│   │   ├── sidebar.service.ts     # Sidebar state management
│   │   └── index.ts               # Barrel export
│   └── utils/                     # Utility functions
│       ├── storage.util.ts        # LocalStorage utilities
│       ├── validation.util.ts     # Form validation utilities
│       └── index.ts               # Barrel export
├── features/                      # Feature-specific modules
│   └── (future feature modules)
├── shared/                        # Shared components, directives, pipes
│   ├── navbar/                    # Navigation bar component
│   └── sidebar/                   # Sidebar component
├── main-layout/                   # Main layout component
├── app-routing.module.ts          # Application routing
├── app.component.*                # Root component
└── app.module.ts                  # Root module
```

## Key Features

### Authentication System
- JWT-based authentication
- User management with role-based access
- Auth guards for route protection
- Automatic token injection via HTTP interceptor

### State Management
- Sidebar state management service
- User session persistence
- Observable-based state updates

### Type Safety
- Comprehensive TypeScript interfaces
- Strongly typed API responses
- Role-based type system

### Utilities
- Storage utilities for localStorage
- Form validation utilities
- Reusable constants

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   ng serve
   ```

3. Build for production:
   ```bash
   ng build --prod
   ```

## Architecture Principles

1. **Single Responsibility**: Each file/class has one clear purpose
2. **Separation of Concerns**: Core, features, and shared modules are clearly separated
3. **Reusability**: Common functionality is extracted to shared utilities
4. **Type Safety**: Strong typing throughout the application
5. **Maintainability**: Well-organized structure for easy navigation and updates

## Next Steps

- Add feature modules under `features/` folder
- Implement authentication pages (login, register)
- Add more guards and interceptors as needed
- Create additional shared components
