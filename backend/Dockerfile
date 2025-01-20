# backend/Dockerfile
FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# Install OpenSSL dan dependencies lain yang diperlukan
RUN apt-get update -y && \
    apt-get install -y openssl libssl-dev ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY dist ./dist
COPY prisma ./prisma

# Install production dependencies
RUN npm ci --only=production

ARG PORT=4000
ENV PORT=$PORT

EXPOSE $PORT

CMD ["npm", "run", "start"]