//#region html elements
const listenBtn  = document.querySelector(".listen-btn");
const themeSwitcherBtn  = document.querySelector(".theme-switcher");
const voiceTextContainer = document.querySelector(".results");
const continousText = document.querySelector(".continous-text");
const nav = document.querySelector(".navbar");

//#endregion

//#region utils
let text_content = "";
const API_KEY = "217fbb0f9f2a516da177fffe3cc1bef9";
const DURATION = 7000;
const syth = window.speechSynthesis;
let voices;
setTimeout(()=> {
    voices = window.speechSynthesis.getVoices();
}, 500 );
const recognition =  new webkitSpeechRecognition();
recognition.lang = "en-US";
//recognition.continous = true;
recognition.interimResults = true;
//#endregion

//#region util-helpers

function speak(text){
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[6];
    utterance.lang = "en-US";
    syth.speak(utterance);
}

function buttonColorChanger(){
    listenBtn.style.color= "red";
    setTimeout(()=>{
        listenBtn.style.color= "white";
    },DURATION)
}

function iconSwitcher(){
    if(themeSwitcherBtn.children[0].classList.contains("fa-moon")){
        themeSwitcherBtn.children[0].classList.remove("fa-moon");
        themeSwitcherBtn.children[0].classList.add("fa-sun");
        themeSwitcherBtn.classList.remove("text-white");
        themeSwitcherBtn.classList.add("text-dark");
        document.body.classList.remove("bag-light");
        document.body.classList.add("bag-dark");
        nav.classList.remove("navbar-dark", "bg-dark");
        nav.classList.add("navbar-light", "bg-light");
    }else {
        themeSwitcherBtn.children[0].classList.remove("fa-sun");
        themeSwitcherBtn.children[0].classList.add("fa-moon");
        themeSwitcherBtn.classList.remove("text-dark");
        themeSwitcherBtn.classList.add("text-white");
        document.body.classList.remove("bag-dark");
        document.body.classList.add("bag-light");
        nav.classList.remove("navbar-light", "bg-light");
        nav.classList.add("navbar-dark", "bg-dark");
    }
}

function createParagraph(content, bsColor, character){
    let text = document.createElement("div");
    text.classList.add("row" ,"bg-light", "my-2");
    text.innerHTML =
    `
        <div class="col-md-1 bg-${bsColor}"></div>
        <div class="col-md-11">
                ${character}: ${content}
        </div>
    `
    voiceTextContainer.appendChild(text);
}

function getWeather(cityName){
    if(cityName != "" || cityName != null || cityName != undefined || !cityName){
        const QUERY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        fetch(QUERY_URL)
        .then(
            res => {
                if(res.status == 200 || res.status == 404){
                    return res.json()
                }
            }
        ).then(
            data => {
                if(data.cod == "400" || data.cod == "404"){
                    createParagraph("I'm sorry, I couldn't get the weather you asked for, try another location 🙏", "danger", "Bot");
                    speak("I'm sorry, I couldn't get the weather you asked for, try another location");
                }
                createParagraph(`The teperature in ${cityName} is ${data.main.temp.toString()} Celsius and atmosphere is ${data.weather[0].description.toString()} and has an humidity of ${data.main.humidity.toString()}`, "primary", "Bot");
                speak(`The teperature in ${cityName} is ${data.main.temp.toString()} Celsius and atmosphere is ${data.weather[0].description.toString()} and has an humidity of ${data.main.humidity.toString()}`);
            }
        )
    }
}

setInterval(()=>{
    continousText.textContent= text_content;
});
//#endregion

//#region event listeners
themeSwitcherBtn.addEventListener("click", () => {
    iconSwitcher();
})


listenBtn.addEventListener("click", ()=>{
    buttonColorChanger();
    recognition.start();
    setTimeout(()=>{
        recognition.stop();
    },DURATION)
});

recognition.addEventListener("result", (e)=>{
    text_content = e.results[0][0].transcript.toString();
});

recognition.addEventListener("error", (e)=>{
    createParagraph("An error occured try again 🙏", "danger", "Bot");
    speak("An error occured try again");
    console.log(e);
});

recognition.addEventListener("end", (e)=>{
    if(text_content == "") {
        return;
    }

    if(text_content == "who are you") {
        createParagraph("I'm a trash bot", "success", "Bot");
        text_content = "";
        return speak("I'm a trash bot");
    }

    if(text_content == "who made you") {
        createParagraph("I was made by Fuad Olatunji", "success", "Bot");
        text_content = "";
        return speak("I was made by Fuad Olatunji");
    }

    if(text_content == "what is your name") {
        createParagraph("I wasn't given a name", "success", "Bot");
        text_content = "";
        return speak("I wasn't given a name");
    }

    createParagraph(text_content, "warning", "You");

    if(text_content.length < 23) {
        createParagraph("I don't know", "danger", "Bot");
        speak("I don't know");
    }

    cityName = text_content.substring(23).trim();
    getWeather(cityName);
    text_content = "";

});
//#endregion

//#region service worker 
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("../serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}
//#endregion