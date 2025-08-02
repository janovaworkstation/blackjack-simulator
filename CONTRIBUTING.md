# Contributing to Blackjack Strategy Simulator

First off, thank you for considering contributing to this project! Your help is greatly appreciated. Whether you're reporting a bug, suggesting an enhancement, or writing code, you're helping to make this a better tool for everyone.

This document provides guidelines for contributing to the project. Please take a moment to review it before you get started.

## How Can I Contribute?

There are many ways to contribute, from writing code to improving documentation and reporting bugs.

### Reporting Bugs

If you find a bug, please create an issue in the GitHub repository. When you create a bug report, please include as many details as possible:

-   A clear and descriptive title.
-   A step-by-step description of how to reproduce the bug.
-   The expected behavior and what actually happened.
-   Screenshots or screen recordings, if applicable.
-   Your operating system, browser, and version.

### Suggesting Enhancements

If you have an idea for a new feature or an improvement to an existing one, please create an issue. Provide a clear description of your suggestion and why it would be valuable.

### Pull Requests

We use GitFlow workflow for managing contributions. Please follow these branching conventions:

#### Branch Types

- **main** - Production-ready code, protected branch
- **develop** - Integration branch for features, auto-deploys to staging  
- **feature/** - Feature development branches (e.g., `feature/new-counting-system`)
- **release/** - Release preparation branches (e.g., `release/v1.2.0`)
- **hotfix/** - Critical bug fixes for production (e.g., `hotfix/fix-scoring-bug`)

#### Contributing Process

1.  **Fork the repository** and clone your fork locally
2.  **Create a feature branch** from `develop`:
    ```bash
    git checkout develop
    git pull origin develop  
    git checkout -b feature/your-feature-name
    ```
3.  **Set up your development environment** by following the instructions in the `README.md` file.
4.  **Make your changes** in your branch. Ensure your code follows the project's coding style.
5.  **Write tests** for any new functionality.
6.  **Ensure all tests pass** by running `npm test && npm run test:e2e`.
7.  **Run linting** with `npm run lint` to ensure code quality.
8.  **Use conventional commit messages** (see Commit Message Format below).
9.  **Submit a pull request** from your feature branch to our `develop` branch.

#### Commit Message Format

We use conventional commit messages. Please follow this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix  
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Build process or auxiliary tool changes

**Example:**
```
feat(engine): add Spanish 21 game variant

Implement Spanish 21 rules including:
- 48-card deck (no 10s)
- Special bonus payouts  
- Player blackjack always wins

Closes #123
```

## Development Guidelines

### Setting Up Your Development Environment

1. **Clone and install dependencies** following the README.md instructions
2. **Start the development server**: `npm run dev`
3. **Run Storybook for component development**: `npm run storybook`
4. **Run tests to ensure everything works**: `npm test`

### Working with Components

This project uses **Storybook** for component development and documentation. When working on UI components:

1. **Develop components in isolation** using Storybook at `http://localhost:6006`
2. **Create stories** for your components in the `src/stories/` directory
3. **Document components** using MDX files for rich documentation
4. **Test different states** and props using Storybook's interactive controls

### Code Standards

-   **Code Style**: This project uses Prettier and ESLint for code formatting and linting. Please run `npm run lint` and `npm run format` before committing your changes.
-   **Component Documentation**: All new components should have corresponding Storybook stories and MDX documentation
-   **Testing**: Write tests for any new functionality and ensure all tests pass with `npm test`
-   **Commit Messages**: Please write clear and concise commit messages.
-   **Branching**: Follow GitFlow conventions. Create feature branches from `develop` using the `feature/` prefix (e.g., `feature/add-new-counting-system` or `feature/fix-results-panel-bug`).

Thank you for your contributions!
