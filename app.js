var express = require("express"),
app 	        = express(),
ejs             = require("ejs");
const request   = require('request'),
bodyParser 		= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.redirect("/home");
});

app.get("/home", function(req, res){
    res.render("home");
});

app.get('/news', function(req, res){
    var totalData;
    var statesData;
    var state = "Delhi";
    if(req.query.state){
        state = req.query.state;
    }
    // console.log(req.query.state);

    request('https://api.covidindiatracker.com/total.json', { json: true }, function (error, response, body) {
        if(error){
            console.log(error);
        }else{
            if(response && response.statusCode){

                totalData = body;

                // accessing new API
                request('https://api.covidindiatracker.com/state_data.json', { json: true }, function (error, response, body) {
                    if(error){
                        console.log(error);
                    }else{
                        if(response && response.statusCode){
                            statesData = body;
                            // console.log({totalData, statesData});
                            res.render("index", {totalData: totalData, statesData: statesData, state: state});
                        }
                    }
                });
                // Done here
            }
        }
    });
});


app.get("/covidCentres", function(req, res){
    res.render("covidCentres");
});

app.get("/faq", function(req, res){
    res.render("faq");
});
app.get("/symp", function(req, res){
    res.render("symp");
});
app.get("/thankYou", function(req, res){
    res.render("thankYou");
});

var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log("The server has started on port " + port);
});