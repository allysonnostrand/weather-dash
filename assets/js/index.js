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

        //date
        let todayDate = document.createElement("h4")
        let date = moment().format('MMM Do, YYYY')
        todayDate.textContent = `${date}`
        oneCard.appendChild(todayDate)

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

        //getting lat and lon for uv fetch
        let lattitude = data.coord.lat
        let longitude = data.coord.lon
        console.log(lattitude, longitude)

        // fetching uv
        var uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${APIkey}`
        fetch(uvIndex)
        .then (function (response){
            return response.json()
        }).then (function(uvdata){
            console.log(uvdata)

            // uv index
            let uv = document.createElement("p")
            uv.textContent = `${uvdata.current.uvi}`
            if (uv.textContent < 3.0){
                uv.setAttribute("style", "background-color: green; width: fit-content")
            }
            else if (uv.textContent >= 3.0 && uv.textContent < 6.0){
                uv.setAttribute("style", "background-color: yellow; width: fit-content")
            }
            else if (uv.textContent >= 6.0 && uv.textContent < 7.0){
                uv.setAttribute("style", "background-color: orange; width: fit-content")
            } else {
                uv.setAttribute("style", "background-color: red; width: fit-content")
            }
            oneCard.appendChild(uv)  
        })
}

//five day forecast
document.querySelector("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    let city = document.querySelector("#search").value
    var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIkey}`;
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
        console.log(`this is the data ${data.city.name}`)
        while (fiveCard.hasChildNodes()){
        console.log(`this is the child ${fiveCard.firstChild}`)
        fiveCard.removeChild(fiveCard.firstChild);    
        }
        console.log("hello")

        //loop over each index
        let eachDay = data.list
        for (i=5; i < eachDay.length; i = i+8){
            let day = eachDay[i]
        
        //where each card gets appended to
        let everyDay = document.createElement("div")
        everyDay.setAttribute("style", "margin: 10px; border: solid 1px black; padding: 8px; background-color: rgb(243, 252, 240)")
        fiveCard = document.getElementById("fiveDay")
        fiveCard.appendChild(everyDay)
        
        // date
        let todayDate = document.createElement("p")
        let date = moment(`${day.dt_txt}`).format('MMM Do, YYYY')
        todayDate.textContent = `${date}`
        everyDay.appendChild(todayDate)

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
            console.log("history five day")
            return response.json()
        }).then (function (data){        
        fiveDayWeather(data)
        });
    }

