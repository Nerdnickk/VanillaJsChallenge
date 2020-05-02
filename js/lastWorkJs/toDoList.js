const toDoWrapper = document.querySelector(".todo__wrapper"),
    toDoForm = toDoWrapper.querySelector("form"),
    toDoList = toDoWrapper.querySelector(".toDoList");

let toDo_ary = [];

const TODO_LS = "currentToDo";

    function saveToDo(){
        localStorage.setItem(TODO_LS, JSON.stringify(toDo_ary));
    }

    function deleteHandle(e){
        e.preventDefault();
        const btnTarget = e.target;
        const parentLi = btnTarget.parentNode;
        
        toDoList.removeChild(parentLi);

        const toDoDelete = toDo_ary.filter(toDo => {
            if(parentLi.id != JSON.stringify(toDo.id)){
                return toDo;
            }
        })

        toDo_ary = toDoDelete;
        
        saveToDo();
    }

    function paintTodo(text){
        const li = document.createElement("li");
        const span = document.createElement("span");
        const btn = document.createElement("button");

        const listId = toDo_ary.length + 1;

        span.innerText = text;
        btn.innerText = "❌";
        btn.addEventListener("click", deleteHandle);
        li.id = listId;
        li.appendChild(span);
        li.appendChild(btn);
        toDoList.appendChild(li);

        const toDo_obj = {
            text,
            id: listId
        }
        toDo_ary.push(toDo_obj);
        
        saveToDo();

    }

    function loadToDos(){
        const toDoValue = localStorage.getItem(TODO_LS);
        const currentToDo = JSON.parse(toDoValue);

        currentToDo.forEach(toDo => {
            const toDoText = toDo.text;
            paintTodo(toDoText);
        })
    }

    function toDoHandle(e){
        e.preventDefault();
        const toDoValue = e.target[0].value;

        paintTodo(toDoValue);
        
    }

    function toDoInit(){
        loadToDos();
        toDoForm.addEventListener("submit", toDoHandle);
    }

    toDoInit();