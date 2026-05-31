🚀 TaskFlow - Full Stack Task Management Application

TaskFlow is a modern full-stack task management application that helps users organize, track, and manage their daily tasks efficiently. The application features secure authentication, task CRUD operations, protected routes, and a responsive user interface.

🌐 Live Demo
Frontend

TaskFlow Live Demo

Backend API

Backend API

GitHub Repository

GitHub Repository

📌 Features
🔐 Authentication System
User Registration
User Login
JWT Authentication
Protected Routes
Persistent User Sessions
Secure Password Hashing using bcrypt
📋 Task Management
Create Tasks

Users can create tasks with:

Title
Description
Status
Update Tasks

Users can edit:

Task Title
Task Description
Task Status
Delete Tasks
Remove unwanted tasks
Confirmation before deletion
View Tasks

Tasks are organized into:

Todo
In Progress
Done
📊 Dashboard Analytics

Dashboard displays:

Total Tasks
Todo Tasks Count
In Progress Tasks Count
Completed Tasks Count
🎨 User Interface
Responsive Design
Modern Dashboard Layout
Sidebar Navigation
Task Cards
Modal-Based Task Creation
Notification System
Clean UX/UI
🛠️ Tech Stack
Frontend
React.js
React Router DOM
Axios
Tailwind CSS
Vite
Backend
Node.js
Express.js
JWT Authentication
bcryptjs
CORS
dotenv
Database
PostgreSQL
Neon Database
Deployment
Vercel (Frontend)
Render (Backend)
📂 Project Structure
task-manager-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── app.js
│   │
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │
│   │── components/
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   ├── TaskCard/
│   │   ├── TaskModal/
│   │   ├── ProtectedRoute/
│   │
│   │── pages/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Dashboard/
│   │
│   │── context/
│   │── services/
│   │── routes.jsx
│   │── App.jsx
│   │
│   ├── package.json
│
└── README.md
🔑 API Endpoints
Authentication
Register User
POST /api/auth/register

Request:

{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
Login User
POST /api/auth/login

Request:

{
  "email": "john@gmail.com",
  "password": "123456"
}

Response:

{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@gmail.com"
  }
}
Tasks
Get All Tasks
GET /api/tasks
Create Task
POST /api/tasks

Request:

{
  "title": "Build Dashboard",
  "description": "Create React Dashboard",
  "stage": "todo"
}
Update Task
PUT /api/tasks/:id

Request:

{
  "title": "Updated Task",
  "description": "Updated Description",
  "stage": "done"
}
Delete Task
DELETE /api/tasks/:id
⚙️ Local Installation
Clone Repository
git clone https://github.com/Nitheeshhd/task-manager-app.git
cd task-manager-app
Backend Setup
cd backend

Install Dependencies

npm install

Create .env

PORT=5000

DATABASE_URL=YOUR_NEON_DATABASE_URL

JWT_SECRET=YOUR_SECRET_KEY

Run Backend

npm run dev
Frontend Setup
cd frontend

Install Dependencies

npm install

Run Frontend

npm run dev
🚀 Deployment
Frontend Deployment

Platform:

Vercel

Command:

npm run build

Output Directory:

dist
Backend Deployment

Platform:

Render

Build Command:

npm install

Start Command:

npm start
🔒 Security Features
JWT Authentication
Password Hashing
Protected Routes
Secure API Access
Environment Variable Protection
🎯 Future Enhancements
Planned Features
Drag & Drop Kanban Board
Dark Mode
Search Tasks
Task Filters
Due Dates
Task Priorities
User Profile Management
Team Collaboration
Activity Logs
Email Notifications
Analytics Dashboard
📈 Learning Outcomes

Through this project I gained practical experience in:

Full Stack Development
REST API Development
JWT Authentication
PostgreSQL Database Management
React State Management
Frontend and Backend Deployment
Cloud Database Integration
Git and GitHub Workflow
