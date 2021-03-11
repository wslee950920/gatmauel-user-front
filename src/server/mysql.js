import mysql from "mysql";

const connection = mysql.createConnection({
  host: process.env.REACT_APP_MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USERNAME,
  password: process.env.REACT_APP_MYSQL_PASSWORD,
  database: "gatmauel_deploy",
});

export default connection;
