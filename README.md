# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You need to install some tools in order to make the project work:

### `npm install`

With npm install you will be able to install the dependencies.

### `npm start`

With npm start, you can start the application, hosted in [http: // localhost: 3000].

### `Ctrl + C`

With ctrl + C, you can end the execution of the program.

# Implemented languages

JavaScript (React)

# Used tools

* Bootstrap 5.1
* React Router Dom
* HTML
* CSS
* NodeJS
* Firebase

# Component work

* Item: Responsible for composing each item in the store.
* ItemDetail: It's responsible for composing every detail of the Items.
* CartWidget: Se encarga de crear el Widget del carrito de compras.
* ItemCount: It's responsible for creating the shopping cart widget.
* ItemDetailContainer: It's responsible for deciding what detail should be displayed.
* ItemListContainer: It's responsible for displaying the corresponding items.
* NavBar: Takes care of the top navigation bar view.

# Context work

CartContext provides help to the components to be able to work with the cart:

Functions:

* addItem: It's responsible for receiving the id of a product and its quantity to add it to the cart.
* removeItem: It's responsible for receiving the id of a product and removing it
* clear: Remove all products from cart.
* all: It's responsible for keeping track of the price and total quantity of all the products in the cart.

Variable:

* Products: Contains all the products in the cart.

# .env

This project works with Firebase, and all the credentials are protected in a .env file, if 
you want to link your own database you can follow the structure in the .env.example 
file and your firebase data should have the automatic id generator.

# collections

All the documents of categories and items are objects this is what they should look like:

categories 

* name: "categoryname"

items: 

* category: "categoryname"
* color: "colorname"
* descrip: "a description"
* img: "img url"
* name: "productname"
* price: number
* size: "size"
* stock: number