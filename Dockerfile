# --- 1단계: 빌드 단계 ---
FROM node:22-alpine AS builder

WORKDIR /frontend

# 패키지 매니저와 락 파일 복사
COPY package.json pnpm-lock.yaml ./

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate

# 의존성 설치
ENV CI=true
COPY . .
RUN pnpm install
RUN pnpm build

# --- 2단계: 배포용 이미지 (Nginx) ---
FROM nginx:1.28.0-alpine-slim

# 빌드된 정적 파일 복사
COPY --from=builder /frontend/dist /usr/share/nginx/html

# 80포트 오픈
EXPOSE 80

# 기본 엔트리포인트 유지
CMD ["nginx", "-g", "daemon off;"]