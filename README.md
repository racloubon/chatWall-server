# chatWall-server
Chat wall is an application created to post messages from users in a big screen. The main idea is to create a channel that will be shown in one or more big screens from a computer and the other users can join the channel to post messages there that will be shown for 10 seconds. This repo is the backend of this application. If you want to check the frontent visit [chat-wall-client](https://github.com/davidecorreu/chatwall-client)

# Runnning the backend

## Prerequisite
- [npm] (https://www.npmjs.com/)
- [postgresql] (https://www.postgresql.org/)
- [node] (https://nodejs.org/en/)

## Steps
  1. [Clone the repo](#1-clone-the-repo)
  2. [Set up postgresql](#2-set-up-postgresql)
  3. [Create your .env file](#3-create-your-.env-file)
  4. [Run the server](#4-run-the-server)
  5. [You are ready to set up the front end!](#5-you-are-ready-to-set-up-the-front-end)

## 1. Clone the Repo

Clone the `chatwall-server code` locally. In a terminal, run:

  `git clone https://github.com/davidecorreu/chatWall-server.git`

## 2. Set up postgresql

Install postgresql, create a new database named 'chat-wall-db' and start postgresql service.

## 3. Create your .env file

ENV="development"  
PORT=3003  
DB_USER=<your_db_user>  
DB_PASSWORD=<your_db_password>  
JWT_SECRET=<your_jwt_secret>

## 4. Run the server

In the terminal, run:
```
npm install
npm run dev
```
## 4. You are ready to set up the front end!

Navigate to [chat-wall-client](https://github.com/davidecorreu/chatwall-client) and follow the instructions in the README.md to finish the setup and run the application.



## Tech Stack

- Postgresql
- Sequelize
- Json Web Token
- Koa

