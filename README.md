<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">vhiz_social</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

The purose of this project is to showcase my skill in api development through a social media api

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

First you need to have node installed in your local machine and you can install mongodb compass (optional)

then you need to install git for version control

then you will clone the repository
copy this code to your CMD or terminal

```
git clone https://github.com/vhiz/social_api.git
```

after cloning open the code in any editor of your choice and install all the dependencies

by running

```
npm install
```

in your terminal(must be in the root directory of the project)

### Note

this app when testing was use mongodb compass (locally) but if you do not have mongodb localy running on your machine it will automatically direct you to the MongoDB server(atlas) as i have created a cluster for this project.

ps the env file will come with the project as not to confuse anyone

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

## 🔧 Running the tests <a name = "tests"></a>

### HOME PAGE

```
Requset:GET
```

```

http://localhost:3000/
```

### Registration

```
request: POST
```

```
http://localhost:3000/api/auth/register
```

in the registration endpoint your username, password and email will be required and the username and password must not be less than 4 characters as shown below

```
{
  "username":"victor1",
  "password":"1234",
  "email":"vhiz@gmail.com"
}
```

if the email must be vallid before it accept the form
and you can only register 5 times daily because of rate limiting

### SIGNING IN

```
request: POST
```

```
http://localhost:3000/api/auth/login
```

to sign in you need to input your username and password as follows

```
{
  "username":"victor1",
  "password":"1234",
}
```

when you are done sigingin your id will be converterted in to a token and saved in the cookies of the application
which uses json web tokens for the autorization process

### GET CURRENT USER

in the root directory of the project there is a folder labeled utils and in that folder ther is a file called jwt.js which handles all the verification ie it takes the cookie and decodes it and sets it in the req.userId so there is no need to input any id in the params as long as you login and go to the get user endpoint it will return the current user

```
Request: GET
```

```
http://localhost:3000/api/users
```

and the good part is that there is no room for any injection of some sort.

### EDIT USER

```
Request: PUT
```

```
http://localhost:3000/api/users
```

As in the get user no need to input any id in the params as long as you login you can use your id anywhere in the app, you just have to input the part you want to change

```
{
  "password":"12345"
}
```

### DELETE USER

```
Request: DELETE
```

just set the delete to true and it will delete the user

```
{
  "delete": true
}
```

### SEARCH FOR A USER

to search for a user you will use the query function

```
Request: GET
```

```
http://localhost:3000/api/users/search?q=victor
```

you can replace the victor with your search string of choice mind you it must be the username

### ADD A FRIEND

```
Request: PUT
```

```
http://localhost:3000/api/users/relationship
```

to add a friend you will need to get the id of the friend you want to add you can do this by simply searching for the friend you want to add with the search for a user endpoint and copy the id of the friend you want to add and pass it to the body as userId

```
{
  "userId":"0d8786c0-d652-442e-8fd4-cd8607d4678f"
}
```

### GET ALL MY FRIENDS

to get all the friends of the current user

```
Request: GET
```

```
http://localhost:3000/api/users/myfriends
```

### CREATE A POST

```
Request: POST
```

```
http://localhost:3000/api/post
```

to create a post You just need to provide the description like this but you first need to login

```
{
  "desc":"My first post"
}
```

### GET USER FOLLOWING POST

```
Request: GET
```

```
http://localhost:3000/api/post
```

this is to check all the post of the users friends with the current user

### GET MY POST

```
Request: GET
```

```
http://localhost:3000/api/post/mypost
```

this is to check the current users post

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [JsonwebToken](https://jwt.io/introduction) - Autorization
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@vhiz](https://github.com/vhiz) - Idea & Initial work
