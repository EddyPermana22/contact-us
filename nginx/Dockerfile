# nginx/Dockerfile
FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy the template
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Use entrypoint script to substitute environment variables
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]