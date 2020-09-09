const express = require('express');
const router = express.Router();
const connection = require("../connection");

// add message
router.post("/", (request, response) => {
  console.log(request.body);
  //
  connection.query(`INSERT INTO messages (user_id, date, remark) 
  VALUES (${request.body.id}, NOW(), '${request.body.message}')`, 
  (err, result) => {
      if (err) {
          response.send("Some record error occur");
      }
      else {
          response.send("Record saved successfully");
      }    
  });
});

// delete message
router.delete("/", (request, response) => {
  console.log(request.body);
  //
  connection.query(`DELETE FROM messages WHERE id = ${request.body.message_id}`, 
  (err, result) => {
      if (err) {
          response.send("Some record error occur");
      }
      else {
          response.send(result);
      }    
  });
});

// ShowMessages()
// GET route for /messages query (AddUser)
router.get("/", (request, response) => {
  console.log(request.body);
  //
    strQuery = "SELECT * FROM messages";
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

module.exports = router;
