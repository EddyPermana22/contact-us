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
echo "Installing backend dependencies..."
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

# Change to the frontend directory
cd frontend

# Create or update .env file for frontend
echo "VITE_API_URL=http://localhost/api" > .env

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Build the frontend
echo "Building frontend..."
npm run build

# Return to the project root
cd ..

# Ensure nginx config directory exists
mkdir -p docker/nginx/conf.d

# Create a default nginx configuration if it doesn't exist
if [ ! -f "docker/nginx/conf.d/default.conf" ]; then
    cat << EOF > docker/nginx/conf.d/default.conf
server {
    listen 80;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:${BACKEND_PORT};
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF
fi

# Copy the built frontend to a directory that Nginx will serve
echo "Copying frontend build to Nginx serve directory..."
mkdir -p docker/nginx/html
cp -r frontend/dist/* docker/nginx/html/

# Start the Nginx container
echo "Starting Nginx container..."
docker-compose -f docker/docker-compose.yml up -d --build nginx

echo "Docker containers started successfully."
echo "Backend is now running with the pre-built version."
echo "Frontend is built and being served by Nginx on port 80."