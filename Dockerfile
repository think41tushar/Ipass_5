# Use official Node.js image for building
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Use a lightweight Node.js image for running the app
FROM node:18-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy only the built files from the previous stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Install only production dependencies
RUN npm install --omit=dev

# Expose the application port
EXPOSE 3000

# Command to start the app
CMD ["npm", "run", "start"]
