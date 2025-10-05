# 💼 Financial Portfolio Tracker

A **full-stack financial portfolio management platform** built using **React (Vite)**, **Spring Boot**, and **PostgreSQL**, enabling users to **create and manage portfolios, track real-time asset performance**, and receive **intelligent diversification insights** — powered by the **Alpha Vantage API**.

---

## 🚀 Live Deployment

| Service | Platform | Link |
|----------|-----------|------|
| 🌐 Frontend | **Vercel** | [https://financial-portfolio-tracker-omega.vercel.app](https://financial-portfolio-tracker-omega.vercel.app) |
| ⚙️ Backend | **Render** | [https://financialportfoliotracker-v5d8.onrender.com](https://financialportfoliotracker-v5d8.onrender.com) |
| 💾 Database | **Render PostgreSQL** | Managed Cloud DB |
| 📁 GitHub Repo | **GitHub** | [https://github.com/Prithvi159/FinancialPortfolioTracker](https://github.com/Prithvi159/FinancialPortfolioTracker) |

---

## 🧩 Overview

The **Financial Portfolio Tracker** allows users to:
- ✅ Register & login securely using **JWT Authentication**
- 📈 Create and manage multiple investment portfolios
- 💰 Add assets and view their **real-time valuations**
- 📊 Visualize performance using **interactive charts**
- 🤖 Get diversification insights powered by the **Alpha Vantage API**

This project follows **clean architecture**, **industry-standard folder structuring**, and **scalable React + Spring Boot best practices**.

---

## ⚙️ Tech Stack

### 🔹 Frontend
- React (Vite)
- Material UI (MUI)
- Axios & React Query
- Recharts (for Charts)
- Redux Toolkit

### 🔹 Backend
- Spring Boot (Java 21)
- Spring Security + JWT Authentication
- Spring Data JPA
- PostgreSQL (Cloud DB)
- Maven
- Alpha Vantage API (External)

### 🔹 Deployment
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** Render PostgreSQL  

---

## 🏗️ System Architecture

### 🔹 High-Level Architecture
```mermaid
graph TD
    A[Frontend: React Vite (Vercel)] -->|HTTPS / REST API Calls| B[Backend: Spring Boot (Render)]
    B -->|JDBC| C[(PostgreSQL: Render Cloud DB)]
    B -->|External API| D[Alpha Vantage API]
    A -->|JWT Authentication| B
```

flowchart TD
    Controller[REST Controllers] --> Service[Service Layer]
    Service --> Repository[JPA Repository]
    Repository --> DB[(PostgreSQL Database)]
    Service --> API[Alpha Vantage API]
    Auth[Spring Security + JWT] --> Controller


graph TD
    App[App.jsx] --> Login[Login.jsx]
    App --> Dashboard[Dashboard.jsx]
    Dashboard --> AssetForm[AssetForm.jsx]
    Dashboard --> AssetTable[AssetTable.jsx]
    Dashboard --> Charts[Charts.jsx]
    Dashboard --> Insights[Insights.jsx]
    Dashboard --> PortfolioDialog[PortfolioDialog.jsx]
    Dashboard --> PortfolioSelector[PortfolioSelector.jsx]

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
