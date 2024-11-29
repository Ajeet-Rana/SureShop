FROM node:17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY Backend ./
EXPOSE 4000
CMD ["npm", "start"]
