console.log('Loading server');

let express = require('express');                                               //node Express library loaded (called module)
let logger = require('morgan');                                                 //single quotes in js, html can have double - except for mysql shich needs double quotes to work
let compression = require('compression');
let favicon = require('serve-favicon');                                         //keeps icon in cache memory
let bodyParser = require('body-parser');

let app = express();                                                            //Like calling a constructor

//Load express middleware (app.use)
app.use(logger('dev'));
app.use(bodyParser.json());                                                     //for post and put REST commands
app.use(bodyParser.urlencoded({extended: false}));                              //allows access to key value pairs from a submitted html <form>
app.use(compression());                                                         //npm install compression
app.use(favicon(`${__dirname}/tree.png`));                                      //icon


//Start Code for mySQL
var mysql = require("mysql");

//connects database and creates a pool
let conn = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    //hostname: vivega-woodland-hills-woods-5573807 mysql-ctl cli
    user: "vivega",
    password: "",
    port: 3306,
    database: "whw",                                                                
    debug: true
});
module.exports = conn;

//req, res - request and response
//GET ALL
app.get('/api/v1/:table', function(req,res){
    let table = req.params.table;
    let tNames = ['trees', 'shrubs', 'grounds'];
    
    //Checking for anything that isn't a valid table name
    if (!tNames.includes(table)) { 
        res.status(404).send();
        return; 
    }
    
    conn.getConnection(function(err, connection) {
        if(err){
            connection.release();
            throw err;
        }
        
    conn.query("SELECT * FROM " + table + " ORDER BY id", function (err, result, fields) {  //Remember to correct style and use prepared statements
        res.status(200).send(JSON.stringify(result, null, 3));
        connection.release();
        if (err) throw err;
        //console.log(result);
        });
    });
});  //200 - 404

//GET ONE
app.get('/api/v1/:table/:id', function(req,res){                                
    let id = req.params.id;
    let table = req.params.table;
    let tNames = ['trees', 'shrubs', 'grounds'];
    
    //Checking for anything that isn't a valid table name
    if (!tNames.includes(table)) { 
        res.status(404).send();
        return; 
    }
    
   conn.getConnection(function(err, connection) {
        if(err){
            connection.release();
            throw err;
        }
        
    conn.query("SELECT * FROM " + table + " WHERE id = " + id, function (err, result, fields) {  //Remember to correct style
        res.status(200).send(JSON.stringify(result, null, 3));
        connection.release();
        if (err) throw err;
        //console.log(result);
        });
    });
    
});   //200 - 404

//PUT
app.put('/api/v1/:table/:id', function(req,res){
    let id = req.params.id;
    let table = req.params.table;
    let tNames = ['trees', 'shrubs', 'grounds'];
    
    //Checking for anything that isn't a valid table name
    if (!tNames.includes(table)) { 
        res.status(404).send();
        return; 
    }
    
     conn.getConnection(function(err, connection) {
        if(err){
            connection.release();
            throw err;
        }
    
    let sql = "UPDATE " + table + " SET sun = 'BLAZING' WHERE id = " + id + ";";    //Remember to correct style
    conn.query(sql, function (err, result, fields) {  
        console.log("1 record updated");
        res.status(201).send(JSON.stringify(result, null, 3));
        connection.release();
        if (err) throw err;
        //console.log(result);
        });
    });
});  //201 - 400     

//POST
app.post('/api/v1/:table', function(req,res){
    let table = req.params.table;
    let tNames = ['trees', 'shrubs', 'grounds'];
    
    //Checking for anything that isn't a valid table name
    if (!tNames.includes(table)) { 
        res.status(404).send();
        return; 
    }
    
    conn.getConnection(function(err, connection) {
        if(err){
            connection.release();
            throw err;
        }
    let sql = "Insert into " + table + " (name, photo, width, sun, soil, water, descr) Values ('Ajuga', 'img/Ajuga.jpg', '24 inches', 'Full Sun', 'clay', 'wet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor ultricies risus, eu faucibus orci porta sed. Fusce eget mauris libero. Duis et quam eget est interdum accumsan sit amet nec augue.');";
    conn.query(sql, function (err, result, fields) {   
        console.log("1 record inserted");
        res.status(201).send(JSON.stringify(result, null, 3));
        connection.release();
        if (err) throw err;
        //console.log(result);
        });
    });
});  //201 - 400     

//DELETE
app.delete('/api/v1/:table/:id', function(req,res){
    let table = req.params.table;
    let id = req.params.id;
    let tNames = ['trees', 'shrubs', 'grounds'];
    
    //Checking for anything that isn't a valid table name
    if (!tNames.includes(table)) { 
        res.status(404).send();
        return; 
    }
    
     conn.getConnection(function(err, connection) {
        if(err){
            connection.release();
            throw err;
        }
        
    conn.query("DELETE FROM " + table + " WHERE id = " + id, function (err, result, fields) {  //Remember to correct style
        console.log("1 record deleted");                                        //result.affectedRows
        res.status(204).send(JSON.stringify(result, null, 3));
        connection.release();
        if (err) throw err;
        //console.log(result);
        });
    });                                                                         //res.send(`${req.params.id} ${req.params.plantType}`);         //console.log('We got a delete');
});  //204 - 400

app.use(express.static(__dirname));                                             //express middleware that serves static files   //console.log(__dirname + ' / ' + __filename);    //directory and file name

let server = app.listen(process.env.PORT, function(){
    console.log(`Listening on Port:  ${process.env.PORT}`);                     //Actually listening on environment port
});

//End Code

//NOTES
//https://www.sketchmouse.com/s/zls5
//https://docs.c9.io/docs/setup-a-database

//HTTP status codes => 200s are successes, 300s are redirects, 400s are client side errors, 500s are server side errors

//curl -X GET "https://woodland-hills-woods-vivega.c9users.io/api/v1/grounds/4"
//curl -X GET "https://woodland-hills-woods-vivega.c9users.io/api/v1/grounds"
//curl -X DELETE "https://woodland-hills-woods-vivega.c9users.io/api/v1/grounds/1"
//curl -X POST "https://woodland-hills-woods-vivega.c9users.io/api/v1/grounds"
//curl -X PUT "https://woodland-hills-woods-vivega.c9users.io/api/v1/grounds/3"

//if it is a short one liner, put on the same line without braces

//NODE.js => js outside the browser
//Express => Library to help with NODE.js
//Update node => nvm install 8.6.0 => nvm alias default 8.6.0 => node -v (get version)
