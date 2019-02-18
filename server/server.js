const http = require('http');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const _ = require('underscore');
const Pool = require('pg').Pool;

const SERVER_PORT = 3000;


let app = express();
app.use(bodyParser.json());

let pool = new Pool(
  _.extend({
      'max': 10,
      'database': 'vetka_db'
  }, _.omit({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    dbname: 'vetka_db'
  }, 'dbname'))
);


app.post(`/ajax/`, async(req, res) => {
  let request = req.body;
  let conn;

  try {
      conn = await pool.connect();
      console.log('SELECT * FROM ' + request.method + '(' + JSON.stringify(request.params) + ')');
      const queryResult = await conn.query('SELECT * FROM ' + request.method + '($1)', [
        JSON.stringify(request.params)
       ]);
      result = queryResult.rows[0].o_result;
      error = queryResult.rows[0].o_error;
      if (error) {
        res.json({error: error});
      }
  } catch (e) {
    console.error(e);
    res.json({error:e});
  } finally {
    if (conn) {
      conn.release();
    }
  }
  res.json({result: result});
});

let httpServer = http.createServer(app);

httpServer.listen(SERVER_PORT, () => {
  console.log(`App listened on port :${SERVER_PORT}`);
});
