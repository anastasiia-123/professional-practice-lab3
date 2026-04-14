

FROM node:18-alpine AS builder
WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


FROM node:18-alpine
WORKDIR /app


RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup
USER nodeuser


COPY --from=builder /app ./


HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1


EXPOSE 3000


CMD ["node", "index.js"]