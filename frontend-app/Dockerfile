FROM node:10.13.0-alpine

ADD . /frontend-app
WORKDIR /frontend-app
ENV PATH /frontend-app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm install
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]