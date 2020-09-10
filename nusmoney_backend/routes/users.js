const express = require('express');
const router = express.Router();
const connection = require("../connection");

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
// PUT route for /users?id=xx query
// with body = { "name" = "..." }
router.put("/", (request, response) => {
  //
  connection.query(`UPDATE users SET name = '${request.body.name}'
  WHERE user_id = ${request.query.id}`, 
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
