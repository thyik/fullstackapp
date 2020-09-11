const express = require('express');
const router = express.Router();
const connection = require("../connection");

// add a transaction
router.post("/", (request, response) => {
  console.log(request.body);
  //
  connection.query(`INSERT INTO transactions (acct_number, date, type, amount) 
  VALUES ('${request.body.account_no}', ${request.body.date}, '${request.body.type}', ${request.body.amount})`, 
  (err, result) => {
      if (err) {
          response.send("Some record error occur");
      }
      else {
          response.send("Record saved successfully");
      }    
  });
});

// delete a transaction
router.delete("/:id", (request, response) => {
  console.log(request.params);
  //
  connection.query(`DELETE FROM transactions WHERE id = ${request.params.id}`, 
  (err, result) => {
      if (err) {
          response.send("Some record error occur");
      }
      else {
          response.send(result);
      }    
  });
});

// ShowTransactions()
// GET route for /transactions query (AddUser)
router.get("/", (request, response) => {
  //
  strQuery = "SELECT * FROM transactions";
  if (request.query.account_no != null) {
    strQuery += ` WHERE acct_number = '${request.query.account_no}'`;
  }
  else if (request.query.id != null) {
    strQuery = `SELECT a.user_id, t.* FROM transactions AS t
    INNER JOIN accounts AS a
    ON a.acct_number = t.acct_number
    WHERE t.acct_number 
    IN (SELECT acct_number FROM accounts WHERE user_id = ${request.query.id})`;
  }
  //
  if (request.body.limit > 0) {
      strQuery += ` LIMIT ${request.query.limit}`
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

// GetUsersAverageMonthly
// GET route for /transactions query (AddUser)
router.get("/useravemonthly", (request, response) => {
  console.log(request.body);
  //
  strQuery = `SELECT a.user_id, t.date, AVG(t.amount)
  FROM transactions AS t
  INNER JOIN accounts AS a
  ON a.acct_number = t.acct_number
  GROUP BY a.user_id, MONTH(t.date), YEAR(date)
  ORDER BY a.user_id`;

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

// GetTopSpender
// GET route for /transactions query (AddUser)
router.get("/top", (request, response) => {
  console.log(request.body);
  //
  strQuery = `SELECT a.user_id, u.name, a.acct_number, t.date, COUNT(a.user_id) as cmonth
  FROM transactions AS t
  INNER JOIN accounts AS a
  ON a.acct_number = t.acct_number
  INNER JOIN users AS u
  ON u.user_id = a.user_id
  GROUP BY a.user_id, MONTH(t.date), YEAR(t.date)
  ORDER BY cmonth DESC
  LIMIT 1`;

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

// GetTypeSpending
// GET route for /transactions query 
router.get("/type", (request, response) => {
  console.log(request.body);
  //
  strQuery = `SELECT t1.user_id, t1.ttype, MAX(t1.ctype)
  FROM (SELECT a.user_id, a.acct_number, t.date, t.type as ttype, COUNT(t.type) as ctype
        FROM transactions AS t
        INNER JOIN accounts AS a
        ON a.acct_number = t.acct_number
        GROUP BY a.user_id, t.type
        ORDER BY a.user_id) as t1
  GROUP BY t1.user_id`;

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
