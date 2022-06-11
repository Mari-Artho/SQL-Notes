# SQL-Notes

Simple document management system using a relational database.

This project has a front-end and a back-end. The front-end uses plain JavaScript, the back-end uses express and MySQL.
The example code is not designed with security in mind.

## http://localhost:3000/


## Front file
npm init

npm i tinymce 

##
userName: janne

password: test

##
userName: mari

password: test

##
userName: ed

password: test

##
userName: anna

password: test

##
userName: nana

password: test


## Backend file
npm i

npm i mysql2

npm i cors

## mySQL settings
host: "localhost",

port: "8889",

user: "usernote",

password: "usernote",

database: "usernote"

## There are three tables.
table authorship => authorID, documentID

table users => id, userName, password, fullName

table documents =>  id, title, content

