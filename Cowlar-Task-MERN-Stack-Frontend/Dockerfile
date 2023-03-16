FROM node:14.17.6

WORKDIR /app

COPY package.json ./

ENV MONGO_HOSTNAME=root
ENV MONGO_Pass=pass
ENV MONGO_DB=test
ENV PORT=5000


RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]