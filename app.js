const express = require('express');
const jsonfile = require('jsonfile')
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
const corsOptions = {
    origin: [
        '127.0.0.1:4200'
    ],
    methods: 'GET, POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials :  true
}
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Max-Age", "86400");
    next();
});
app.use(cors(corsOptions));


const account = "account.json"

var accountDB = {};

jsonfile.readFile(account)
        .then((obj) => {
            obj.users.forEach(element => {
                accountDB[element.userName] = {
                    id:element.id,
                    password: element.password 
                }; 
            });
        })
        .catch(error => console.error(error))




app.use(cors(corsOptions));

app.post('/test', function (req, res) {
    console.log("BBB001", req);
    // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    var obj = new Object();
    obj = {
        "results": [
            {
                "newFileName": "export_803_new.432f9e73-6eb4-4737-8656-ef9b335933f2.csv",
                "originalFileName": "export_803_new.csv"
            }
        ]
    };
    res.send(obj);
})

app.get('/userLevel', function (req, res) {
    var obj = { isLogin: true, isManager: false, isSiteAdmin: true, isMember: false, isViewer: false, userName: "admin", userId: 1, isGatekeeper: false }
    res.send(obj);
});

app.get('/portlets', function (req, res) {
    var file = './portlets.json'

    jsonfile.readFile(file)
        .then((obj) => {
            res.send(obj);
        })
        .catch(error => console.error(error))
});

app.get('/user/unit', function (req, res) {
    var obj = { unit: 1 };
    res.send(obj);
})

app.get('/chart_widgets', function (req, res) {
    var file = ''
    switch (req.query.id) {
        case '1':
            file = './chart_widgets/1.json'
            break;
        case '2':
            file = './chart_widgets/2.json'
            break;
        case '3':
            file = './chart_widgets/3.json'
            break;
        case '4':
            file = './chart_widgets/4.json'
            break;
        case '5':
            file = './chart_widgets/5.json'
            break;
        case '6':
            file = './chart_widgets/6.json'
            break;
        case '7':
            file = './chart_widgets/7.json'
            break;
        case '8':
            file = './chart_widgets/8.json'
            break;
        case '9':
            file = './chart_widgets/9.json'
            break;
        case '10':
            file = './chart_widgets/10.json'
            break;
        default:
            file = './chart_widgets/1.json'
            break;

    }
    jsonfile.readFile(file)
        .then((obj) => {
            res.send(obj);
        })
        .catch(error => console.error(error))
});

app.get('/widgets_data', function (req, res) {
    var file = ''
    switch (req.query.id) {
        case '1':
            file = './widgets_data/1.json'
            break;
        case '2':
            file = './widgets_data/2.json'
            break;
        case '3':
            file = './widgets_data/3.json'
            break;
        case '4':
            file = './widgets_data/4.json'
            break;
        case '5':
            file = './widgets_data/5.json'
            break;
        case '6':
            file = './widgets_data/6.json'
            break;
        case '7':
            file = './widgets_data/7.json'
            break;
        case '8':
            file = './widgets_data/8.json'
            break;
        case '9':
            file = './widgets_data/9.json'
            break;
        case '10':
            file = './widgets_data/10.json'
            break;
        default:
            file = './widgets_data/1.json'
            break;

    }
    jsonfile.readFile(file)
        .then((obj) => {
            res.send(obj);
        })
        .catch(error => console.error(error))
});

app.get('/language', function (req, res) {
    var file = ''
    switch (req.query.lang) {
        case 'de-base':
            file = './translate/de.json'
            break;
        case 'zh-base':
            file = './translate/zh.json'
            break;
        case 'en-base':
            file = './translate/en.json'
            break;
        case 'en-itemlist':
            file = './translate/en-itemlist.json'
            break;
        case 'zh-itemlist':
            file = './translate/zh-itemlist.json'
            break;
        default:
            file = './translate/en.json'
            break;

    }
    jsonfile.readFile(file)
        .then((obj) => {
            res.send(obj);
        })
        .catch(error => console.error(error))
});

app.get('/menu_status', function(req, res){
    console.log("BBB002");
    var file = '';
    file = './connectorlib/actionMenuStatus.json';
    jsonfile.readFile(file)
        .then((obj) => {
            res.send(obj);
        })
        .catch(error => console.error(error))
});

app.post('/users', function(req, res, next){
    
    console.log("aaa123", req.body);
    
    // res.send(req);
    console.log("DB", accountDB);
    if(accountDB.hasOwnProperty(req.body.userName)){
        console.log("success");
        res.status(200).json({"test":"success"});
    }else{
        console.log("fail");
        res.status(404);
        res.json({"test":"success"});
    }
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});