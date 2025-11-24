#!/bin/bash

docker-compose down -v --remove-orphans

git pull origin main 

docker-compose -f docker-compose-deploy.yml up --build -d
