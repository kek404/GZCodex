FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json turbo.json tsconfig.base.json .prettierrc.json .eslintrc.json ./
COPY packages ./packages
COPY apps/services/catalog ./apps/services/catalog
RUN npm install
RUN npm run build --workspace=@echo/catalog

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/services/catalog/dist ./dist
COPY apps/services/catalog/package.json ./package.json
EXPOSE 4100
CMD ["node", "dist/main.js"]
