# Stage 1: Build the React application
FROM node:22-alpine AS build

# Set the working directory to the root of the workspace inside the container
WORKDIR /app

# Copy the root workspace configuration
COPY package.json package-lock.json ./

# Copy package definitions for the client and shared library
COPY tmg-shared/package.json ./tmg-shared/
COPY tmg-client/package.json ./tmg-client/

# Install all dependencies (monorepo aware)
RUN npm install

# Copy the source code for the required packages
COPY tmg-shared ./tmg-shared
COPY tmg-client ./tmg-client

# Build the shared library first (dependency of client)
RUN npm run build -w tmg-shared

# Build the client application
RUN npm run build -w tmg-client

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the built static files from the build stage
COPY --from=build /app/tmg-client/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY tmg-client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD [ "nginx","-g","daemon off;" ]
