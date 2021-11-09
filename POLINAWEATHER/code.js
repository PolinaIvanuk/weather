const searchButton = document.querySelector('.searchButton')
const container = document.querySelector('.container')
const cross = document.querySelector('.cross')
const input = document.querySelector('input')
const country = document.querySelector("body > div > div.weather > div.barca > div.spain")
const city = document.querySelector("body > div > div.weather > div.barca > div.lona")
const round = document.querySelector("body > div > div.weather > div.round")
const details = document.querySelector("body > div > div.weather > div.wind")
const forecast = document.querySelector("body > div > div.weather > div.cubiki > div.current")

const weatherStyle = `    
position: relative;
width: 414px;
height: 896px;`

dataRender()

searchButton.addEventListener('click', ()=>{
    container.childNodes[1].style.display = 'none'
    container.childNodes[3].hidden = !container.childNodes[3].hidden
})

cross.addEventListener('click', ()=>{
    container.childNodes[1].style = weatherStyle
    container.childNodes[3].hidden = !container.childNodes[3].hidden
})

input.addEventListener('keyup', (e)=>{
    if (e.key == 'Enter') {
        getWeather(input.value);
        container.childNodes[1].style = weatherStyle
        container.childNodes[3].hidden = !container.childNodes[3].hidden
    }
})

async function getWeather(place) {
    const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=bf9d673488df4611ad6162034212710&q=${place}&num_of_days=5&format=json`;
    let response = await fetch(url);
    let data = await response.json();
    renderPlace(data)
    renderWeather(data.data)
}

function dataRender(){
    let date = new Date()
    document.querySelector("body > div > div.weather > div.barca > div.day").innerHTML = 'Today, ' + date.toLocaleDateString('en-US', {month:'long'}) + ' ' + date.getDate() + 'th, ' + date.getFullYear()
}

function renderPlace(data) {
  let arr = data.data.request[0].query.split(','); 
  city.innerHTML = arr[0]
  country.innerHTML = arr[1]
}

function renderWeather(data) {
    round.children[0].src = selectPicture(data.weather[0].hourly[4])
    round.children[1].innerHTML = data.current_condition[0].temp_C + '°С'
    details.children[0].children[1].innerHTML = data.current_condition[0].windspeedMiles + ' mph'
    details.children[1].children[1].innerHTML = data.current_condition[0].visibilityMiles + ' miles'
    details.children[2].children[1].innerHTML = data.current_condition[0].humidity + '%'
    details.children[3].children[1].innerHTML = data.current_condition[0].pressure + ' mb'
    for (let i = 0; i < 5; i++) {
        forecast.children[i].children[0].innerHTML = getWeekday(data.weather[i].date)
        forecast.children[i].children[1].children[0].src = selectPicture(data.weather[i].hourly[4])
        forecast.children[i].children[1].children[1].innerHTML = data.weather[i].avgtempC + ' °С'
    }
}

function selectPicture(data) {
    if (data.chanceofsnow > 40){
        return('./pic/snow.png')
    }
    if (data.chanceofrain > 55) {
        return('./pic/rain.png')
    } 
    if (data.cloudcover > 40) {
        return('./pic/cloud.png')
    }
    return('./pic/sun.png')
}

function getWeekday(day) {
    let date = new Date(day)
    return(date.toLocaleDateString('en-US', {weekday:'long'}))
}