# Server Part of the Application

This part of the application is responsible for handling requests from the client side and interacting with the database, which is located in a Docker container.

## Used Technologies

- **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma ORM:** A modern ORM for TypeScript and JavaScript, providing convenient access to the database.
- **PostgreSQL:** An object-relational database for storing information.
- **Docker:** A platform for developing, delivering, and running software using containerization. It allows packaging applications and their dependencies into containers for easy deployment and management of development and production environments.

## Endpoints

### History
- **GET /histories:** Get a list of all history records.
- **GET /histories/:id:** Get a specific history record by its identifier.
- **POST /histories/:id:** Create a new history record for a specific task.

### Tasks
- **GET /tasks:** Get a list of all tasks.
- **GET /tasks/:id:** Get a specific task by its identifier.
- **POST /tasks:** Create a new task.
- **PATCH /tasks/:id:** Partially update an existing task by its identifier.
- **DELETE /tasks/:id:** Delete a task by its identifier.

### Statuses
- **GET /statuses:** Get a list of all statuses.
- **GET /statuses/:id:** Get a specific status by its identifier.
- **POST /statuses:** Create a new status.
- **PATCH /statuses/:id:** Partially update an existing status by its identifier.
- **DELETE /statuses/:id:** Delete a status by its identifier.

# Running the Server

1. Open the terminal.
2. Navigate to the directory where the server-side code is located.
3. Run the command `npm install` to install all necessary dependencies.
4. To create the .env file, use the command `npm run start:env`.
5. To start docker-compose, use the command `docker-compose up --build`.
6. Open another terminal and run the command `npm start` to start the server.
7. After successful startup, the server will be available at [http://localhost:5000/](http://localhost:5000/).
