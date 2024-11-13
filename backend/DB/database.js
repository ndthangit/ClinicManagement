const mysql=require('mysql2/promise')
require('dotenv').config();
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    database:  process.env.DB_NAME,
    port:  process.env.DB_PORT,
    password:  process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0
  }); 
console.log("ket noi database thanh cong")
module.exports=connection; 
