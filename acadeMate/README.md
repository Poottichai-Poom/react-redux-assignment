# AcadeMate — Student Management System

AcadeMate is a modern web application for managing students, courses, and grades. This project demonstrates a full migration from local state management to a centralized **Redux Toolkit (RTK) Query** architecture, providing efficient data fetching, caching, and state synchronization with a mock backend.

## 🚀 Features

- **Student Management**: Add, edit, delete, and view students with automated GPA calculation.
- **Course Catalog**: Manage course offerings, including codes, titles, credits, and departments.
- **Grade Records**: Record and track student performance across different courses and semesters.
- **Real-time Synchronization**: Powered by RTK Query with automatic cache invalidation for seamless UI updates.
- **Mock Backend**: Integrated with `json-server` for a complete API-driven experience.

## 🛠️ Technical Stack

- **Frontend**: React 19 (Vite)
- **State Management**: Redux Toolkit & RTK Query
- **Styling**: Vanilla CSS (Custom Interactive UI)
- **API Simulation**: JSON Server

## 📦 Project Structure

```text
acadeMate/
├── src/
│   ├── app/
│   │   └── store.js            # Central Redux store configuration
│   ├── features/               # API Slices (RTK Query)
│   │   ├── students/
│   │   ├── courses/
│   │   └── grades/
│   ├── components/             # Reusable React components
│   └── App.jsx                 # Main application entry
├── db.json                     # Mock database
└── package.json                # Project dependencies and scripts
```

## ⚙️ Setup Instructions

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
cd acadeMate
npm install
```

### 3. Run the Mock Server
The application expects a backend at `http://localhost:3000`. Run the integrated mock server:
```bash
# Ensure json-server is installed globally or used via npx
npm run server
```

### 4. Run the Application
Open a new terminal and start the Vite development server:
```bash
npm run dev
```

## 📖 How to Use

1.  **Students Tab**: Add new students or edit existing ones. The GPA summary at the top updates automatically as you manage the student list.
2.  **Courses Tab**: View the current course catalog or add new courses.
3.  **Grades Tab**: Associate students with courses and record their grades. The system provides a summary of records and the overall average grade.

---
*Built as part of the Advanced JS - React Redux Assignment.*
