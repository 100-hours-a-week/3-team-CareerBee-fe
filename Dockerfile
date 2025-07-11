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

# --- 2단계: 배포용 이미지  ---
FROM node:22-alpine AS runner

WORKDIR /frontend

RUN corepack enable && corepack prepare pnpm@10.7.1 --activate
ENV NODE_ENV=productio

# production 의존성만 따로 복사하고 싶다면 아래 주석 해제
# COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package.json ./package.json
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/.env ./.env

EXPOSE 5173

CMD ["pnpm", "start"]