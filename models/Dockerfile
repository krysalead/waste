FROM alpine
RUN apk add postgresql-client
WORKDIR /usr/
COPY createdb.sql .
COPY run.sh .
RUN chmod +x run.sh
ENTRYPOINT [ "./run.sh" ]