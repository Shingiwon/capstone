var http = require('http');
var fs = require('fs');
var url = require('url'); // url 모듈 사용 
var qs = require('querystring');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(_url);
    console.log(__dirname);
    if(pathname ==='/'){
      response.writeHead(200,{'Content-Type':'text/html'}); // header 설정
      fs.readFile(__dirname + '/html/login.html', (err, data) => { // 파일 읽는 메소드
        if (err) {
          return console.error(err); // 에러 발생시 에러 기록하고 종료
        }
        response.end(data, 'utf-8'); // 브라우저로 전송
      });
    }else if(pathname === '/login_access') {
      var body = '';
      request.on('data', function(data){
        body = body + data;
      })
      request.on('end', function(){
        var post = qs.parse(body);
        console.log(post)
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end('success');
      })
    }
     else if(pathname === '/create.html'){
      response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        fs.readFile('./html/create.html', function(error, data){
            console.log('../');
              
            response.end(data);
        });     
    }else { // 매칭되는 주소가 없으면
      response.statusCode = 404; // 404 상태 코드
      response.end('주소가 없습니다');
    }
});
app.listen(3030);