const change = document.getElementById("change");
const colors = ["red", "yellow", "green", "grey"];

const superEventHandler = {
    mouseover: function(){
        change.innerHTML = "The mouse is here!!!"
        change.style.color = colors[0]
    },
    mouseleave: function() {
        change.innerHTML = "The mouse is gone!~ Hey! where r u??"
        change.style.color = colors[1]
    },
    resize: function(){
        change.innerHTML = "You just resized!~~!"
        change.style.color = colors[2]
    },
    rightClick: function(event){
        console.log("clicked", event.target.textContent);
        change.innerHTML = "That was a right click~!"
        change.style.color = colors[3]
    }
};

change.addEventListener("mouseover", superEventHandler.mouseover);
change.addEventListener("mouseleave", superEventHandler.mouseleave);
window.addEventListener("resize", superEventHandler.resize);
window.oncontextmenu = superEventHandler.rightClick;