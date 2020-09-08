const mysql = require("mysql");
const express = require('express');
const router = express.Router();

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
  connection.query(`INSERT INTO accounts(user_id, acct_type, acct_number, balance, date_created, max_limit) 
  VALUES (${request.body.id},'${request.body.type}', '${request.body.account_no}', ${request.body.balance}, '${request.body.date}', '${request.body.max_limit})`, 
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
// GET route for /accounts query (AddUser)
router.get("/", (request, response) => {
  console.log(request.body);
  //
    strQuery = "SELECT * FROM accounts";
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
