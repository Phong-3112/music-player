FROM node:22-alpine3.20
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY . .
RUN npx tsc
EXPOSE 3002
CMD ["node", "dist/playlist-service.js"]