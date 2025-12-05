# 🛠️ QuickServe — Local Setup Guide

Follow these steps to run the QuickServe project on your local system.

# Requirements:
- Java 21+
- Maven
- MySQL Server
- Node.js and npm
  
---

# STEP 1 — Install & Configure MySQL:
- Install MySQL and create a database named quickserve:
- CREATE DATABASE quickserve;
- To start your MySQL use the command "net start MySQL" in the command prompt.

---

# STEP 2 — Configure Backend Credentials:
- Open: quickserve-backend/src/main/resources/application.properties
- Update these values with your local MySQL credentials:
- spring.datasource.url=jdbc:mysql://localhost:3306/quickserve
- spring.datasource.username=your_mysql_username
- spring.datasource.password=your_mysql_password
- spring.jpa.hibernate.ddl-auto=update
- spring.jpa.show-sql=true
- spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
- (Note: Do not commit your password to GitHub)

---

# STEP 3 — Run Backend:
- Navigate to backend folder and run:
- mvn spring-boot:run
- Backend will start at http://localhost:8080
- You to find "Tomcat started at host 8080" which indicates that backend is running successfully.
- If you get an error that "localhost 8080 is already in use" then use the following commands
- In command prompt
-    ->netstat -ano | findstr :8080
-    You find something like this =>TCP  0.0.0.0.8080  0.0.0.0.0  LISTENING  XXXX(this is some number in 4 or 5 digits which is PID)
-    ->taskkill /PID XXXX /F(XXXX=>PID in previous command)
- In VSCode
-   ->Click Ctrl+C
-   ->next choose y

---

# STEP 4 — Run Frontend:
- Open new terminal
- Navigate to the frontend folder:
- npm install
- npm run dev
- Open the shown link in browser (example): http://localhost:5173/

🎯 Setup Complete!
- Backend + Frontend are now running successfully. Each team member uses their own MySQL credentials locally. Enjoy building QuickServe! 🚀
