# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copy root workspace configuration
COPY package.json package-lock.json ./

# Copy package definitions
COPY tmg-shared/package.json ./tmg-shared/
COPY tmg-server/package.json ./tmg-server/

# Install all dependencies
RUN npm install

# Copy source code
COPY tmg-shared ./tmg-shared
COPY tmg-server ./tmg-server

# Build shared library first
RUN npm run build -w tmg-shared

# Build the server (includes prisma generate)
# Note: Ensure tmg-server/package.json build script handles prisma generate if needed, 
# or run it explicitly here.
WORKDIR /app/tmg-server
RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copy root workspace configuration for production install
COPY package.json package-lock.json ./
COPY tmg-shared/package.json ./tmg-shared/
COPY tmg-server/package.json ./tmg-server/

# Install only production dependencies
RUN npm install --omit=dev

# Copy the compiled code and required artifacts from the build stage
COPY --from=build /app/tmg-server/dist ./dist
COPY --from=build /app/tmg-server/prisma ./prisma
# Copy shared library dist so it can be resolved by the server at runtime
COPY --from=build /app/tmg-shared/dist ./tmg-shared/dist

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]