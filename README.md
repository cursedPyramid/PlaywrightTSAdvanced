# 🧪 Playwright Advanced

A Playwright and TypeScript project created while working through an advanced Playwright automation course.

The project uses a small stock-trading application to explore test architecture, maintainability, fixtures, Page Object Models, test quality, configuration, and AI-assisted testing.

## 🧰 Prerequisites

- Windows
- VSCode (or other IDE)
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Course modules

### Module 1 — Foundations & AI-Assisted Testing

- Playwright test fundamentals
- Locators, actions and assertions
- Exploring the use of AI to generate tests
- Comparing direct test automation with a Page Object Model approach

### Module 2 — Page Object Model

- Page Object Models (POM)
- Reusable page and navigation components
- POM composition
- Page factories
- Domain types and objects
- Encapsulating UI interactions

### Module 3 — Fixtures

- Built-in Playwright fixtures
- Custom fixtures
- Extending the Playwright test object
- Overriding existing fixtures
- Custom configuration options
- Shared monitoring for JavaScript errors and network responses

### Module 4 — Test Quality & Anti-Patterns

- Common Playwright anti-patterns
- Understanding when explicit waits are unnecessary
- `waitForTimeout()` and why it should generally be avoided
- `expect().toPass()` and `expect.poll()` for appropriate retry scenarios
- The importance of correctly awaiting asynchronous Playwright operations

### Module 5 — Secrets & Environment Configuration

- Managing environment variables
- Using `dotenv` / `dotenvx`
- Keeping sensitive configuration outside test code
- Working with environment-based secrets

### Module 6 — Test Design & Organisation

- Writing tests with clear intent
- Test naming and structure
- Tags and annotations
- Organising larger Playwright projects
- Designing tests to provide useful context for both people and AI tools

## Project Structure

```text
app/                         Demo stock-trading application
tests/
├── module1/                 Foundations and AI-assisted testing
├── module2/
│   ├── pages/               Page Objects, fixtures and domain types
│   └── pom_examples.test.ts
├── module3/                 Fixtures
├── module4/                 Test anti-patterns
├── module5/                 Environment secrets
└── module6/                 Test design and organisation
playwright.config.ts         Playwright configuration
server.js                    Local application server
tsconfig.json                TypeScript configuration
biome.json                   Formatting and linting configuration
```

## Running the Tests

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

Run the Playwright tests:

```bash
npm test
```

Run tests tagged as smoke tests:

```bash
npm run smoke
```

Open Playwright UI Mode:

```bash
npm run uimode
```

Launch Playwright Codegen:

```bash
npm run codegen
```

## Purpose

This repository forms part of my continued development in modern test automation, building on my experience in manual and automated software testing.

The focus is not simply on writing tests, but on developing **maintainable, reliable and well-structured automation** using Playwright and TypeScript.

## 🔧 Technologies Used

- **TypeScript v7.0.2**
- **Playwright v1.63.0**
- **Express v5.2.1**
- **Biome v2.4.13**
- **Dotenv v17.4.2**
- **Dotenvx v2.23.0**

## 🌐 Trade website

The files for the **Trade** website can be found under the `src` folder.

This is accessible at [localhost:3000](http://localhost:3000/) by running the `npm start` command from the **Terminal**.

## 👩‍💻 About the author

See my profile.
🌐 [LinkedIn](https://www.linkedin.com/in/marcus-priddey/)
