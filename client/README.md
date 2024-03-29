# Client Part of the Application

This part of the application is responsible for the user interface and interaction with the server side.

## Used Technologies

- **React:** JavaScript library for building user interfaces.
- **Redux:** State management library for applications.
- **Axios:** Library for making HTTP requests to the server.

## Main Components

- **TaskList:** Component for displaying the list of tasks.
- **TaskItem:** Component for displaying an individual task.
- **TaskCreate:** Form for creating a new task.
- **TaskEdit:** Form for updating task information.

## Interaction with the Server

Axios is used for interaction with the server. Requests are sent to the following endpoints:

- **GET /tasks:** Get a list of all tasks.
- **GET /tasks/:id:** Get a specific task by its identifier.
- **POST /tasks:** Create a new task.
- **PATCH /tasks/:id:** Update information about an existing task.
- **DELETE /tasks/:id:** Delete a task by its identifier.

## Running the Application

1. Open the terminal.
2. Navigate to the directory where the client-side code is located.
3. Run the command `npm install` to install all necessary dependencies.
4. Run the command `npm start` to start the application.
5. After successful startup, the application will be available at [http://localhost:5173/](http://localhost:5173/).
