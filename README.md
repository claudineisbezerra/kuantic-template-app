# 🌠 Kuantic Template App 🌠

<p align="center">
    <img width="150"
        src="/client/assets/img/kuantic_logo.png"
        alt="kuantic-template-app" style="max-width:100%;">
</p>

Template for Real Time Chat Application created with MEVN stack. Including MongoDB/Mongoose/Mongo Atlas, Express, VueJS, Node and Socket IO.


[![Build Status](https://travis-ci.org/claudineisbezerra/kuantic-template-app.svg?branch=master)](https://travis-ci.org/claudineisbezerra/kuantic-template-app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


<!-- ## Root Dependencies -->
[![root devDependencies Status](https://david-dm.org/claudineisbezerra/kuantic-template-app/dev-status.svg)](https://david-dm.org/claudineisbezerra/kuantic-template-app?type=dev)
[![root dependencies Status](https://david-dm.org/claudineisbezerra/kuantic-template-app/status.svg)](https://david-dm.org/claudineisbezerra/kuantic-template-app)
<!-- ## Root/Client Dependencies -->
[![root/client devDependencies Status](https://david-dm.org/claudineisbezerra/kuantic-template-app/dev-status.svg?path=client)](https://david-dm.org/claudineisbezerra/kuantic-template-app?path=client)
[![root/client dependencies Status](https://david-dm.org/claudineisbezerra/kuantic-template-app/status.svg?path=client)](https://david-dm.org/claudineisbezerra/kuantic-template-app?path=client)
<!-- ## Root/Server Dependencies -->
[![root/server devDependencies Status](https://david-dm.org/claudineisbezerra/kuantic-template-app/dev-status.svg?path=server)](https://david-dm.org/claudineisbezerra/kuantic-template-app?path=server)
[![root/server dependencies Status](https://david-dm.org/claudineisbezerra/kuantic-template-app/status.svg?path=server)](https://david-dm.org/claudineisbezerra/kuantic-template-app?path=server)




## Contents

- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Seeding Data](#seeding-data)
- [Running Tests](#running-tests)
- [Configuration Setup](#configuration-setup)
- [Contribute](#contribute)

## Demo

View the application at [https://kuantic-template-app.herokuapp.com/](https://kuantic-template-app.herokuapp.com/)

View the project management cycle here [Kuantic Template Project Kanban (Trello)](https://trello.com/b/RVvgRNIx/kuantic-template-app)

### Tech Stack

| Technology | Description                                                                           | Link ↘️                 |
| ---------- | ------------------------------------------------------------------------------------- | ----------------------- |
| HTML5      | Hyper Text Markup Language                                                            | https://www.w3schools.com/html/default.asp  |
| CSS3       | Cascading Style Sheets                                                                | https://www.w3schools.com/css/default.asp   |
| JavaScript | High Level, Dynamic, Interpreted Language                                             | https://www.w3schools.com/js/default.asp    |
| SASS       | Syntactically Awesome Style Sheets                                                    | https://sass-lang.com/  |
| Babel      | Javascript Compiler                                                                   | https://babeljs.io/     |
| Webpack    | Javascript Module Bundler                                                             | https://webpack.js.org/ |
| NodeJS     | Open Source, Javascript Run Time Environment, Execute Javascript code for server side | https://nodejs.org/en/  |
| VueJS      | Progressive Javascript Framework                                                      | https://vuejs.org/      |
| Bootstrap Vue      | Framework for building responsive, mobile-first sites                           | https://bootstrap-vue.js.org/      |
| Jest       | Javascript Testing Framework                                                          | https://jestjs.io/      |
| Express       | Web Framework for Node.js                                                          | https://expressjs.com/  |
| MongoDB       | NoSQL Database                                                                     | https://www.mongodb.com/  |

## Features

- [Express](https://expressjs.com/) as the web framework on the server
- Implements stateless authentication with [JWT](https://jwt.io/) tokens
- Authenticates [JWT](https://jwt.io/) and social authentication using [Passport](http://www.passportjs.org/)
- Hashes passwords using the [bcryptjs](https://www.npmjs.com/package/bcryptjs) package
- Internationalization on [Client](https://kazupon.github.io/vue-i18n/) and [Server](https://github.com/mashpie/i18n-node/) sides
- Enables real time communication to the server using [Socket IO](https://socket.io/)
- [MongoDB](https://www.mongodb.com/) and [Mongo Atlas](https://www.mongodb.com/cloud/atlas) is used for storing and querying data
- Server logging is done with [Winston](https://www.npmjs.com/package/winston) and [Morgan](https://www.npmjs.com/package/morgan)
- [Concurrently](https://www.npmjs.com/package/concurrently) is used to run both the server and client at the same time
- [Vue JS](https://vuejs.org/) is used as the frontend framework
- [Travis CI](https://travis-ci.org/) is incorporated for continuous integration
- [Heroku](https://www.heroku.com) is used for production deployment

## Installation

### Running Locally

_Ensure [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are installed_

1. Clone or Download the repository (Depending on whether you are using SSH or HTTPS)

```bash
$ git clone git@github.com/claudineisbezerra/kuantic-template-app.git
$ cd kuantic-template-app
```

2. Install dependencies for root, client and server

> You will need to npm install in each directory in order to install the node module needed for each part of the project

> Directories Include: Root, Server & Client



3. Add .env file to server folder and fill out details according to the .env.example. See [configuration details](#configuration-setup) for social auth and database setup

4. Start the application

```bash
$ npm run dev
```

5. Navigate to [localhost:8080](localhost:8080). The application should be up and running successfully

### Deploying to Heroku

_Ensure you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed_

1. Login to heroku via the CLI

```bash
$ heroku login
```

2. Create a new heroku app

```bash
$ heroku create
```

3. Before pushing to heroku, you need to set up the config variables in other words the env variables you would use locally

    i. Go to Settings -> Reveal Config Vars

    ii. Add the config variables according to the .env.example

    iii. These Include

    ```bash
    DATABASE_URL
    FACEBOOK_CLIENT_ID
    FACEBOOK_CLIENT_SECRET
    GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET
    JWT_SECRET
    PORT (Optional)
    NPM_CONFIG_PRODUCTION (Must be false)
    ```

    iv. Ensure that you set NPM_CONFIG_PRODUCTION to false to allow installation of dev dependencies for post build to work correctly

4. Commit any changes and push your code from local repo to your git
```bash
$ git add -A
$ git commit -m "message here"
$ git push heroku master
```

5. Open the heroku app

```bash
$ heroku open
```

_Note: You may also connect your github repo to the heroku and add automatic deployment on push to the github repo_

## Seeding Data

If at anytime in development you'd like to quickly seed some dummy data you use the command below

```bash
$ npm run seed:data
```

## Running Tests

Tests should be run before every commit to ensure the build is not broken by any code changes.

Running Both Client and Server Tests
```javascript
In the root directory
$ npm run test
```

Running Client Tests
```javascript
$ npm run client:test
```

Watching Server Tests
```javascript
$ npm run server:test:watch
```

## Configuration Setup

These configuration setups are necessary for the app to function correctly as intended. These configuration setups will be required to be added as environment variables for the server to make use of.

### Local Environment Variables (.env file)
For development you will need a .env file for environmental variables. This includes:

```bash
DATABASE_URL=DATABASE_URL
EXPRESS_SESSION_KEY=EXPRESS_SESSION_KEY
JWT_SECRET=JWT_SECRET
GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET
FACEBOOK_CLIENT_ID=FACEBOOK_CLIENT_ID
FACEBOOK_CLIENT_SECRET=FACEBOOK_CLIENT_SECRET
PORT=PORT
```

### MongoDB & Mongo Atlas

A MongoDB URI is needed to connect to a MongoDB connection. The easiest way to do this is to use [Mongo Atlas](https://www.mongodb.com/cloud/atlas). If you'd like to do this locally you can follow the instructions at (https://docs.mongodb.com/manual/installation/)

#### Mongo Atlas

1. Select 'Build a New Cluster' and follow the prompts

2. When the Cluster has been created, click on 'Connect'

3. Choose your connection method, for the purposes of this application we will use 'Connect Your Application'

4. Next you will need to grab this connection string (Standard connection string). This is the URI that will be used as an environment variable

### JWT Secret

The JWT Secret is required as a way to keep the JWT Token secure when the signature is hashed. This secret key should be secret to you and should be updated periodically.

### Google

To setup google oauth, you'll need to configure some details through Google Cloud Platform

1. Navigate to https://console.cloud.google.com/

2. Using 'APIs & Services', you'll need to enable the 'Google+ API'

3. Once enabled, click on 'Credentials'

4. Go to 'OAuth Consent Screen', you will need to add the 'Authorized Domains' to authorize your domain with Google

5. You will need to save the Client ID and Client Secret for use in the environment variables

6. You will also need to add the domain you are using ie. localhost or heroku to both 'Authorized Javascript Origins' and 'Authorized Redirect URIs'

    i. The redirect URIs are in the format of domain/api/auth/provider/redirect

### Facebook

To setup facebook oauth, you'll need to configure some details through Facebook for Developers

1. Login at https://developers.facebook.com/

2. Go to 'My Apps' and create a new app

3. Navigate to Settings -> basic

4. Save the App ID and App Secret for use in environment variables

5. Add your app domain in 'App Domains'

6. Under Products -> Facebook Login -> Settings, Add your redirect URIs under 'Valid OAuth Redirect URIs'

    i. The redirect URIs are in the format of domain/api/auth/provider/redirect

## Contribute

Built as a personal project for learning experience. Please feel free to contribute by creating issues, submitting new pull requests!
