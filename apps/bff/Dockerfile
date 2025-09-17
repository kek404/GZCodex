FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json turbo.json tsconfig.base.json .prettierrc.json .eslintrc.json ./
COPY packages ./packages
COPY apps ./apps
RUN npm install
RUN npm run build --workspace=@echo/bff

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/bff/dist ./apps/bff/dist
COPY --from=builder /app/apps/bff/package.json ./apps/bff/package.json
EXPOSE 4000
CMD ["node", "apps/bff/dist/index.js"]
