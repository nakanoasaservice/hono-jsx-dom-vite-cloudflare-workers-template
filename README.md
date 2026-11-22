# Hono JSX DOM x Vite+ x Cloudflare Workers Template

A modern full-stack template for building web applications with Hono, JSX DOM, Vite+, and Cloudflare Workers. This template provides a seamless development experience with type-safe API calls between client and server.

## Features

- **Hono**: Fast and lightweight web framework
- **JSX DOM**: React-like components without React, using Hono's JSX DOM
- **Vite+**: Unified build, development, test, lint and formatting tools
- **Cloudflare Workers**: Edge computing platform
- **TypeScript**: Full type safety across client and server
- **Type-safe API**: End-to-end type safety with Hono Client

## Tech Stack

- [Hono](https://hono.dev/) - Web framework
- [Hono JSX DOM](https://hono.dev/docs/jsx/dom) - JSX runtime for DOM
- [Vite+](https://viteplus.dev/) - Build, test, lint, format and development tools
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge runtime
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js (development version from `package.json`)
- pnpm (version from `package.json`)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Or use Wrangler directly
pnpm start
```

### Build

```bash
# Build for production
pnpm build
```

### Deploy

```bash
# Deploy to Cloudflare Workers
pnpm deploy
```

## Project Structure

```
.
├── src/
│   ├── index.ts      # Hono server application
│   └── client.tsx    # Client-side JSX DOM application
├── test/             # Test files
├── vite.config.ts    # Vite+ configuration
├── wrangler.jsonc    # Cloudflare Workers configuration
└── package.json      # Dependencies and scripts
```

## Scripts

- `pnpm dev` - Start Vite+ dev server
- `pnpm start` - Start Wrangler dev server
- `pnpm build` - Build for production
- `pnpm deploy` - Build and deploy to Cloudflare Workers
- `pnpm test` - Run tests
- `pnpm check` - Check formatting, lint and types with Vite+
- `pnpm check:fix` - Fix linting issues automatically
- `pnpm check-types` - Type check with TypeScript

## License

MIT

## Development toolchain

Use Node.js 24 and the pnpm version pinned in `package.json`.
Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, and `pnpm build`.
Vite+ provides formatting, linting, type checks, tests and builds. Tests run
locally in the Cloudflare Workers runtime. Use `pnpm run dev` to develop and
`pnpm run cf-typegen` to regenerate Worker binding types.

Update Vite+ and its bundled tools together with `vp migrate`, then update the
pinned `setup-vp` version in CI and refresh the pnpm lockfile. Run the project's
checks before committing toolchain updates.

### Runtime versions

`package.json` is the source of truth for development Node.js (`devEngines.runtime`)
and pnpm (`packageManager`). The major versions in `mise.toml` only bootstrap the
environment. Install the [global Vite+ CLI](https://viteplus.dev/guide/global-cli)
with environment management enabled, then use `vp install --frozen-lockfile`
and `vp run <script>` to run with the declared versions. `pnpm` commands also use
them when the Vite+ shims are active. The project-local CLI alone does not switch
Node.js versions.

CI reads the same manifest automatically; compatibility-test matrices explicitly
override Node.js. pnpm runtime management is disabled so it does not override
Vite+'s selection. Keep any consumer-facing `engines.node` support range separate
from the development pin.
