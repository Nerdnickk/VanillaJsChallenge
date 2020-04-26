const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");
    
function clockHandle(){
    const date = new Date();   
    const xmasDate = new Date("2020-12-24:00:00:00+0900");

    const gap = xmasDate.getTime()-date.getTime();
    const gapDay = Math.floor(gap/1000/60/60/24);
    const gapHours = Math.floor(gap/1000/60/60 % 24);
    const gapMinutes = Math.floor(gap/1000/60 % 60);
    const gapSeconds = Math.floor(gap/1000 % 60);
    
    
    
    clockTitle.innerText = `${gapDay}d ${gapHours < 10 ? `0${gapHours}`: gapHours}h ${gapMinutes < 10 ? `0${gapMinutes}` : gapMinutes}m ${gapSeconds}s`;
};

function init(){
    clockHandle();
    setInterval(clockHandle, 1000);
};

init();