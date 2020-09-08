const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

/* 
AddUser()
 POST route for /users 
  with body = {
    "id":598,
    "name": "John Heng",
    "mail": "johnheng@xyz.com",
    "mobile": "91191100",
    "nric" : "S1234765F"
}
*/
router.post("/", (request, response) => {
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
// GET route for /users query (AddUser)
router.get("/", (request, response) => {
  console.log(request.body);
  //
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
// GET route for /users/id query
// with body = { "id": 2 }
router.get("/id", (request, response) => {
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
// GET route for /users/id query
// with body = { "name": "John" }
router.get("/name", (request, response) => {
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
// PUT route for /users/id query
// with body = { "id": 599 }
router.put("/name", (request, response) => {
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
// DELETE route for /users query
// with body = { "id": 599 }
router.delete("/", (request, response) => {
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

module.exports = router;
