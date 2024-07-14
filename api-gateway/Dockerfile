FROM node:22-alpine3.20
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY . .
RUN npx tsc
EXPOSE 8080
CMD ["node", "dist/api-gateway.js"]