FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json turbo.json tsconfig.base.json .prettierrc.json .eslintrc.json ./
COPY packages ./packages
COPY apps ./apps
RUN npm install
RUN npm run build --workspace=@echo/web

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web ./apps/web
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=@echo/web"]
