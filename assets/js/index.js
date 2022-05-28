var APIkey = "37f8c9a38ed79ac3bb509ee15e76b898"
city= "Monroe"

var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

function getApi() {
   fetch(queryURL)
   .then (function (response){
       return response.json()
   }).then (function (data){
       console.log(data)
   }); 
}

getApi();