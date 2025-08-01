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

If you'd like to contribute code, please follow these steps:

1.  **Fork the repository** and create a new branch from `main`.
2.  **Set up your development environment** by following the instructions in the `README.md` file.
3.  **Make your changes** in your branch. Ensure your code follows the project's coding style.
4.  **Write tests** for any new functionality.
5.  **Ensure all tests pass** by running `npm test`.
6.  **Submit a pull request** to the `main` branch of the main repository.

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
-   **Branching**: Create a new branch for each feature or bug fix. Use a descriptive name for your branch (e.g., `feat/add-new-counting-system` or `fix/results-panel-bug`).

Thank you for your contributions!
