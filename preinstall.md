# Frontend - Backend

## Server Client Project

### Prerequisite

* Run cmd in administrator mode
* npm - node package manager
* Install `React` for frontend
```
$ npm install -g create-react-app
```
* Install `express` for backend
```
$ npm install -g express-generator
```
* Install `cors` ??for backend
```
$ npm install -g save cors
```


## Prepare Client (Frontend)

* run npx (node package execute) from command line
```
$ npx create-react-app frontend
``` 
* navigate to `frontend` folder. start 
```
$ cd frontend
$ npm start
```

## Prepare Server (Backend)

* run from command line
```
$ express --view=pug backend
$ cd backend

// optional : something global install not working
$ npm install cors

// install dependencies defined in package.json
$ npm install
```
* navigate to `backend` folder. start
```
$ cd backend
$ npm start
```
