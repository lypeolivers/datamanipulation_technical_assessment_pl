# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the source code to the container
COPY . .

# Expose the port your app is running on
EXPOSE 3001

# Start the application
CMD ["npm", "run", "dev"]


