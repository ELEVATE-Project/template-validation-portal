# -------- Stage 1: Build Angular app --------
FROM node:16.10.0-slim AS build

WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli@13.3.0

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Build Angular app
RUN ng build --configuration=production


# -------- Stage 2: Serve app securely --------
FROM node:16.10.0-slim AS final

# Create non-root user
RUN useradd -m appuser

WORKDIR /usr/src/app

# Copy build output
COPY --from=build /app/dist/template-validation-portal ./dist

# Install serve
RUN npm install -g serve

# Fix permissions
RUN chown -R appuser:appuser /usr/src/app

# Switch to non-root
USER appuser

EXPOSE 3111

CMD ["serve", "-s", "dist", "-p", "3111"]
