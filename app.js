var express = require("express"),
app 	        = express(),
ejs             = require("ejs");
const request   = require('request'),
bodyParser 		= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");
app.use( express.static( "public" ) );


app.get('/', function(req, res){
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




app.listen(3000, process.env.IP, function(){
    console.log("The Server has Started!")
});