# Real Estate Platform Documentation

## Overview
This is a modern, full-stack real estate platform built with Next.js 14, Prisma, and Tailwind CSS. It supports multiple user roles, including standard users, real estate agents, and administrators.

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Key Features](#key-features)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Authentication & Authorization](#authentication--authorization)
6. [Getting Started](#getting-started)

---

## Technology Stack

### Frontend
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Radix UI & Shadcn/UI patterns
- **Forms**: React Hook Form with Zod validation

### Backend
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: SQLite (Development)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **API**: Server Actions for data mutations

---

## Key Features

### 🌍 Public Features
- **Landing Page**: Features property highlights and testimonials.
- **Property Search**: Filter and browse available properties.
- **Property Details**: View detailed information, images, and features.
- **Agent Directory**: Find and contact verified real estate agents.
- **Inquiry System**: Guests and users can send messages to agents.

### 👤 User Features
- **Saved Listings**: Users can save properties to their profile.
- **Profile Management**: Manage account settings and inquiries.

### 💼 Agent Dashboard
- **Property Management**: Complete CRUD operations for property listings.
- **Inquiry Tracker**: View and respond to messages from potential buyers.
- **Performance Analytics**: View charts and stats for active listings and completed deals.
- **Agent Verification**: Dedicated registration flow for professional agents.

### 🛡️ Admin Dashboard
- **Platform Analytics**: High-level overview of users, properties, and transactions.
- **User Management**: Monitor and manage all user accounts.
- **Property Oversight**: Manage every listing on the platform.
- **Content Management**: Manage site testimonials and public content.

---

## Project Structure

```text
├── actions/             # Next.js Server Actions
├── app/                 # Next.js App Router (Routes & Layouts)
│   ├── (auth)/          # Authentication routes (Login/Register)
│   ├── (dashboard)/     # Protected dashboard routes (Admin/Agent)
│   ├── (public)/        # Publicly accessible routes
│   └── api/             # API Route Handlers
├── components/          # Reusable UI components
│   ├── auth/            # Auth-related components
│   ├── dashboard/       # Dashboard-specific layout components
│   └── ui/              # Base UI elements (Buttons, Inputs, etc.)
├── lib/                 # Shared utilities (DB client, etc.)
├── prisma/              # Database schema and migrations
└── scripts/             # Administrative maintenance scripts
```

---

## Database Schema

The platform uses a relational model with the following core entities:

- **User**: Stores profiles, roles (USER, ADMIN), and agent verification data.
- **Property**: The central entity for listings, linked to an owner (Agent).
- **PropertyImage**: Supports multiple images per property.
- **Inquiry**: Relationships between users/guests, properties, and agents.
- **SavedListing**: Junction table for user favorites.
- **TransactionLog**: Records successful property deals.
- **Testimonial**: Public feedback for the platform.

---

## Authentication & Authorization

- **NextAuth.js**: Handles JWT-based sessions.
- **Role-Based Access Control (RBAC)**:
    - `USER`: Access to public features and personal profile.
    - `AGENT`: Access to Agent Dashboard and property management.
    - `ADMIN`: Full access to the Admin Panel and platform management.

---

## Getting Started

1.  **Clone the repository**
2.  **Install dependencies**: `npm install`
3.  **Setup Environment Variables**: Create a `.env` file with `DATABASE_URL` and `AUTH_SECRET`.
4.  **Database Setup**: 
    ```bash
    npx prisma generate
    npx prisma db push
    ```
5.  **Run Development Server**: `npm run dev`
