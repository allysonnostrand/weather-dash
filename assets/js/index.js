var APIkey = "37f8c9a38ed79ac3bb509ee15e76b898";
var list = document.querySelector("ul");
var iconImg = document.querySelector("div")

//Current day forecast
document.querySelector("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    let city = document.querySelector("#search").value
    var onedayURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
    fetch(onedayURL)
    .then (function (response){
        return response.json()
    }).then (function (data){
        console.log(data)

        //temp
        let todayTemp = document.createElement("p")
        todayTemp.textContent = `Temp: ${data.main.temp} F`
        list.appendChild(todayTemp)

        //wind speed
        let todayWind = document.createElement("p")
        todayWind.textContent = `Wind Speed: ${data.wind.speed}`
        list.appendChild(todayWind)

        //humidity
        let todayHumidity = document.createElement("p")
        todayHumidity.textContent = `Humidity: ${data.main.humidity}%` 
        list.appendChild(todayHumidity) 

        //city
        let todayCity = document.createElement("p")
        todayCity.textContent = `City: ${data.name}` 
        list.appendChild(todayCity)

        //icon
        let todayIcon = document.createElement("img")
        let iconNum = data.weather[0].icon
        let iconURL = "https://openweathermap.org/img/w/" + iconNum + ".png"
        todayIcon.setAttribute("src", iconURL) 
        iconImg.appendChild(todayIcon)
    })
})

//five day forecast
document.querySelector("#searchForm").addEventListener("submit", e => {
    e.preventDefault();
    let city = document.querySelector("#search").value
    var fivedayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=5&appid=${APIkey}`;
    fetch(fivedayURL)
    .then (function (response){
        return response.json()
    }).then (function (data){
        console.log(data)

        //loop over each index
        let eachDay = data.list
        for (i=0; i < eachDay.length; i++){
            let day = eachDay[i]
        
        //five day temp
        let todayTemp = document.createElement("p")
        todayTemp.textContent = `Temp: ${day.main.temp} F`
        list.appendChild(todayTemp)

        //five day wind speed
        let todayWind = document.createElement("p")
        todayWind.textContent = `Wind Speed: ${day.wind.speed}`
        list.appendChild(todayWind)

        //five day humidity
        let todayHumidity = document.createElement("p")
        todayHumidity.textContent = `Humidity: ${day.main.humidity}%` 
        list.appendChild(todayHumidity) 

        // five day city
        let todayCity = document.createElement("p")
        todayCity.textContent = `City: ${data.city.name}` 
        list.appendChild(todayCity)

        //five day icon
        let todayIcon = document.createElement("img")
        let iconNum = day.weather[0].icon
        let iconURL = "https://openweathermap.org/img/w/" + iconNum + ".png"
        todayIcon.setAttribute("src", iconURL) 
        iconImg.appendChild(todayIcon)

    }});
})

