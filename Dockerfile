# ===== Build Stage =====
FROM node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ===== Production Stage =====
FROM node:22-slim AS production

WORKDIR /app

COPY package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
