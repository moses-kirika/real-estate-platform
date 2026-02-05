# Rafiki - Modern Kenyan Real Estate Platform

A premium, feature-rich real estate application tailored for the Kenyan market. Built with Next.js 14, featuring role-based dashboards, an interactive map view, and a fully responsive mobile-first design.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-green)

## ✨ New Features

- 🌍 **Kenyan Localization**: Expanded database with agents and listings across Nairobi, Mombasa, and Kisumu.
- 🗺️ **Interactive Map View**: Built with Leaflet.js to visualize property locations with clusters and detail popups.
- 📱 **Mobile-First Design**: Fully responsive navigation drawer and adaptive layouts optimized for all screen sizes.
- 🏢 **Multi-Role Dashboards**: Specialized interfaces for Admins, Agents, and Regular Users.
- 🔍 **Advanced Filtering**: Search properties by location, type, price range, and amenities.
- 📧 **Inquiry System**: Direct communication channel between browsers and agents.
- 🛡️ **Secure Auth**: Robust authentication using NextAuth.js v5.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Setup Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
3. **Seed Data**:
   ```bash
   npm run seed
   ```
4. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Prisma ORM with SQLite (Development)
- **Auth**: NextAuth.js v5 (Beta)
- **Maps**: React-Leaflet
- **Icons**: Lucide React

## 📖 Documentation

For detailed architecture overview, component structure, and security details, please refer to [**DOCUMENTATION.md**](./DOCUMENTATION.md).


## 🛡️ Security Note

Environment variables are managed via `.env`. Ensure this file is never committed. See [DOCUMENTATION.md](./DOCUMENTATION.md#security--privacy) for more details.

