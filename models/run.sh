#!/usr/bin/env sh
export PGPASSWORD=$POSTGRES_PASSWORD
psql -h $DB_HOST -p $DB_PORT -U $POSTGRES_USER -f createdb.sql