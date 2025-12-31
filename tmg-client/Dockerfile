# Stage 1: Build the React application
# 1. Use an official Node.js runtime as a parent image (e.g., node:22-alpine)
FROM node:22-alpine AS build

# 2. Set the working directory inside the container to /app
WORKDIR /app
# 3. Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .
# 4. Install dependencies using npm install
RUN npm install
# 5. Copy the rest of the application code to the working directory
COPY . .
# 6. Build the application for production (npm run build)
RUN npm run build

# Stage 2: Serve the application with Nginx
# 7. Use an official Nginx image as the base image (e.g., nginx:stable-alpine)
FROM nginx:stable-alpine
# 8. Copy the built static files from the build stage (from /app/dist) to the Nginx html directory (/usr/share/nginx/html)
COPY --from=build /app/dist /usr/share/nginx/html

# 9. Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 10. Expose port 80 to the outside world
EXPOSE 80
# 11. Start Nginx when the container launches
CMD [ "nginx","-g","daemon off;" ]