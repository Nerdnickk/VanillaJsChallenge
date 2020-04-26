const body = document.body;
const targetWidth = body.offsetWidth;

const PURPLE = "purple",
    SKY = "sky";

function resizeHandle(){
    const currentWidth = body.offsetWidth;

    if(currentWidth < targetWidth*1/2){
        body.classList.add(SKY);
        body.classList.remove(PURPLE);
    } else if(currentWidth < targetWidth*3/4){
        body.classList.remove(SKY);
        body.classList.add(PURPLE);
    } else {
        body.className = "";
    }
};

function init(){
    window.addEventListener("resize", resizeHandle);
};

init();