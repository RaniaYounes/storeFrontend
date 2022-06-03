# Building Storefront Application Project

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.

The database schema and and API route information can be found in the REQUIREMENT.md

## Create User

CREATE USER user_app WITH PASSWORD 'secret';

## Create the following databases:

CREATE DATABASE dapp;


## Grant privileges to databases

GRANT ALL PRIVILEGES ON DATABASE store_front_andrew TO store_owner;

## Add env file

fill the .env file with the following data:
ENV=dev
PORT=3000

#database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dapp
DB_TEST_NAME=dapp_test
DB_USER=dapp_user
DB_PASSWORD=secret

# BCRYPT
BCRYPT_ROUNDS=8
BCRYPT_PAPPER=YourVerySecretPassword

#JWT
JWT_SECRET=YourVerySecretJWTPassword
JWT_EXPIRATION='1h'


## Install packages in package.json file

Run the following command:
npm install

## Run migrations to create the tables of the database

Run the following command:
npm run db:up
npm run db:down

## Testing

run the following command:
npm run test

## Running the server

run the following command:
npm run start
npm run dev
