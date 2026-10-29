# Dynamic Portfolio & Admin Dashboard

## Headline
A robust, component-based Personal Portfolio and Content Management Dashboard built with Angular to dynamically showcase projects and manage client interactions.

## Executive Summary
This project serves as a complete frontend solution for a professional developer's portfolio. Instead of a static website, it features a dual-interface architecture: a public-facing layout for clients to view services, projects, and skills, alongside a secure admin dashboard to manage content and review incoming contact messages dynamically.

## Project Plan
1. **Architecture Design:** Structuring the Angular application into distinct modules (`core`, `layout` for the public site, and `dashboard` for admin features).
2. **Data Modeling & Services:** Creating TypeScript interfaces (Models) and Angular Services for handling About, Contact, Hero, Projects, and Skills data.
3. **UI/UX Development:** Building responsive, modular HTML/CSS components for both the storefront and the admin backend.
4. **Routing & Navigation:** Implementing Angular Router for seamless Single Page Application (SPA) transitions between public views and admin panels.

## Challenge / Problem
Traditional portfolios are often hardcoded, meaning developers must manually edit HTML/CSS files every time they want to add a new project, update a skill, or change a service offering. Additionally, tracking client inquiries usually relies on messy email integrations rather than a centralized system.

## Objectives
- Build a dynamic, data-driven web application that strictly separates content from presentation.
- Create an intuitive admin dashboard allowing full CRUD (Create, Read, Update, Delete) capabilities for portfolio data.
- Ensure the public-facing interface is fast, responsive, and highly interactive.
- Centralize client communications through an integrated messaging dashboard.

## Solution
- Developed a scalable Angular SPA with a clear separation of concerns using Services and Dependency Injection.
- Built a secure `dashboard` module where the owner can manage `projects`, `services`, `skills`, and read `messages` submitted through the public contact form.
- Leveraged Angular's reactive data binding to ensure that any content updated in the dashboard is instantly reflected on the public `layout`.

## Lessons Learned
- Implementing a modular architecture in Angular drastically improves code maintainability and team scalability.
- Centralizing API calls and state management within the `core/services` folder simplifies data sharing across completely different modules (Dashboard vs. Layout).
- Building reusable UI components accelerates the development process for both client-facing and internal admin interfaces.
