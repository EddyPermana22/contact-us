#!/bin/sh

# Substitute environment variables in the Nginx configuration template
envsubst '${BACKEND_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Execute the CMD from the Dockerfile
exec "$@"