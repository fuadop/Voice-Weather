function openNav() {
    document.getElementById("mySidenav").style.display = "block";
    setTimeout(()=> {
        document.getElementById("mySidenav").style.width = "250px";
    },200)
}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    setTimeout(()=> {
        document.getElementById("mySidenav").style.display = "none";
    },200)
}


if (!navigator.onLine){
    document.addEventListener("click", ()=> {
        document.querySelector(".offline-banner").style.display="block";
        document.querySelector(".online-banner").style.display="none";
    });
} else {
    document.querySelector(".offline-banner").style.display="none";
    document.querySelector(".online-banner").style.display="block";
    setTimeout(()=>{
        document.querySelector(".online-banner").style.display="none";
    },2000)
}

document.querySelectorAll(".voice-toggle").forEach( el => {
    el.addEventListener("click", e => {
        speak(el.textContent.substring(3));
    })
})
