const mysql = require("mysql");

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

module.exports = connection;