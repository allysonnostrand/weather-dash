var APIkey = "37f8c9a38ed79ac3bb509ee15e76b898";
var list = document.querySelector("ul");
// let city= "Monroe"


// function getOne() {
//    fetch(onedayURL)
//    .then (function (response){
//        return response.json()
//    }).then (function (data){
//        console.log(data)
//    }); 
// }

// getOne();

// var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=5&appid=${APIkey}`;

// function getfive() {
//    fetch(fivedayURL)
//    .then (function (response){
//        return response.json()
//    }).then (function (data){
//        console.log(data)
//    }); 
// }

// getfive();

document.querySelector("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    let city = document.querySelector("#search").value
    var onedayURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
    fetch(onedayURL)
    .then (function (response){
        return response.json()
    }).then (function (data){
        console.log(data)
        let todayTemp = document.createElement("p")
        todayTemp.textContent = `Temp: ${data.main.temp} F`
        list.appendChild(todayTemp)

        let todayWind = document.createElement("p")
        todayWind.textContent = `Wind Speed: ${data.wind.speed}`
        list.appendChild(todayWind)

        let todayHumidity = document.createElement("p")
        todayHumidity.textContent = `Humidity: ${data.main.humidity}` 
        list.appendChild(todayHumidity)
    })
})

document.querySelector("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    let city = document.querySelector("#search").value
    var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=5&appid=${APIkey}`;
    fetch(fivedayURL)
    .then (function (response){
        return response.json()
    }).then (function (data){
        console.log(data)
    });
})