var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
res.end("hitting successfully");
});

/* app.get('/data', function (req, res) {
   console.log(req);
   connection.query('select * from storechild', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/datacal', function (req, res) {
   console.log(req);
   connection.query('select * from storepwt where id=?', [req.body.id],function (error, results, fields) {
   if (error) throw error;
   res.json(results);
 });
});

app.post('/singledata',function(req,res){
	var deptnum = req.body.dept;
	var groups = req.body.group;
	var pages = req.body.page;
	var dcnum = req.body.dcnum;
	var strnum = req.body.strnum;
	if(dcnum!=""&&strnum!="")
	{
		console.log("executing with both strnum and storenum");
	    connection.query("select pw.id,pw.deptnum,pw.groups,pw.pages,pw.lwsales,pw.invtplnd,pw.invtplndend,pw.strnum,pw.ssratturn,pw.salesplnd,pw.salesplndwktwo,pw.salesplndbal,pw.twinvt,pw.otsweeks,pw.lwdistreg,pw.origpct,pw.wtddist,pw.origots,pw.otsadj,prnt.catgnumone,prnt.catgnumtwo,prnt.catgnumthree,prnt.catgnumfour,prnt.catgnumfive,prnt.plandesc from storepwt pw, storeparent prnt where pw.deptnum=prnt.deptnum and pw.groups=prnt.groups and pw.pages=prnt.pages and prnt.deptnum=? and prnt.groups=? and prnt.pages=? and pw.dcnum=? and pw.strnum=?",[req.body.dept,req.body.group,req.body.page,req.body.dcnum,req.body.strnum],function(err, rows, fields){
        if(rows.length != 0){
            var data = rows;
			console.log(data+"data");
            res.json(data);
        }
    });
	}
	else if (dcnum!=""&&strnum=="") {
		console.log("executing without strnum and with dcnum");
			    connection.query("select pw.id,pw.deptnum,pw.groups, pw.pages, pw.lwsales, pw.invtplnd, pw.invtplndend,pw.strnum, pw.ssratturn, pw.salesplnd, pw.salesplndwktwo, pw.salesplndbal, pw.twinvt, pw.otsweeks, pw.lwdistreg, pw.origpct, pw.wtddist, pw.origots, pw.otsadj, prnt.catgnumone,prnt.catgnumtwo,prnt.catgnumthree,prnt.catgnumfour,prnt.catgnumfive,prnt.plandesc from storepwt pw , storeparent prnt where pw.deptnum=prnt.deptnum and pw.groups=prnt.groups and pw.pages=prnt.pages and prnt.deptnum=? and prnt.groups=? and prnt.pages=? and pw.dcnum=?",[req.body.dept,req.body.group,req.body.page,req.body.dcnum],function(err, rows, fields){
        if(rows.length != 0){
            var data = rows;
			console.log(data+"data without divnum");
            res.json(data);
        }
    });
	}
	
	else if (dcnum==""&&strnum!=""){
		console.log("executing without dcnum and with strnum");
			    connection.query("select pw.id,pw.deptnum,pw.groups, pw.pages, pw.lwsales, pw.invtplnd, pw.invtplndend,pw.strnum, pw.ssratturn, pw.salesplnd, pw.salesplndwktwo, pw.salesplndbal, pw.twinvt, pw.otsweeks, pw.lwdistreg, pw.origpct, pw.wtddist, pw.origots, pw.otsadj, prnt.catgnumone,prnt.catgnumtwo,prnt.catgnumthree,prnt.catgnumfour,prnt.catgnumfive,prnt.plandesc from storepwt pw , storeparent prnt where pw.deptnum=prnt.deptnum and pw.groups=prnt.groups and pw.pages=prnt.pages and prnt.deptnum=? and prnt.groups=? and prnt.pages=? and pw.strnum=?",[req.body.dept,req.body.group,req.body.page,req.body.strnum],function(err, rows, fields){
        if(rows.length != 0){
            var data = rows;
			console.log(data+"data without divnum");
            res.json(data);
        }
    });
	}
	
		else{
		console.log("executing else");
			    connection.query("select pw.id,pw.deptnum,pw.groups, pw.pages, pw.lwsales, pw.invtplnd, pw.invtplndend,pw.strnum, pw.ssratturn, pw.salesplnd, pw.salesplndwktwo, pw.salesplndbal, pw.twinvt, pw.otsweeks, pw.lwdistreg, pw.origpct, pw.wtddist, pw.origots, pw.otsadj, prnt.catgnumone,prnt.catgnumtwo,prnt.catgnumthree,prnt.catgnumfour,prnt.catgnumfive,prnt.plandesc from storepwt pw , storeparent prnt where pw.deptnum=prnt.deptnum and pw.groups=prnt.groups and pw.pages=prnt.pages and prnt.deptnum=? and prnt.groups=? and prnt.pages=?",[req.body.dept,req.body.group,req.body.page],function(err, rows, fields){
        if(rows.length != 0){
            var data = rows;
			console.log(data+"data without divnum");
            res.json(data);
        }
    });
	}

});

app.post('/updateOTS',function(req,res){

    connection.query("update storepwt pw, storeparent prnt SET pw.otsadj=?, pw.origots=?, pw.origpct=? where pw.deptnum=prnt.deptnum and pw.groups=prnt.groups and pw.pages=prnt.pages and pw.id=?",[req.body.otsadj,req.body.origots,req.body.origpct,req.body.id],function(err, rows, fields){
        if(rows.length != 0){
            var data = rows;
            res.json(data);
        }
    });
}); */

var server = app.listen(3000, "127.0.0.1", function () {
  console.log("Example app listening at 3000")
 
});

module.exports = app;
