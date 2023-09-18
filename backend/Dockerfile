# Use an official Node.js runtime as a parent image
FROM node:16.20.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Expose port 9000
EXPOSE 9000

# Define the command to run your app
CMD ["node", "build/main.js"]