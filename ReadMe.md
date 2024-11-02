# Deno Fullstack Starter

I wanted to try deno but I hate scaffolding projects. These are my solutions.

## Stack

- [Deno](https://deno.land/) - A modern runtime for JavaScript and TypeScript
- [Oak](https://deno.land/x/oak) - A middleware framework for Deno's HTTP server
- [Prisma](https://www.prisma.io/docs) - Next-generation ORM for Node.js &
  TypeScript
  - [Prisma Deno Client](https://www.prisma.io/docs/orm/prisma-client/deployment/deno) -
    Prisma Client for Deno runtime
- [React](https://react.dev/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Router](https://reactrouter.com/en/main) - Client-side routing for
  React applications

## Overview

This project is a fullstack web application starter using Deno as the runtime.
Here's what you need to know to get started:

### Project Structure

#### Database

- Postgresql, Prisma + Deno Client
- Multi-schema

#### API

- Oak middleware framework for HTTP server
- Resources-based organization:
  - `/auth` - Authentication endpoints and services
  - `/health` - Health check endpoint
  - `/user` - User profile management
- Each resource contains:
  - `*.route.ts` - Route definitions and handlers
  - `*.service.ts` - Business logic and data access
- Global middleware:
  - Request logging
  - Response timing

#### Client

- React + Vite frontend
- Tailwind CSS for styling
- SWR for data fetching:
  - Client-side state management and caching
  - Automatic revalidation
  - Optimistic UI updates
  - Built-in request deduplication
- React Router setup:
  - Browser router for client-side navigation
  - Routes organized by feature/page:
    - `/` - Home/landing page
    - `/login` - User authentication
    - `/register` - New user registration
    - `/profile` - User profile management
  - Protected routes requiring authentication
  - Shared layouts and navigation components
  - Route-level code splitting for optimized loading
