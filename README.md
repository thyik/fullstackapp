# Prepare Full Stack App

## Pre Requisite
* Install React : `sudo npm -g install create-react-app`
* Install Express : `sudo npm install -g express-generator`
* Install CORS : `sudo npm install -g save cors`

## Procedure
1. Create Project Folder. Eg. fullstackapp
2. Navigate to the folder
3. Create / prepare Backend project
   ```
   $ express --view=pug backend
   $ cd backend
   $ npm install
   ```
4. Create Frontend
    ```
    $ npx create-react-app frontend
    ```

## Check Backend function
1. Navigate to backend folder
2. Start the server
    ```
    $ npm start
    ```
3. Use browser to navigate [http://localhost:3000](http://localhost:3000)
4. The page should display "Express", "Welcome to express"
5. Press ctrl+c to stop the backend


## Check the frontend function
1. Navigate to frontend folder
2. Start the server
    ```
    $ npm start
    ```
3. Open browser and navigate to [http://localhost:3001](http://localhost:3001)
4. The page should display "React welcome page with react logo"
5. Press `ctrl+c` to stop the frontend


## Editing Backend is VScode
1. Launch VCcode from project folder `fullstack`
2. Navigate to backend
3. Open the file `/bin/www`
4. Change server port to 7000
    ```
    var port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);
    ```
5. Goto `routes` folder
6. Create a new file called `mypage.js`
    ```
    var express = require('express');  // import
    var router = express.Router();

    var mystr = "I am sending this DATA from backend to Frontend";

    /* GET my page */
    router.get('/', function(req, res, next) {
        res.send(mystr);
    });

    module.exports = router;
    ```
7. Open app.js and `add this line` 
    ```
    var createError = require('http-errors');
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
    var cors = require("cors");   // add this line

    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
    var mypageRouter = require('./routes/mypage');  // add this line

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(cors());  // add this line
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/mypage', mypageRouter);  // add this line

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
    next(createError(404));
    });
    ```
8. Install cors locally. Navigate to `backend` folder
    ```
    $ sudo npm install cors
    ```