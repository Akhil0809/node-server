var express=require('express');
const fs=require('fs');//file system
const port=process.env.PORT || 3000;
var hbs=require('hbs');//handlebars
var app=express();
app.use(express.static(__dirname+'/'));//express.static work as a middleware here takes html path
app.use((req, res, next) =>{
    var date=new Date();
    var log=`${date}: ${req.method} ${req.url}`//to take values we use astric sign
    fs.appendFile('render.log',log + '\n',(err)=>{
        if(err){
            console.log("error");
        }
    });
    console.log(log);
    next();//without this site can not be open
});

//for template partials
hbs.registerPartials(__dirname+'/views/partial');
hbs.registerHelper('currentYear',() => {
    return new Date().getFullYear()
});

//middleware with this anything on the home or about page is override by this is used when we do any construction work on our sites
// app.use((req,res,next) =>{
//     res.render('maintainance.hbs');
// });

//home page
app.set('view engine','hbs');
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        currentYear:new Date().getFullYear(),
        homePage:'Welcome to my page'
    });
});

//about page
app.get('/about',(req,res)=>{
    res.render("about.hbs",{
        pageTitle:'About Page',
        //currentYear:new Date().getFullYear()
    });//render the content on the about.hbs file to the home if we give path /about
});

app.get('/help',(req,res)=>{
    res.render('help.hbs');
});

app.listen(port);
console.log(`app is listening on port:${port}`);