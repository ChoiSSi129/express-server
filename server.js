
var express = require('express'),
    fs = require('fs'),
    config = getConfig('config.json'),
    app = express(),
    bodyParser = require("body-parser");

/***************************************************************************
 * Util Func.
 **************************************************************************/
// JSON 파일 Read
function readJsonFileSync(filepath, encoding) {
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }

    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

// 환경설정 파일 가져오기
function getConfig(file) {
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

/***************************************************************************
 * 서버 설정
 **************************************************************************/
var usePortList = [],
    serverList = {};

function createServer(name, path, port, defaultEncoding, exceptionEncoding) {
    var encoding = defaultEncoding ? defaultEncoding : "UTF-8";

    return express()
        .use(function (req, res, next) {
            // console.log(res);
            // res.status(404).send('Bad Request');

            var mimeType = req.get('content-type'),
                regExec = /\.(.+)/.exec(req.path);

            if (!mimeType) {
                if (regExec && regExec.length > 1 && regExec[1]) {
                    switch (regExec[1]) {
                        case "ai": mimeType = "application/postscript"; break;
                        case "aif": mimeType = "audio/x-aiff"; break;
                        case "aifc": mimeType = "audio/x-aiff"; break;
                        case "aiff": mimeType = "audio/x-aiff"; break;
                        case "asf": mimeType = "video/x-ms-asf"; break;
                        case "au": mimeType = "audio/basic"; break;
                        case "avi": mimeType = "video/x-msvideo"; break;
                        case "bin": mimeType = "application/octet-stream"; break;
                        case "ccad": mimeType = "application/clariscad"; break;
                        case "cdf": mimeType = "application/x-cdf"; break;
                        case "csh": mimeType = "application/x-csh"; break;
                        case "css": mimeType = "text/css"; break;
                        case "doc": mimeType = "application/msword"; break;
                        case "dvi": mimeType = "application/x-dvi"; break;
                        case "dwg": mimeType = "application/acad"; break;
                        case "dxf": mimeType = "application/dxf"; break;
                        case "eps": mimeType = "application/postscript"; break;
                        case "etx": mimeType = "text/x-setext"; break;
                        case "gif": mimeType = "image/gif"; break;
                        case "gzip": mimeType = "multipart/x-gzip"; break;
                        case "htm": mimeType = "text/html"; break;
                        case "html": mimeType = "text/html"; break;
                        case "ief": mimeType = "image/ief"; break;
                        case "jpe": mimeType = "image/jpeg"; break;
                        case "jpeg": mimeType = "image/jpeg"; break;
                        case "jpg": mimeType = "image/jpeg"; break;
                        case "js": mimeType = "application/x-javascript"; break;
                        case "json": mimeType = "application/json"; break;
                        case "latex": mimeType = "application/x-latex"; break;
                        case "m3u8": mimeType = "application/vnd.apple.mpegurl"; break;
                        case "man": mimeType = "application/x-troff-man"; break;
                        case "mdb": mimeType = "application/msaccess"; break;
                        case "me": mimeType = "application/x-troff-me"; break;
                        case "mif": mimeType = "application/x-mif"; break;
                        case "mov": mimeType = "video/quicktime"; break;
                        case "movie": mimeType = "video/x-sgi-movie"; break;
                        case "mp4": mimeType = "video/mp4"; break;
                        case "mpe": mimeType = "video/mpeg"; break;
                        case "mpeg": mimeType = "video/mpeg"; break;
                        case "mpg": mimeType = "video/mpeg"; break;
                        case "ms": mimeType = "application/x-troff-ms"; break;
                        case "pbm": mimeType = "image/x-portable-bitmap"; break;
                        case "pdf": mimeType = "application/pdf"; break;
                        case "pgm": mimeType = "image/x-portable-graymap"; break;
                        case "pnm": mimeType = "image/x-portable-anymap"; break;
                        case "ppm": mimeType = "image/x-portable-pixmap"; break;
                        case "ppt": mimeType = "application/vnd.ms-powerpoint"; break;
                        case "ppt": mimeType = "application/x-mspowerpoint"; break;
                        case "ps": mimeType = "application/postscript"; break;
                        case "qt": mimeType = "video/quicktime"; break;
                        case "ras": mimeType = "image/x-cmu-raster"; break;
                        case "rgb": mimeType = "image/x-rgb"; break;
                        case "roff": mimeType = "application/x-troff"; break;
                        case "rtf": mimeType = "application/rtf"; break;
                        case "rtx": mimeType = "text/richtext"; break;
                        case "snd": mimeType = "audio/basic"; break;
                        case "src": mimeType = "application/x-wais-source"; break;
                        case "t": mimeType = "application/x-troff"; break;
                        case "tcl": mimeType = "application/x-tcl"; break;
                        case "tex": mimeType = "application/x-tex"; break;
                        case "texi": mimeType = "application/x-texinfo"; break;
                        case "texinfo": mimeType = "application/x-texinfo"; break;
                        case "tif": mimeType = "image/tiff"; break;
                        case "tiff": mimeType = "image/tiff"; break;
                        case "tr": mimeType = "application/x-troff"; break;
                        case "tsv": mimeType = "text/tab-separated- values"; break;
                        case "txt": mimeType = "text/plain"; break;
                        case "wav": mimeType = "audio/x-wav"; break;
                        case "wma": mimeType = "video/x-ms-asf"; break;
                        case "wmv": mimeType = "video/x-ms-asf"; break;
                        case "xbm": mimeType = "image/x-xbitmap"; break;
                        case "xls": mimeType = "application/vnd.ms-excel"; break;
                        case "xls": mimeType = "application/x-msexcel"; break;
                        case "xml": mimeType = "text/xml"; break;
                        case "xpm": mimeType = "image/x-xpixmap"; break;
                        case "xsl": mimeType = "text/xsl"; break;
                        case "xwd": mimeType = "image/x-xwindowdump"; break;
                        case "zip": mimeType = "application/zip"; break;
						default : mimeType = "text/plain"; break;
                    }
                } else {
                    mimeType = "text/plain";
                }
            }

            res.set('Content-Type', mimeType + ";charset=" + encoding);
            next();
        })
        .use(express.static(path))
        .get('*', function (req, res) {
            var result = '';

            if (req.accepts('html')) {
                res.set('Content-Type',"text/html;charset=" + encoding);

                result += '<!doctype html>';
                result += '<html lang="ko">';
                result += '<head>';
                result += '<title>404 Not Found</title>';
                result += '</head>';
                result += '<body>';
                result += '<h1>404 Not Found.</h1>';
                result += '<p>페이지를 찾을 수 없습니다.<br />localhost:port/ 뒤에 경로를 정확히 입력하여 주세요.</p>';
                result += '</body>';
                result += '</html>';
            } else if (req.accepts('json')) {
                res.set('Content-Type',"application/json;charset=" + encoding);

                result += "{ error: 'Page Not Found'}";
            }

            res.status(404).send(result);
        })
        .listen(port, function () {
            console.log(name + " Sever Started. (http://localhost:" + port + ")");

            // Create Path
            if(config){
                for(var key in config){
                    if(port === config[key].port && port !== 3004 && port !== 3005) createPath(config[key]);
                }
            }
        });
}

if (config) {
    for (var key in config) {
        if (config[key].enable && config[key].port && config[key].path && usePortList.indexOf(config[key].port) == -1) {
            usePortList.push(config[key].port);
            serverList[key] = createServer(
                key, 
                config[key].path, 
                config[key].port, 
                config[key].defaultEncoding
            );
        } else {
            if (!config[key].enable) {
                console.error(key + " Server 사용 안함.");
            } else if (usePortList.indexOf(config[key].port) > -1) {
                console.error(key + " Server의 Port가 이미 사용중입니다.");
            } else if (!config[key].port) {
                console.error(key + " Server Port 설정이 잘못되었습니다.");
            } else if (!config[key].path) {
                console.error(key + " Server Path 설정이 잘못되었습니다.");
            } else {
                console.error(key + " Server 설정이 잘못되었습니다.");
            }
        }
    }
} else {
    console.error("환경설정 파일이 잘못되었거나 존재하지 않습니다.");
}

/***************************************************************************
 * Path파일 생성
 **************************************************************************/
var pathObj = {
    MO_DC: {},
    MO_EL: {},
    MO_B2B: {}
};
function createPath(path){
    var walk = require('walk'),
    files = [];
    
    function getPathUrl(obj, name){
        var arr = [];
        for(var key in obj){
            if(obj[key].name === name) arr.push(obj[key].url);
        }
        return arr;
    }

    var walker  = walk.walk(path.path, { 
        followLinks: false,
        filters: ['_grint-init', '.settings', '@JSP_File', 'app', 'common3', 'common4', 'publish', 'HTML', 'HTML_', 'ngdoc', 'node_modules', 'npm', 'resources', 'json']
    });

    walker.on('file', function(root, stat, next){
        if(stat.name.match('_dev.html')){
            var setRoot = root.replace(/\\/g, '/');
            setRoot = setRoot.replace(path.path, '');
            var stringSplit = setRoot.split('/')[1];
            files.push( {name: stringSplit, url: setRoot + '/' + stat.name} );
        }
        next();
    });

    function getData(){
        return new Promise(function(resolve, reject){
            walker.on('end', function(){
                for(var key in files){
                    if(pathObj[path.name][files[key].name] === undefined) pathObj[path.name][files[key].name] = getPathUrl(files, files[key].name);
                }
                // JSON File Set
                // var data = JSON.stringify(obj);
                // fs.writeFile(path+'/path.json', data, function(err){
                //     if(err) throw err;
                //     console.log("saved");
                // });
                resolve(pathObj);
            });
        });
    }
    getData().then(function(resolveData){
        app.get("/path", function(req, res){
            var data = JSON.stringify(resolveData[req.query.root]);
            res.send(data);
        });
    });
}

/***************************************************************************
 * Comment
 **************************************************************************/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var parseData;
app.post('/data', function(req, res) {
    var reqBody = req.body;
    res.send("Post Success");
    
    fs.readFile('../01.MO_DC/comment.json', 'utf-8', function(err, data){
        parseData = JSON.parse(data);
        if(parseData.data[reqBody.url]){
            parseData.data[reqBody.url].push(reqBody.text);
        } else{
            parseData.data[reqBody.url] = [];
            parseData.data[reqBody.url].push(reqBody.text);
        }

        fs.writeFile('../01.MO_DC/comment.json', JSON.stringify(parseData), function(err){
            if(err) throw err;
            console.log("Data Save");
        });
    });
});

app.get('/comment', function(req, res){
    fs.readFile('../01.MO_DC/comment.json', 'utf-8', function(err, data){
        parseData = data;
        res.send(parseData);
    });
});

app.listen(8080, function(){
    console.log("Data Server Started.");
});
