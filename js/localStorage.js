const select = document.getElementById("jsSelect"),
    showCountry = document.getElementById("jsShowing");

const COUNTRY_LRS = "currentCountry";

function saveName(value){
    localStorage.setItem(COUNTRY_LRS, value)
};
    
function selectHandle(){
    const currentValue = select.value;
    paintCountry(currentValue);
    saveName(currentValue);
};

function askforCountry(){
    select.addEventListener("input", selectHandle);
};

function paintCountry(text){
    const targetValue = select.querySelector(`option[value=${text}]`);
    if(targetValue){
        targetValue.selected = true;
    }
    showCountry.innerText = `You are from ${text}`;
};

function loadSelect(){
    const currentCountry = localStorage.getItem(COUNTRY_LRS);
    
    if(currentCountry === null){
        askforCountry();
    } else{
        paintCountry(currentCountry);
    }
};

function init(){
    loadSelect();
};

init();