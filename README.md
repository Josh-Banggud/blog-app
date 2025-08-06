
# ArtBlock - Blog Application (Coding Task)

A simple full-stack blog application with user authentication, post CRUD operations, and reactions — built with Node.js, Express, MongoDB, and React.

## Features

- User registration & login
- Authentication with JWT
- CRUD operations
- Like & dislike functionality
- Draft-saving entries
- Responsive UI

## Installation

Setup instructions to run **ArtBlock**

### Clone Repository
First clone the repo by running
```bash
git clone https://github.com/Josh-Banggud/blog-app.git
cd blog-app
```

### Backend Setup
To install dependencies, 
```bash
cd backend
npm install
```

### Environment Variables Setup
To run this project, you will need to add the following environment variables to your `.env` file in the
`/backend` folder

`PORT=5000`
`MONGO_URI=your_mongodb_atlas_uri`
`JWT_SECRET=your_secret_token`

### Run Server
```bash
npm run dev
```
The backend will start on `http://localhost:5000`

### Frontend Setup
To install dependencies,
```bash
cd frontend
npm install
```
### Run React App
```bash
npm run dev
```

## Dependencies

#### Frontend `/frontend`

| Dependency         | Description                |
| :------------------| :------------------------- |
| `react-router-dom` | `for routing in React`     |
| `@tanstack/react-query` | `for data fetching and caching`     |
| `axios` | `HTTP client for API requests`     |
| `@fortawesome/fontawesome-svg-core` | `Core FontAwesome dependency`     |
| `@fortawesome/react-fontawesome` | `FontAwesome icons`     |
| `@fortawesome/free-solid-svg-icons` | `Solid-style icons`     |
| `@fortawesome/free-regular-svg-icons` | `Regular-style icons`     |
| `tailwindcss` | `Utility-first CSS framework for styling`     |
| `vite` | `for frontend build tool and dev server`     |

#### Backend `/backend`

| Dependency         | Description                |
| :------------------| :------------------------- |
| `express` | `Node,js web framework`     |
| `mongoose` | `MongoDB ODM`     |
| `dotenv` | `for loading environment variables`     |
| `jsonwebtoken` | `for handling JWT authentication`     |
| `bcryptjs` | `for password hashing`     |
| `cors` | `Enable CORS for frontend-backend communication`     |
| `morgan` | `HTTP request logging middleware`     |
