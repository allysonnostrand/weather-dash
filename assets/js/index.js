var APIkey = "37f8c9a38ed79ac3bb509ee15e76b898"
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
    });
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