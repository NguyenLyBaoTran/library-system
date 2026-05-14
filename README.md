# Library Management System (Dual-API Architecture)

This project is a Library Management System built with Node.js, Express, Sequelize, and Apollo Server. It implements a dual-stack API design, supporting both RESTful and GraphQL endpoints to manage books, users, and borrowing records.

## I. Deployment Information

* **Live Website URL:** [https://library-backend-production-244f.up.railway.app/](https://library-backend-production-244f.up.railway.app/)
* **GraphQL Endpoint:** [https://library-backend-production-244f.up.railway.app/graphql](https://library-backend-production-244f.up.railway.app/graphql)
* **REST Base URL:** [https://library-backend-production-244f.up.railway.app/api/books](https://library-backend-production-244f.up.railway.app/api/books)
* **Frontend Integration:** Integrated into the server as static assets served from the `/public` directory.

## II. Key Features

* Dual-API Design: Full support for REST and GraphQL to compare efficiency (Over-fetching/Under-fetching).
* Integrated Frontend: Next.js frontend is pre-built and served directly by the Express backend.
* Role-based Access Control: Admin manages inventory and records; Users borrow books and access the Comparison Dashboard.
* Comparison Tool: A dedicated dashboard for users to analyze real-time performance metrics between API types.

---

## III. Setup Instructions (Step-by-Step)

### 1. Prerequisites

* Node.js environment (v18.x or higher recommended).
* Internet connection to access the Railway MySQL database.

### 2. Local Installation

1. Clone the repository:

```bash
git clone https://github.com/NguyenLyBaoTran/library-system.git

```

2. Navigate to the server directory:

```bash
cd library-system/server

```

3. Install all required backend dependencies:

```bash
npm install

```

### 3. Environment Configuration

Create a .env file in the server/ directory (already included in the midterm essay push) and add the required environment variables for the server, database connection, and JWT authentication.

```env
# Server Configuration
PORT=5000

# Database Configuration (Railway)
DB_HOST=your_railway_host_here
DB_PORT=your_railway_port_here
DB_USER=root
DB_PASSWORD=your_railway_password_here
DB_NAME=railway

# Security
JWT_SECRET=your_secret_key_here

```

### 4. Running the Application

To start the production server:

```bash
npm start

```

To start the development server with hot-reload:

```bash
npm run dev

```

The application will be accessible at: `http://localhost:5000`

---

## IV. Testing Credentials

To verify the Role-based Access Control and Comparison features, use the following credentials:

| Role | Username | Password | Permissions |
| --- | --- | --- | --- |
| **Admin** | `admin_library` | `password123` | Manage Books, View Records |
| **User** | `user_test` | `password123` | View books, Borrow books, Access Compare Dashboard|

---

## V. API Documentation & Analysis

### 1. GraphQL Endpoint

* URL: `http://localhost:5000/graphql`
* Purpose: Demonstrates precise data fetching. Clients can request only necessary fields (e.g., just `title` and `author`) to minimize payload size.
* Sample Query:

```graphql
query {
  getAvailableBooks {
    id
    title
    category
  }
}

```

### 2. RESTful Endpoints

* Base URL: `http://localhost:5000/api/books`
* Purpose: Demonstrates traditional resource-based routing. Returns full objects regardless of client needs (Over-fetching).
* Key Endpoints:
* `GET /api/books`: Retrieve all available books.
* `POST /api/books`: Admin adds new books (Requires Admin JWT).
* `DELETE /api/books/:id`: Admin removes books.



---

## VI. Implementation Detail (Rubric ID: 3)

The system architecture facilitates a direct comparative analysis between REST and GraphQL.

* **Over-fetching Solution:** GraphQL allows the Compare Dashboard to request only 5 specific fields, whereas the REST counterpart returns the entire Book model including timestamps and raw database IDs.
* **Access Control:** The system uses a customized Middleware to parse JWTs. The Admin (`admin_library`) is granted access to the management UI but restricted from the Compare page to maintain test data objectivity. Users have access to the Compare page which fetches data using the `getAvailableBooks` query to ensure results match the public REST API output (29 books).
* **Frontend Serving:** The `server/public` folder contains the optimized build of the Next.js application, ensuring the entire product is deployable as a single unit.