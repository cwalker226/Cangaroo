# Cangaroo
![dependencies status](https://img.shields.io/david/cwalker226/Cangaroo?style=for-the-badge)
![code size](https://img.shields.io/github/languages/code-size/cwalker226/Cangaroo?style=for-the-badge)

## Table of Contents
* [About](#about)
* [Installation](#installation)
* [Usage](#usage)
* [Demo](#demo)
* [Technologies](#technologies)
* [Authors](#authors)
* [Contributions](#contributions)

## About
Cangaroo is a Food Bank inventory management system, created with Node/Express on a MySQL backend. The front end is built with Handlebars templating and Bulma CSS, and email addresses used for registration are verified by a third party (currently supporting Verifalia).

Register as a donor or a client. 

### Donors

Donors can create donation requests for specific products. They can view their confirmed requests and unconfirmed requests.

### Clients

Clients can create assistance requests. They can view their confirmed assistance and unconfirmed assistance.

### Admins

Admins can approve donations, or approve client assistance requests as well as view confirmed and unconfirmed donations and requests. They can manage inventory by viewing inventory or products as well as adding new products.

## Installation

### Get the app

Clone the repo:

`git clone https://github.com/cwalker226/Cangaroo`

Install dependencies:

`cd Cangaroo`

`npm i`

### Set up your environment

Create a file for your database connection information:

`touch .env`

Open the file `.env` with your favorite editor and add the connection information (this file is ignored by Git):

`DB_HOST=localhost`

`DB_USER=root`

`DB_PASS=password`

`DB_NAME=cangaroo_db`

Also add the Verifalia API connection information (free, registration at https://verifalia.com required):

`VERIFALIA_USER=myverifaliauser`

`VERIFALIA_PASS=myverifaliapass`

If you are running on Heroku, add a few config variables to your app. You just need VERIFALIA_USER, VERIFALIA_PASS and this entry:

`NODE_ENV=production`

### Optional: Configure Heroku

Add a new JawsDB MySQL addon to your Heroku app. This creates the `JAWSDB_URL` environment variable config for your app on Heroku. On your development system, to connect to the production database you can add the same `JAWSDB_URL` environment variable to your .env file and control its use with `NODE_ENV=production` in your local .env. The default NODE_ENV is development.

### Create database

Create the database by running the following command using MySQL Workbench or other MySQL client:

`CREATE DATABASE cangaroo_db;`

If you're seeding Heroku's database, you need to set your NODE_ENV=production in .env as above.

Seed the database with:
`sequelize db:seed --seed 00_essentials-products-seed-file.js`
`sequelize db:seed --seed 01_essentials-inventories-seed-file.js`

Or for testing:
`sequelize db:seed:all`

## Usage

Start the server:

`npm start`

Load the app at [http://localhost:8080](http://localhost:8080).


## Demo
A demo of the app can be found here:

[https://cangaroo.herokuapp.com/](https://cangaroo.herokuapp.com/)

## Technologies
* Node.js
* Express.js
* MySQL
* Handlebars.js
* Bulma
* Verifalia

## Authors

This software was created by Andy J Chen, Ian Johnson, Max Lemieux and Corey Walker.

## Contributions

This software is licensed under the MIT License.

We welcome contributions. Several future development ideas have been recorded as "enhancement" issues.
