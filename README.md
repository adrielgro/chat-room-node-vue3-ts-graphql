# Real-Time Chat with GraphQL and Vue 3

Welcome to our real-time chat application built with GraphQL, Vue 3, Node.js, and TypeORM. This project enables instant communication with GraphQL Subscriptions, utilizing a clean architecture for maintainability and Vuex for state management. It's styled with Tailwind CSS for a sleek and responsive user interface.

## Features

- Real-time chat with GraphQL Subscriptions
- Clean architecture for scalability and maintainability
- Vuex for centralized state management
- Tailwind CSS for responsive styling

## Getting Started

### Running with Docker

1. Make sure you have Docker installed on your machine.

2. Navigate to the `chat-room-node-vue3-ts-graphql` directory, where you'll find the `docker-compose.yml` file.

3. Run the following command to build and start the containers:

   ```bash
   docker-compose up -d --build
   ```

4. Once the containers are running, you can access the application:
   - Frontend: http://localhost:4173
   - Backend GraphQL Playground: http://localhost:9000/graphql

## Running Frontend and Backend Separately

### Running Frontend (Vite)
1. Navigate to the chat/frontend directory.
2. Install project dependencies with npm install or yarn install.
3. Start the development server with the following command:

   ```bash
   yarn install
   yarn dev
   ```
4. Open your browser and access the frontend at http://localhost:4173

### Running Backend (Node.js)
1. Navigate to the chat/backend directory.
2. Install project dependencies with npm install or yarn install.
3. Configure your database connection in the server settings.
4. Start the Node.js server with the following command:

   ```bash
   yarn install
   yarn dev
   ```
5. The GraphQL server will be available at http://localhost:9000/graphql

## Contributing
We welcome contributions from the community! If you'd like to contribute, please follow our contribution guidelines.

## License
This project is licensed under the MIT License.