# Cangaroo
![dependencies status](https://img.shields.io/david/maxlemieux/mvcheezburger?style=for-the-badge)
![code size](https://img.shields.io/github/languages/code-size/maxlemieux/mvcheezburger?style=for-the-badge)

## Table of Contents
* [About](#about)
* [Installation](#installation)
* [Usage](#usage)
* [Demo](#demo)
* [Technologies](#technologies)

## About
Cangaroo is a Food Bank inventory management system, created with Node/Express on a cloud hosted MySQL backend. The front end is built with Handlebars templating and Bulma CSS, and email addresses used for registration are verified by a third party.

Register as a donor or a client. 

Donors can create donation requests for specific products. They can view their confirmed requests and unconfirmed requests.

Clients can create assistance requests. They can view their confirmed assistance and unconfirmed assistance.

Admins can approve donations, or approve client assistance requests as well as view confirmed and unconfirmed donations and requests. They can manage inventory by viewing inventory or products as well as adding new products.

## Installation

Clone the repo:

`git clone https://github.com/cwalker226/Cangaroo`

Install dependencies:

`cd Cangaroo`

`npm i`

Create a file for your database connection information:

`touch .env`

Open the file `.env` with your favorite editor and add the connection information:

`DB_HOST=localhost`

`DB_USER=root`

`DB_PASS=password`

`DB_NAME=cangaroo_db`

Create the database using MySQL Workbench or other client by running the following command:

`CREATE DATABASE cangaroo_db;`

Seed the database with:

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
* ![alt text](https://i.ytimg.com/vi/KeKoEQ0ZxS0/hqdefault.jpg "Roger")
