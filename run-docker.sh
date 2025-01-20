#!/bin/bash

# Ensure the script is run from the project root
if [ ! -f ".env" ]; then
    echo "Error: .env file not found. Please run this script from the project root."
    exit 1
fi

# Load environment variables
set -a
source .env
set +a

# Function to wait for the database to be ready
wait_for_db() {
    echo "Waiting for database to be ready..."
    while ! docker exec ${DB_NAME}_postgres pg_isready -q -h localhost -p 5432 -U ${DB_USER}
    do
        echo "Waiting for database connection..."
        sleep 2
    done
    echo "Database is ready."
}

# Start the database
echo "Starting database..."
docker-compose -f docker/docker-compose.yml up -d db

# Wait for the database to be ready
wait_for_db

# Change to the backend directory
cd backend

# Install dependencies
echo "Installing dependencies..."
npm install

# Run Prisma generate and build
echo "Running Prisma generate and building..."
npm run build:full

# Run Prisma migrations
echo "Running Prisma migrations..."
npm run prisma:migrate

# Return to the project root
cd ..

# Start the backend container
echo "Starting backend container..."
docker-compose -f docker/docker-compose.yml up -d --build backend

echo "Docker containers started successfully."
echo "Backend is now running with the pre-built version."