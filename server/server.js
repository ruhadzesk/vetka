const http = require('http');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const _ = require('underscore');
const Pool = require('pg').Pool;

const SERVER_PORT = 3000;

const multer  = require('multer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const { exec } = require('child_process');

let upload = multer({storage: multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, '/opt/files');
        // let dest = path.normalize(path.join(config.filesRoot, req.body.dir));
        // if (dest.indexOf(config.filesRoot) === 0) {
        //     await exec(`mkdir -p ${dest}`);
        //     cb(null, dest);
        // } else {
        //     cb({status: 403}, null);
        // }

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})});


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


app.post(
    `/upload/`,
    upload.single('file'),
    async function(req, res, next) {
      // console.log(req, res)
      console.log(req.file)
      await exec(`exiftran -ai ${req.file.path}`);
      next();
    },
    async function(req, res) {
      // res.json({success : "Uploaded Successfully", status : 200});
      res.status(200).send( req.file );
    }
);

let httpServer = http.createServer(app);

httpServer.listen(SERVER_PORT, () => {
  console.log(`App listened on port :${SERVER_PORT}`);
});
