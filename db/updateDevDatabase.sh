#!/bin/bash

# Push local database to DEV 
source .env
sudo rm -r temp
mongodump   --db dev --out temp
mongorestore --uri="$DATABASE_URI_DEV" --drop ./temp/dev

