var express = require("express"),
    app 	= express(),
    ejs     = require("ejs");
    
app.set('view engine', "ejs");
app.use( express.static( "public" ) );



app.get('/', function(req, res){
    res.render("index");
})




app.listen(3000, process.env.IP, function(){
    console.log("The Server has Started!")
});