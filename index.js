const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require('ejs');
const app = express();




app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function(req,res){
  res.render('index',{weather: null, error: null});
})


app.post('/',function(req,res){
  let city = req.body.city;
  let apiKey='73af38cfcb9319b40984ae1ae3b20a21';
  let url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


  request(url, function (err, response, body) {
    if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
    }else{
              let weather = JSON.parse(body)
              if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
              }else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index',{weather:weatherText,error :null});
              }
            }
          })
        })
app.listen(3000,function(err){
  if (err){
    console.log(err);
  }
  else {
    console.log("app listening on port 3000");
  }

})
