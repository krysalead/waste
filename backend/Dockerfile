FROM node:14.17.1-alpine
ARG MODE
# install git
RUN apk add git
WORKDIR /usr/app
COPY package.json .
COPY tsconfig.json .
COPY index.js .
RUN npm ci --quiet
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
EXPOSE 4000
CMD /wait && npm start