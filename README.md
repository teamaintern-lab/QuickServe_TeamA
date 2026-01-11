# QuickService

A full-stack application for quick services, featuring a React frontend and Spring Boot backend.

## Prerequisites

- Java 17
- Maven
- Node.js and npm
- MySQL

## Database Setup

1. Install MySQL if not already installed.
2. Create a database named `quickservice_db`.
3. Update the database credentials in `backend/src/main/resources/application.properties` if necessary.

## Running the Application

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Run the Spring Boot application:
   ```
   mvn spring-boot:run
   ```
   The backend server will start on http://localhost:8080.

### Frontend

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
   The frontend will be available at http://localhost:5173.

## Additional Notes

- Ensure the database is running before starting the backend.
- The application uses WebSocket for real-time features.
