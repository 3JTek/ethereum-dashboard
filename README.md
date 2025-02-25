# Ethereum Dashboard

[Live Site](https://ethereum-dashboard-seven.vercel.app/ "Live Site")

This repository contains an Ethereum Dashboard, a modern web application built with Next.js and leveraging Wagmi for seamless wallet interactions. The application follows best practices in architecture, development workflow, and deployment to ensure scalability, maintainability, and optimal performance.

## Features

- Next.js App Router: Utilizing the app directory for modern React architecture.

- Wagmi for Wallet Interaction: Enables seamless integration with Ethereum and other EVM-compatible blockchains.

- ShadCN UI + Tailwind CSS: A robust, customizable UI framework.

- Strict TypeScript Integration: Ensures type safety and improved developer experience.

- CI/CD with GitHub Actions and Vercel: Automates linting, testing, and deployment.

- Code Quality Enforcement: Husky hooks for pre-push checks.

- Analytics via Vercel: Provides insights into user interactions and performance.

## Getting Started

To set up the development environment, follow these steps:

    yarn install
    yarn dev

Open http://localhost:3000 in your browser to view the application.

## Architecture

This repository adheres to a Domain-Driven Design (DDD) approach, ensuring a modular and scalable structure:

features/ – Contains domain-specific functionalities.

shared/ – Houses reusable components and utilities.

app/ – Manages routing and global application logic.

Routing is handled via Next.js' App Router, providing enhanced flexibility and performance optimizations.

## Wallet Integration (Wagmi)

The application utilizes Wagmi, a powerful React library for interacting with Ethereum wallets and RPC nodes. It provides:

- A React provider for seamless state management.

- Hooks for reading and writing data on supported chains.

- Support for multiple wallet connectors, including MetaMask, WalletConnect, and Coinbase Wallet.

## Design System

The UI is built using ShadCN UI, a component-based design system that enhances development speed and consistency. Styling is managed via Tailwind CSS, a utility-first CSS framework optimized for rapid UI development.

## TypeScript, Linting & Formatting

To ensure high-quality and maintainable code, the following tools are integrated:

- TypeScript: Provides static type checking to prevent runtime errors.

- ESLint: Enforces coding standards and identifies potential issues.

- Prettier: Ensures consistent formatting across the codebase.

## Testing

Testing is a critical aspect of this application, with the following tools used:

- Vitest: A fast test runner that provides Jest-compatible APIs.

- React Testing Library: Focuses on testing components from the user's perspective.

- Coverage for critical components: Ensures core functionalities are robust and reliable.

## Pre-Push Hooks (Husky)

Husky is configured to run pre-push hooks, enforcing:

- Linting with ESLint.

- Code formatting with Prettier.

- Unit and component tests before pushing to GitHub.

This ensures that only clean and tested code is committed.

## Continuous Integration & Deployment

GitHub Actions

A CI pipeline is set up using GitHub Actions to:

- Run linting and tests on every push.

- Prevent merging of non-compliant code.

## Vercel Deployment

This repository is integrated with Vercel for automated deployments:

- Every push to main triggers a new deployment.

- Previews are generated for pull requests.

- Performance optimizations are applied for production builds.

## Analytics

User interactions and performance metrics are monitored via Vercel Analytics, providing insights into:

- Page views and user activity.

- Load times and performance bottlenecks.

- Error tracking for debugging.
