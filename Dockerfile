FROM node:18 as BUILD_IMAGE

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install && npm run build

FROM node:18 as PRODUCTION_IMAGE

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

COPY package.json .

COPY vite.config.js .

RUN npm install typescript

EXPOSE 3000

CMD ["npm", "run", "preview"]