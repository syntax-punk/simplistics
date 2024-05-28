FROM node:20-bullseye
WORKDIR /app
EXPOSE 5055

COPY . .

RUN npm install

CMD ["npm", "start"]
