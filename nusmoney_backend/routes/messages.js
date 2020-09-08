const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

/* 
AddUser()
 POST route for /accounts 
  with body = {
    "id":598,
    "type": "saving",
    "account_no": "111222333",
    "balance": "500",
    "date" : "2020-09-11",
    "max_limit": "10000"
}
*/
router.post("/", (request, response) => {
  console.log(request.body);
  //
  connection.query(`INSERT INTO messages (user_id, id, date, remark) 
  VALUES (${request.body.userid}, ${request.body.id}, ${request.body.date}, ${request.body.remark})`, 
  (err, result) => {
      if (err) {
          response.send("Some record error occur");
      }
      else {
          response.send("Record saved successfully");
      }    
  });
});

// ShowAccounts()
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
