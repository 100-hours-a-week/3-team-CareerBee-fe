# 1. Build Stage
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

WORKDIR /frontend

ARG VITE_KAKAO_APP_KEY
ARG VITE_API_URL
ARG VITE_SHOW_UNRELEASED
ARG VITE_COMPETITION_START_HOUR
ARG VITE_COMPETITION_START_MINUTE
ARG VITE_COMPETITION_DURATION_MS
ARG VITE_COMPETITION_AGGREGATE_MS

RUN echo "VITE_KAKAO_APP_KEY=${VITE_KAKAO_APP_KEY}" >> .env && \
    echo "VITE_API_URL=${VITE_API_URL}" >> .env && \
    echo "VITE_SHOW_UNRELEASED=${VITE_SHOW_UNRELEASED}" >> .env && \
    echo "VITE_COMPETITION_START_HOUR=${VITE_COMPETITION_START_HOUR}" >> .env && \
    echo "VITE_COMPETITION_START_MINUTE=${VITE_COMPETITION_START_MINUTE}" >> .env && \
    echo "VITE_COMPETITION_DURATION_MS=${VITE_COMPETITION_DURATION_MS}" >> .env && \
    echo "VITE_COMPETITION_AGGREGATE_MS=${VITE_COMPETITION_AGGREGATE_MS}" >> .env
    
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm build

# 2. Serve Stage
FROM nginx:1.28.0-alpine-slim

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]