# Financial Portfolio Tracker

A **full-stack financial portfolio management platform** built using **React (Vite)**, **Spring Boot**, and **PostgreSQL**, enabling users to **create and manage portfolios, track real-time asset performance**, and receive **intelligent diversification insights** — powered by the **Alpha Vantage API**.

---

## Live Deployment

| Service | Platform | Link |
|----------|-----------|------|
| 🌐 Frontend | **Vercel** | [https://financial-portfolio-tracker-omega.vercel.app](https://financial-portfolio-tracker-omega.vercel.app) |
| ⚙️ Backend | **Render** | [https://financialportfoliotracker-v5d8.onrender.com](https://financialportfoliotracker-v5d8.onrender.com) |
| 💾 Database | **Render PostgreSQL** | Managed Cloud DB |
| 📁 GitHub Repo | **GitHub** | [https://github.com/Prithvi159/FinancialPortfolioTracker](https://github.com/Prithvi159/FinancialPortfolioTracker) |

---

## 🧩 Overview

The **Financial Portfolio Tracker** allows users to:
-  Register & login securely (JWT Authentication)
-  Create and manage investment portfolios
-  Add assets and view their real-time valuations
-  Visualize portfolio performance using charts
-  Receive diversification insights and suggestions

This project follows **clean architecture**, **industry-standard folder structuring**, and **scalable, reusable, maintainable React + Spring Boot practices**.

---
## 🏗️ System Architecture

### 🔹 High-Level Architecture
```mermaid
graph TD
    A[Frontend - React.js (Vercel)] -->|HTTPS / REST API Calls| B[Backend - Spring Boot (Render)]
    B -->|JDBC| C[(PostgreSQL - Render Cloud DB)]
    B -->|External API| D[Alpha Vantage API]
    A -->|JWT Authentication| B

flowchart TD
    Controller[REST Controllers] --> Service[Service Layer]
    Service --> Repository[JPA Repository]
    Repository --> DB[(PostgreSQL Database)]
    Service --> API[Alpha Vantage API]
    Auth[Spring Security + JWT] --> Controller

graph TD
    App[App.jsx] --> Login[Login.jsx]
    App --> Dashboard[Dashboard.jsx]
    Dashboard --> AssetForm
    Dashboard --> AssetTable
    Dashboard --> Charts
    Dashboard --> Insights
    Dashboard --> PortfolioDialog
    Dashboard --> PortfolioSelector

sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DB

    User->>Frontend: Enter credentials
    Frontend->>Backend: POST /auth/login
    Backend->>DB: Validate user
    DB-->>Backend: Return user
    Backend-->>Frontend: JWT Token
    Frontend->>Backend: Include JWT in Authorization header
    Backend->>DB: Fetch protected resources
