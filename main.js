var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

const req = require('request');
const express = require('express');
const { PassThrough } = require('node:stream');
const exp = express();

exp.use(express.json());

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    // var pathname = require('url').parse(request.url, true).pathname;
    if(pathname === "/") {
        if(queryData.id === undefined){
            // loginHTML = '/html/login.html';
            // loginHTML = '/html/create.html';
            loginHTML = '/html/home.html';
            response.writeHead(200);
            response.end(fs.readFileSync(__dirname + loginHTML));
        }
    }
    else if(pathname === "/login_access") {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            console.log("ID : " + post.ID + " PW : " + post.PW);
            
            const options = {
                uri : "http://{보낼 URL}",
                method : "POST",
                qs : {
                    id : post.ID,
                    pw : post.PW
                },
                json : true
            };
            
            req.post(options, function(err, response, body) {
                console.log(body);
                if (body == "true") {
                    // 로그인 성공
                }
                else {
                    // 로그인 실패
                }
            });
            response.writeHead(200);
            response.end('success');
        });
    }
    else if (pathname === '/create_user') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            console.log("ID : " + post.ID + " PW : " + post.PW + " email : " + post.email + " phone : " + post.phone + "group : " + post.group);
            
            const options = {
                uri : "http://{보낼 URL}",
                method : "POST",
                qs : {
                    id : post.ID,
                    pw : post.PW,
                    email : post.email,
                    phone : post.phone,
                    group : post.group
                },
                json : true
            };
            req.post(options, function(err, response, body) {
                console.log(body);
                if (body == "true") {
                    // 회원가입 성공
                }
                else {
                    // 회원가입 실패
                }
            });
        });
        response.writeHead(200);
        response.end('success');
    }
    else if (pathname === '/create') {
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + '/html/create.html'));
    }
    else if (pathname === '/login') {
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + '/html/login.html'));
    }
    else {
        response.writeHead(404);
        response.end("Not Found");
    }
});

app.listen(3000);