# ---------- STEP 1: Build frontend ----------
FROM node:22 AS frontend

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client .
RUN npm run build

# ---------- STEP 2: Build backend + final image ----------
FROM node:22

WORKDIR /app

# Copy backend package.json
COPY server/package*.json ./
RUN npm install

# Copy backend source
COPY server .

# Copy frontend build artifacts
COPY --from=frontend /app/client/dist ./client/dist

# Environment and port
ENV NODE_ENV=production
EXPOSE 3000

# Command to start server
CMD ["node", "src/index.js"]