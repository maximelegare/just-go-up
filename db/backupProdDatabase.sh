#!/bin/bash



source .env
sudo rm -r temp
mongodump --uri="$DATABASE_URI_PROD" --out temp
mongorestore --uri="$DATABASE_URI_LOCAL" --drop ./temp/dev


