# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Compile TypeScript
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copy the compiled code from the build stage
# We copy it into a 'dist' directory to match the start script
COPY --from=build /app/dist ./dist

# Copy package files for production dependency installation
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]
