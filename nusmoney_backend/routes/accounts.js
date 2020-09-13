const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

/* 
AddAccount()
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
  connection.query(`INSERT INTO accounts(user_id, acct_type, acct_number, balance, max_limit) 
  VALUES (${request.body.userid},'${request.body.type}', '${request.body.account_no}', ${request.body.balance}, ${request.body.max_limit})`, 
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
  console.log(request.query);
  //
  strQuery = "SELECT * FROM accounts";
  if (request.query.id != null) {
    strQuery += ` WHERE user_id = ${request.query.id}`;
    }
    else if (request.query.name != null) {
        strQuery = `SELECT u.name, a.* FROM accounts AS a
        INNER JOIN users AS u
        ON u.user_id = a.user_id
        WHERE u.name = '${request.query.name}'`;
    }
    else if (request.query.account_no != null) {
        strQuery = `SELECT a.* FROM accounts AS a
        WHERE a.acct_number = '${request.query.account_no}'`;


    }

  if (request.query.limit > 0) {
      strQuery += ` LIMIT ${request.query.limit}`
  }
  //
  console.log(strQuery);
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


// DeleteAccount()
// DELETE route for /accounts/{account_no} query 
router.delete("/:account_no", (request, response) => {
  console.log(request.params);
  //
  strQuery = `DELETE FROM accounts WHERE acct_number = '${request.params.account_no}'`;
  console.log(strQuery);
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

// UpdateAccountBalance()
// PUT route for /accounts/balance 
router.put("/balance", (request, response) => {
  console.log(request.body);
  //
  strQuery = `UPDATE accounts SET balance = ${request.body.balance} WHERE acct_number = '${request.body.account_no}')`;
  console.log(strQuery);
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

// GetHighestBalance()
// GET route for /accounts/highest query 
router.get("/highest", (request, response) => {
  console.log(request.body);
  //
  strQuery = `SELECT u.user_id, u.name, SUM(a.balance) AS total FROM accounts AS a
  INNER JOIN users AS u
  ON a.user_id = u.user_id
  GROUP BY a.user_id
  ORDER BY total DESC
  LIMIT 1`;
  console.log(strQuery);
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

// GetLowestBalance()
// GET route for /accounts/lowest query 
router.get("/lowest", (request, response) => {
  console.log(request.body);
  //
  strQuery = `SELECT u.user_id, u.name, SUM(a.balance) AS total FROM accounts AS a
  INNER JOIN users AS u
  ON a.user_id = u.user_id
  GROUP BY a.user_id
  ORDER BY total ASC
  LIMIT 1`;
  console.log(strQuery);
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
