var express = require("express");
var app = express();

const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "8889A464030@r",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.post("/api/authenticate", (req, res, next) => {

 var creds = req.body; // { username: <val>, password: <val> }

 //console.log(creds);

 //let rawdata = fs.readFileSync('../database/credentials.json');
 //let data = JSON.parse(rawdata);

 //var result = data.find(function(obj){
  // return ( obj.username == creds.username && obj.password == creds.password );
  var sql_cred = `SELECT * FROM hiring_tracker.credentials WHERE credentials.Username = '${creds.username}' AND credentials.Password='${creds.password}'`;
    con.query(sql_cred, function( err, result){

      if (err) {
        throw err;
        res.json({"status": "failure"});
      }
      if ( result.length !== 0 ) {
         res.json({"status": "success"});
       } else {
         res.json({"status": "failure"});
       }
    });
 });

// if ( result !== undefined ) {
//   res.json({"status": "success"});
// } else {
//   res.json({"status": "failure"});
 //}

//});


app.post("/api/addRequest", (req, res, next) => {

 var newReq = req.body;

// console.log(newReq);

// let rawdata = fs.readFileSync('../database/data.json');
// let data = JSON.parse(rawdata);

// data.push( newReq );

// let newdata = JSON.stringify(data);
// fs.writeFileSync('../database/data.json', newdata);

// res.json({"status": "success"});
var sql_insert = `INSERT INTO hiring_tracker.hiring_requests (projectname,projectmanager) VALUES ('${newReq.projectname}','${newReq.projectmanager}');`;

  con.query(sql_insert, function( err, result){
    if (err) {
      throw err;
      res.json({"status": "failure"});
    }
    else {
      console.log("Result: "+ result);
      res.json({"status": "success"});
    }
  });
});


 // var sql = `INSERT INTO hiring_tracker.hiring_requests (poc, manager)
 //            VALUES ('${newReq.poc}', '${newReq.manager}');`;
 //
 // con.query(sql, function (err, result) {
 //   if (err) {
 //     throw err;
 //     res.json({"status": "failure"});
 //     // con.end()
 //   } else {
 //     console.log("Result: " + result);
 //     res.json({"status": "success"});
 //     // con.end()
 //   }
 // });

//});



app.get("/api/getRequestDetails", (req, res, next) => {

  // let rawdata = fs.readFileSync('../database/data.json');
  // let data = JSON.parse(rawdata);
    // res.json(data);
  var sql_get = `SELECT * FROM hiring_tracker.hiring_requests`;

  con.query(sql_get, function( err, result){
    if (err) {
      throw err;
      res.json({"status": "failure"});
    }
    else {

      res.json({result});
      console.log(result);
    }
  });

});

/*update the data in table*/
app.put("/api/updateRequest", (req, res, next) => {

  // var updateObj = req.body;
  //
  // console.log(updateObj);
  //
  // let rawdata = fs.readFileSync('../database/data.json');
  // let data = JSON.parse(rawdata);
  //
  // var oldObjIdx;
  // var oldObj = data.find(function(obj, ind){
  //   if( updateObj.requestId == obj.requestId ) {
  //     oldObjIdx = ind;
  //     return true;
  //   }
  // });
  // if( oldObj !== undefined ) {
  //   data[oldObjIdx] = updateObj;
  //   let newdata = JSON.stringify(data);
  //   fs.writeFileSync('../database/data.json', newdata);
  //   res.json({"status": "success"});
  // } else {
  //   res.json({"status": "failure"});
  // }
  var newReq = req.body;
  var sql_update = `UPDATE hiring_tracker.hiring_requests
                    SET hiring_requests.projectname = '${newReq.projectname}', hiring_requests.projectmanager = '${newReq.projectmanager}'
                    WHERE hiring_requests.requestId = '${newReq.requestId}'`;

  con.query(sql_update, function( err, result){
    if (err) {
      throw err;
      res.json({"status": "failure"});
    }
    else {

      res.json({"status": "success"});
    }
  });
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/url", (req, res, next) => {
 res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
