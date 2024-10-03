# Use the official Node.js 20.17.0 image as the base image
FROM node:20.17.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port that the NestJS app will run on
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "run", "start:prod"]
