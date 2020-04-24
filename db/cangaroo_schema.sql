-- Drops the cangaroo_inventory if it exists currently --
DROP DATABASE IF EXISTS cangaroo_inventory_db;
-- Creates the "cangaroo_inventory" database --
CREATE DATABASE cangaroo_inventory_db;

USE cangaroo_inventory_db;

show tables;

select * from Users;

-- product
-- 	id
--     product name
--     type
--     serving size

-- inventory
-- 	id
--     qty
--     product id
--     
-- donations
-- 	id
--     product id
--     user email
--     qty
--     
-- user
-- 	email
--     password
--     user type

