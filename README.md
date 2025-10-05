# 💼 Financial Portfolio Tracker

A **full-stack financial portfolio management platform** built using **React (Vite)**, **Spring Boot**, and **PostgreSQL**, enabling users to **create and manage portfolios, track real-time asset performance**, and receive **intelligent diversification insights** — powered by the **Alpha Vantage API**.

---

## 🚀 Live Deployment

| Service | Platform | Link |
|----------|-----------|------|
| 🌐 Frontend | **Vercel** | [https://financial-portfolio-tracker-omega.vercel.app](https://financial-portfolio-tracker-omega.vercel.app) |
| ⚙️ Backend | **Render** | [https://financialportfoliotracker-v5d8.onrender.com](https://financialportfoliotracker-v5d8.onrender.com) |
| 💾 Database | **Render PostgreSQL** | Managed Cloud DB |

---

## 🧩 Overview

The **Financial Portfolio Tracker** allows users to:
- ✅ Register & login securely using **JWT Authentication**
- 📈 Create and manage multiple investment portfolios
- 💰 Add assets and view their **real-time valuations**
- 📊 Visualize performance using **interactive charts**
- 🤖 Get diversification insights powered by the **Alpha Vantage API**

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
    A[Frontend React Vite on Vercel] -->|HTTPS REST API Calls| B[Backend Spring Boot on Render]
    B -->|JDBC| C[(PostgreSQL Render Cloud DB)]
    B -->|External API| D[Alpha Vantage API]
    A -->|JWT Authentication| B
```

### 🔹 Backend Architecture
```mermaid
flowchart TD
    Controller[REST Controllers] --> Service[Service Layer]
    Service --> Repository[JPA Repository]
    Repository --> DB[(PostgreSQL Database)]
    Service --> API[Alpha Vantage API]
    Auth[Spring Security + JWT] --> Controller
```

### 🔹 Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ PORTFOLIO : owns
    PORTFOLIO ||--o{ ASSET : contains

    USER {
        bigint id PK
        string username
        string password
    }

    PORTFOLIO {
        bigint id PK
        string name
        bigint user_id FK
    }

    ASSET {
        bigint id PK
        string ticker
        double quantity
        bigint portfolio_id FK
    }
```

### 🔹 Authentication & Data Flow
```mermaid
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
```

### 🔹 Portfolio Management Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant DB
    participant API

    User->>Frontend: Create Portfolio (UI)
    Frontend->>Backend: POST /portfolios?name=MyPortfolio
    Backend->>DB: Save portfolio record
    Backend-->>Frontend: Portfolio created

    User->>Frontend: Add Asset (Ticker + Quantity)
    Frontend->>Backend: POST /portfolios/{id}/assets
    Backend->>API: Fetch latest stock price (Alpha Vantage)
    API-->>Backend: Return current price
    Backend->>DB: Save asset with updated valuation
    Backend-->>Frontend: Asset added successfully
```

### 🔹 Frontend Component Hierarchy

```mermaid
graph TD
    App[App.jsx] --> Login[Login.jsx]
    App --> Dashboard[Dashboard.jsx]
    Dashboard --> AssetForm[AssetForm.jsx]
    Dashboard --> AssetTable[AssetTable.jsx]
    Dashboard --> Charts[Charts.jsx]
    Dashboard --> Insights[Insights.jsx]
    Dashboard --> PortfolioDialog[PortfolioDialog.jsx]
    Dashboard --> PortfolioSelector[PortfolioSelector.jsx]
```
