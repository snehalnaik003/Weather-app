var city = document.getElementById('city');
var temp = document.getElementById('temp');
var w =document.getElementById('wind');
var hum =document.getElementById('humidity');
var pre = document.getElementById('perc');
var n = document.getElementById('name');
var img = document.getElementById('icon');
var lat,lon;

async function getcurrent(){
    
    const location=navigator.geolocation
    location.getCurrentPosition( async(res)=>{
        lat =await res.coords.latitude
        lon= await res.coords.longitude
        console.log({"log":lat,"lon":lon});
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4e94fa1e8227674436d78d85519e0e9e`)
        const data = await response.json()
        console.log(data);
       if(data.cod==200){
        const {main,name,wind} = data
        temp.innerHTML =main.temp;
        w.innerHTML = wind.speed    
        hum.innerHTML= main.humidity;
        pre.innerHTML=main.humidity;
        n.innerHTML= name;
       }else{
           alert(data.message)
       }
        
    })
   

  
    
}

getcurrent()
async function search(){
  
    
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=4e94fa1e8227674436d78d85519e0e9e`)
    const data = await res.json()
    console.log(data);
    if(data.cod==200){
        changeImg( data)
        const {main,name,wind} = data
        temp.innerHTML =main.temp;
        w.innerHTML = wind.speed    
        hum.innerHTML= main.humidity;
        pre.innerHTML=main.humidity;
        n.innerHTML= name;
       }else{
        alert(data.message)
       }
    
   
}


function changeImg(x){
    var scr = `http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`

    img.src=scr
}