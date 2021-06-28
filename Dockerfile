FROM node:14.17.1-alpine
ARG COMPONENT
ARG PORT=4000
# uncomment the below line in case you have dependencies as git URL
# RUN apk add git
WORKDIR /usr/app
COPY ./${COMPONENT} .
COPY tslint.json /usr
COPY models /usr/models
RUN npm install --quiet
# Split the build commands and not bundle them to have a valid exit code that will fail the docker build as well if needed
RUN npm run lint
RUN npm run compile
# Wait is able to wait for a service to be up by pinging it and the current process of the image will start only then
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
EXPOSE ${PORT}
CMD /wait && npm start