let search = document.getElementById("search");
let btn = document.getElementById("btn");
 API_key = "66bf4a9676c822b1f82f9ea9f92fa5a6";
let box = document.querySelector('.box');

function fetchData() {

    if(search.value.trim() === ""){
        box.innerHTML = `<p class="error">Please input a city name</p>`
    }
    else{
        box.innerHTML = `<p>Loading...</p>`

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_key}`
    fetch(url)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
           showData(data)
        })
        .catch((err)=>{
            
            box.innerHTML = `<img src="./Assets/not-found.png">`
        })


    }
search.value = '';
    
  console.log(search.value);
}

let main_bg = document.querySelector('.main_bg')
function showData(data){
    const {country} = data.sys;
    const {temp} = data.main;
    let updatedTemp = Math.floor(temp);
    let {main,icon,id} = data.weather[0]
    let urlImage;

    if(id>=200 && id<=232){
        urlImage = './Assets/thunderstorm.png';
        main_bg.className = 'thunderstorm'

    }
    else if(id>=300 && id<=321){
        urlImage = './Assets/drizzle.png';
            main_bg.className = 'drizzle'

    }
    else if(id>=500 && id<=532){
        urlImage = './Assets/rain.png';

            main_bg.className = 'rain'
    }
    else if(id>=600 && id<=622){
        urlImage = './Assets/snow.png';
            main_bg.className = 'snow'

    }
    else if(id>=701 && id<=781){
        urlImage = './Assets/atmosphere.png';
            main_bg.className = 'atmosphere'

    }
    else if(id>=801 && id<=804){
        urlImage = './Assets/clouds.png';
            main_bg.className = 'clouds'

    }
    else{
        urlImage = './Assets/clear.png';
            main_bg.className = 'clear'
    }




    box.innerHTML = `
    <p>${data.name},${country}</p>
            <h1>${updatedTemp}<sup>0</sup>C</h1>
            <p>${main}</p>
            <img src="${urlImage}" />
    `
    console.log(data);
}
search.addEventListener('keyup',(e)=>{
    if(e.key =="Enter"){
        fetchData();
    }
})
btn.addEventListener("click", fetchData);
let currentLoc = document.querySelector('.location')
function getCurrentLocation (){

    navigator.geolocation.getCurrentPosition((position)=>{
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
       
let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_key}`
fetch(currentUrl)
.then((res)=>{
    return res.json()
})
    .then((data)=>{
        showData(data)
    })
    .catch((err)=>{
            
        box.innerHTML = `<img src="./Assets/not-found.png">`
    })

    },(error)=>{
        const {message} = error;
        box.innerHTML = `<p class="error">${message}</p>`

    })
}
currentLoc.addEventListener('click', getCurrentLocation)