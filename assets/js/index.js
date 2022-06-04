var APIkey = "37f8c9a38ed79ac3bb509ee15e76b898";
var cityName = document.getElementById("city")
var iconImg = document.getElementById("card")
var oneCard = document.getElementById("oneDay")
var fiveCard = document.getElementById("fiveDay")
var historyList = document.getElementById("history")
var currentData = []
var extendedData = []

//Current day forecast
document.querySelector("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    let city = document.querySelector("#search").value
    var onedayURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
    fetch(onedayURL)
    .then (function (response){
        return response.json()
    }).then (function (data){
        localStorage.getItem("current", currentData)
        console.log(data)
        console.log(currentData)
        currentData.push(data)
        localStorage.setItem("current", JSON.stringify(currentData))
        currentWeather(data)
        
        //city to history
        let searchHistory = document.createElement("button")
        searchHistory.textContent = `${data.name}`
        searchHistory.setAttribute("id", `historyCities`)
        searchHistory.setAttribute("class", `historyCitiesClass`)
        historyList.appendChild(searchHistory)
        searchHistory.onclick = historyClick
    })
})

function currentWeather(data) {
        while (oneCard.hasChildNodes()){
            oneCard.removeChild(oneCard.firstChild);    
        }
        while (iconImg.hasChildNodes()){
            iconImg.removeChild(iconImg.firstChild);
        }

        //city
        cityName.textContent = `City: ${data.name}` 

        //temp
        let todayTemp = document.createElement("p")
        todayTemp.textContent = `Temp: ${data.main.temp} F`
        oneCard.appendChild(todayTemp)

        //wind speed
        let todayWind = document.createElement("p")
        todayWind.textContent = `Wind Speed: ${data.wind.speed}`
        oneCard.appendChild(todayWind)

        //humidity
        let todayHumidity = document.createElement("p")
        todayHumidity.textContent = `Humidity: ${data.main.humidity}%` 
        oneCard.appendChild(todayHumidity) 

        //icon
        let todayIcon = document.createElement("img")
        let iconNum = data.weather[0].icon
        let iconURL = "https://openweathermap.org/img/w/" + iconNum + ".png"
        todayIcon.setAttribute("src", iconURL) 
        iconImg.appendChild(todayIcon)
}

//five day forecast
document.querySelector("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    let city = document.querySelector("#search").value
    var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=5&appid=${APIkey}`;
    fetch(fivedayURL)
    .then (function (response){
        return response.json()
    }).then (function (data){
        localStorage.getItem("fiveday", extendedData)
        console.log(data)
        console.log(extendedData)
        extendedData.push(data)
        localStorage.setItem("fiveDay", JSON.stringify(data))
        fiveDayWeather(data)
    });
})

function fiveDayWeather(data) {
        while (fiveCard.hasChildNodes()){
            fiveCard.removeChild(fiveCard.firstChild);    
        }

        //loop over each index
        let eachDay = data.list
        for (i=0; i < eachDay.length; i++){
            let day = eachDay[i]
        
        //where each card gets appended to
        
        let everyDay = document.createElement("div")
        everyDay.setAttribute("style", "margin: 10px; border: solid 1px black; padding: 8px;")
        fiveCard.appendChild(everyDay)
        
        //five day temp
        let todayTemp = document.createElement("p")
        todayTemp.textContent = `Temp: ${day.main.temp} F`
        everyDay.appendChild(todayTemp)

        //five day wind speed
        let todayWind = document.createElement("p")
        todayWind.textContent = `Wind Speed: ${day.wind.speed}`
        everyDay.appendChild(todayWind)

        //five day humidity
        let todayHumidity = document.createElement("p")
        todayHumidity.textContent = `Humidity: ${day.main.humidity}%` 
        everyDay.appendChild(todayHumidity) 

        // five day city
        let todayCity = document.createElement("p")
        todayCity.textContent = `City: ${data.city.name}` 
        everyDay.appendChild(todayCity)

        //five day icon
        let todayIcon = document.createElement("img")
        let iconNum = day.weather[0].icon
        let iconURL = "https://openweathermap.org/img/w/" + iconNum + ".png"
        todayIcon.setAttribute("src", iconURL) 
        everyDay.appendChild(todayIcon)
    }
}

function historyClick () {
    console.log("here")
        let city = this.textContent
        var onedayURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
        fetch(onedayURL)
        .then (function (response){
        return response.json()
        }).then (function (data){
        currentWeather(data)
        })
        var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=5&appid=${APIkey}`;
        fetch(fivedayURL)
        .then (function (response){
            return response.json()
        }).then (function (data){
            fiveDayWeather(data)
        });
    }
