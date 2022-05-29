var APIkey = "37f8c9a38ed79ac3bb509ee15e76b898"
city= "Monroe"

var onedayURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;

function getOne() {
   fetch(onedayURL)
   .then (function (response){
       return response.json()
   }).then (function (data){
       console.log(data)
   }); 
}

getOne();

var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=5&appid=${APIkey}`;

function getfive() {
   fetch(fivedayURL)
   .then (function (response){
       return response.json()
   }).then (function (data){
       console.log(data)
   }); 
}

getfive();