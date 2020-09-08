const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

parameters = {
    host: "localhost",
    user: "root",
    password: "7572137",
    database: "nusbank",
    multipleStatements: true,
};

let connection = mysql.createConnection(parameters);
connection.connect((error) => {
    if (error){
        console.log(error);
    } else {
        console.log("Connection was successfull");
    }
});

/// Connected
let app = express();

app.use(bodyParser.json());

/* 
AddUser()
 POST route for /user 
  with body = {
    "id":598,
    "name": "John Heng",
    "mail": "johnheng@xyz.com",
    "mobile": "91191100",
    "nric" : "S1234765F"
}
*/
app.post("/user", (request, response) => {
    console.log(request.body);
    //
    connection.query(`INSERT INTO users(user_id, name, mail, mobile, nric) 
    VALUES (${request.body.id},'${request.body.name}', '${request.body.mail}', ${request.body.mobile}, '${request.body.nric}')`, 
    (err, result) => {
        if (err) {
            response.send("Some record error occur");
        }
        else {
            response.send("Record saved successfully");
        }    
    });
});

// ShowUser()
// GET route for /user query (AddUser)
app.get("/user", (request, response) => {
    strQuery = "SELECT * FROM users";
    if (request.body.limit > 0) {
        strQuery += ` LIMIT ${request.body.limit}`
    }

    connection.query(strQuery, 
    (err, result) => {
        if (err) {
            response.send("Some error occur");
        }
        else {
            response.send(result);
        }    
    });
});

// GetUserById()
// GET route for /user/id query
// with body = { "id": 2 }
app.get("/user/id", (request, response) => {
    console.log(request.body);
    //
    connection.query(`SELECT * FROM users WHERE user_id = ${request.body.id}`, 
    (err, result) => {
        if (err) {
            response.send("Some id error occur");
        }
        else {
            response.send(result);
        }    
    });
});

// GetUserByName()
// GET route for /user/id query
// with body = { "name": "John" }
app.get("/user/name", (request, response) => {
    console.log(request.body);
    //
    connection.query(`SELECT * FROM users WHERE name = '${request.body.name}'`, 
    (err, result) => {
        if (err) {
            response.send("Some name error occur");
        }
        else {
            response.send(result);
        }    
    });
});

// UpdateUserName()
// PUT route for /user/id query
// with body = { "id": 599 }
app.put("/user/name", (request, response) => {
    console.log(request.body);
    //
    connection.query(`UPDATE users SET name = '${request.body.name}'
    WHERE user_id = ${request.body.id}`, 
    (err, result) => {
        if (err) {
            response.send("user id error occur");
        }
        else {
            response.send(result);
        }    
    });
});

// DeleteUser()
// DELETE route for /user query
// with body = { "id": 599 }
app.delete("/user", (request, response) => {
    console.log(request.body);
    //
    connection.query(`DELETE FROM users WHERE user_id = '${request.body.id}'`, 
    (err, result) => {
        if (err) {
            response.send("user id error occur");
        }
        else {
            response.send(result);
        }    
    });
});

// listen port 3000
app.listen(3000);