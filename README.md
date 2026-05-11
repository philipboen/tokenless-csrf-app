## Authentication SPA (Tokenless CSRF)

A modern, session-based React Single Page Application showcasing a tokenless CSRF authentication approach. Built with React, Vite, TypeScript, and TanStack Router.

### Setup & Installation

Follow these steps to get the project up and running locally.

#### Prerequisites

- Node.js (v22 or higher recommended)
- A package manager (`bun` or `pnpm`)
- `.env` file

#### 1. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
# Or using bun
bun install

# Or using pnpm
pnpm install
```

#### 2. Create a `.env` file

Create a `.env` file in the root of the project and add the following environment variables:

```env
VITE_API_BASE_URL=
```

#### 3. Start the Development Server

Once the dependencies are installed, you can start the Vite development server:

```bash
# Using bun
bun run dev

# Using pnpm
pnpm run dev

```

The application will be served locally, typically at `http://localhost:5173/`. Your browser should be able to access the app using that link.
