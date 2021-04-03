# Pepperoni Server

## _Pizza Place Server_

if you would like to interact with the server API you can use [this] collection of postman requests.

Or you can use the follow instructions:


| Description | URL | Request Type | Body
| ------ | ------ | ------ | ------ |
| Add a new user | 127.0.0.1:3000/createNewUser|POST|{"username" : "USERNAME","email": "EMAIL-ADDRESS","streetAddress":"STREET-ADDRESS","name": "FULL NAME"} |
|Edit User information | 127.0.0.1:3000/editUser|POST| JWT + {"CONTENT TO CHANGE" :"CONTENT"} |
|Delete a User | 127.0.0.1:3000/deleteUser|GET| JWT |
|Login | 127.0.0.1:3000/login|POST| JWT + {"username": "USERNAME"}|
|Get All Menu Items of the site | 127.0.0.1:3000/getAllMenuItems|GET| JWT |
|Add items to cart | 127.0.0.1:3000/addToCart|POST| JWT + {	"cartItems":[ "ITEM","ITEM", "ITEM"]} |
|Finish the order and send a mail to the client with the receipt | 127.0.0.1:3000/finishOrder|GET| JWT |


[this]: <https://www.getpostman.com/collections/b1bfae1dac15a635889b>
