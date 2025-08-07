#!/bin/bash

source .env
# sudo rm -r temp
# mongodump --uri="mongodb://localhost:27017/betterclimber_dev" --out temp
mongorestore --uri="$DATABASE_URI_DEV" --drop ./temp/betterclimber_dev
