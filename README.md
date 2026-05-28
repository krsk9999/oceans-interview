# oceans-interview

End-to-end test automation framework built with [Playwright](https://playwright.dev/) and
TypeScript. Tests are written against the [Ultimate QA automation practice site](https://ultimateqa.com/automation),
follow a strict Page Object Model, and run on every push, PR, or manual dispatch via GitHub Actions.
The HTML report is published to GitHub Pages.

**Live report:** https://krsk9999.github.io/oceans-interview/

## Tech stack

- [Playwright](https://playwright.dev/) `^1.60` (Chromium)
- TypeScript with strict mode and path aliases
- [dotenv](https://github.com/motdotla/dotenv) for local environment variables
- GitHub Actions for CI + GitHub Pages for report hosting

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS — the workflows use `lts/*`)
- npm (ships with Node)

## Installation

```bash
git clone https://github.com/krsk9999/oceans-interview.git
cd oceans-interview
npm ci
npx playwright install
```

## Configuration

The framework resolves the target site from `BASE_URL` (defined in
[`playwright.config.ts`](./playwright.config.ts), with a fallback to `http://localhost:3000`).

Create a local `.env` at the project root:

```bash
BASE_URL=https://ultimateqa.com/automation
```

`.env` is git-ignored. In CI the same value is injected from the repo-level GitHub Actions variable
`BASE_URL` (see [Settings → Secrets and variables → Actions → Variables](https://github.com/krsk9999/oceans-interview/settings/variables/actions)).

## Running tests

```bash
# Run the full suite
npm test

# Run a single spec
npx playwright test tests/example.spec.ts

# Run by title pattern
npx playwright test --grep "has title"

# Open the HTML report from the last run
npx playwright show-report
```

Playwright is configured to run **headless** by default. Override with `--headed` if you want to
watch tests execute:

```bash
npx playwright test --headed
```

## Project structure

```
.
├── .github/workflows/
│   ├── playwright.yml      # Runs on push/PR to main; publishes report to Pages
│   └── dispatcher.yml      # Manual run with branch/environment/publish inputs
├── src/
│   ├── fixtures/           # Playwright test fixtures (page + utility merges)
│   ├── pages/              # Page Object Models (extend BasePage)
│   │   ├── base.page.ts
│   │   └── ultimateqa/     # Pages for ultimateqa.com
│   ├── types/              # Shared TypeScript types
│   └── utils/              # Shared helpers
├── tests/
│   └── example.spec.ts     # Example tests against the Ultimate QA site
├── playwright.config.ts
├── tsconfig.json           # Defines @fixtures, @pages, @utils, @types path aliases
└── package.json
```

Import from path aliases — never from relative paths:

```ts
import { test, expect } from '@fixtures';
import type { AutomationHomePage } from '@pages';
```

## Authoring tests

The Page Object Model is strictly enforced:

- **All selectors live in page objects** — never inside spec files.
- **Page objects contain no assertions** — only locators and actions.
- **Spec files contain assertions and orchestration** — and pull page objects from fixtures.

A new page object goes through three steps:

1. Create the class in `src/pages/<folder>/<name>.page.ts`, extending `BasePage`.
2. Export it from the relevant `index.ts` files so it's reachable via `@pages`.
3. Register it as a fixture in [`src/fixtures/pages.fixture.ts`](./src/fixtures/pages.fixture.ts).

Specs should wrap each logical step in `test.step()` and assert visibility before any interaction.
See [`tests/example.spec.ts`](./tests/example.spec.ts) for the canonical pattern.

## CI/CD

Two workflows live under `.github/workflows/`:

### `playwright.yml` — Push / PR

Triggered on push or PR to `main`. Installs dependencies, runs Playwright, uploads the report as a
build artifact, and deploys it to GitHub Pages.

### `dispatcher.yml` — Manual dispatch

Triggered from the [Actions tab](https://github.com/krsk9999/oceans-interview/actions) with three
inputs:

| Input         | Type     | Default | Description                                          |
| ------------- | -------- | ------- | ---------------------------------------------------- |
| `branch`      | string   | —       | Branch to check out and test against.                |
| `environment` | choice   | `QA`    | Target environment — one of `QA`, `STG`, `PROD`.     |
| `publish`     | boolean  | `false` | Publish the HTML report to GitHub Pages when `true`. |

Both workflows share a `pages` concurrency group so deployments serialize cleanly when they overlap.

## Reports

- **In CI artifacts:** every run uploads `playwright-report/` with a 30-day retention.
- **On GitHub Pages:** the latest deployed run is live at
  https://krsk9999.github.io/oceans-interview/.

> The Pages site is public even though the repo is private. Test names, failure screenshots, and
> traces in the report will be visible to anyone with the URL. Use the dispatcher's `publish=false`
> option when you don't want a run to overwrite the public report.
