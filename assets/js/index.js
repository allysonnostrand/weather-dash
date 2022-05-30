var APIkey = "37f8c9a38ed79ac3bb509ee15e76b898";
var list = document.querySelector("ul");
var iconImg = document.querySelector("div")

document.querySelector("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    let city = document.querySelector("#search").value
    var onedayURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
    fetch(onedayURL)
    .then (function (response){
        return response.json()
    }).then (function (data){
        console.log(data)
        console.log(data.weather[0].icon)
        let todayTemp = document.createElement("p")
        todayTemp.textContent = `Temp: ${data.main.temp} F`
        list.appendChild(todayTemp)

        let todayWind = document.createElement("p")
        todayWind.textContent = `Wind Speed: ${data.wind.speed}`
        list.appendChild(todayWind)

        let todayHumidity = document.createElement("p")
        todayHumidity.textContent = `Humidity: ${data.main.humidity}%` 
        list.appendChild(todayHumidity)

        let todayCity = document.createElement("p")
        todayCity.textContent = `City: ${data.name}` 
        list.appendChild(todayCity)

        let todayIcon = document.createElement("img")
        let iconNum = data.weather[0].icon
        let iconURL = "https://openweathermap.org/img/w/" + iconNum + ".png"
        todayIcon.setAttribute("src", iconURL) 
        iconImg.appendChild(todayIcon)
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

