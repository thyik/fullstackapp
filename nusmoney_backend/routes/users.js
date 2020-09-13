const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* 
AddUser()
 POST route for /users 
  with body = {
    "name": "John Heng",
    "mail": "johnheng@xyz.com",
    "mobile": "91191100",
    "nric" : "S1234765F"
}
*/
router.post("/", (request, response) => {
  console.log(request.body);
  //
  connection.query(`INSERT INTO users(name, mail, mobile, nric) 
  VALUES ('${request.body.name}', '${request.body.mail}', ${request.body.mobile}, '${request.body.nric}')`, 
  (err, result) => {
      if (err) {
          response.send("Some record error occur");
      }
      else {
          response.send("Record saved successfully");
      }    
  });
});

// GetUserById()
// GET route for /users query
// use query parameter as GET don't allow body when using fetch() function
router.get("/", (request, response) => {
  //
  let sql = "SELECT * FROM users ";

  if (request.query.name != null){
    sql += `WHERE name = '${request.query.name}'`;
  }
  else if (request.query.id != null) {
    // validation to prevent show all users
    // eg. : "123 OR 1=1"
    if (isNaN(request.query.id)){
      // invalid id
      response.send("Invalid id format occur");
      return;
    }
    //
    sql += `WHERE user_id = ${request.query.id}`;
  }

  if (request.query.limit > 0){
    sql += ` LIMIT ${request.query.limit}`;
  }

  console.log(sql);

  connection.query(sql, 
  (err, result) => {
      if (err) {
          response.send("Some id error occur");
      }
      else {
          response.send(result);
      }    
  });
});

// UpdateUserName()
// PUT route for /users
// with body = { "name" = "..." }
router.put("/", (request, response) => {
  //
  if (request.body.id != null){
    // validation to prevent update all users
    // eg. : "123 OR 1=1"
    if (isNaN(request.body.id)){
      // invalid id
      response.send("Invalid id format occur");
      return;
    }
  }

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
// 
router.delete("/:id", (request, response) => {
  //
  if (request.params.id != null){
    // validation to prevent delete all users
    // eg. : "123 OR 1=1"
    if (isNaN(request.params.id)){
      // invalid id
      response.send("Invalid id format occur");
      return;
    }
  }
  //
  let sql = `DELETE FROM users WHERE user_id = ${request.params.id}`;
  console.log(sql);
  //
  connection.query(sql, 
  (err, result) => {
      if (err) {
          console.log(err.sqlMessage);
          response.send("delete user id error occur");
      }
      else {
          response.send(result);
      }    
  });
});

module.exports = router;
