FROM node:22-alpine3.20
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY . .
RUN npx tsc
EXPOSE 3001
CMD ["node", "dist/auth-service.js"]
