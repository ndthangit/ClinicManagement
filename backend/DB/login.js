const express = require('express');
const mysql = require('mysql2');
var http = require('http');

const express= require('express')

const router = express.Router()
app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    connection.query(
        'SELECT * FROM user WHERE username = ? AND password = ?',
        [username, password],
        (err, results, fields) => {
            console.log(results);
            if (err) {
                res.send({
                    token: 'fail'
                });
            } else {
                if((results.length > 0)){
                    res.send({
                        token: 'success',
                        uid: results[0].uid
                    });
                }
            }
        }
    );
});

