// to get require element
const inputBox=document.querySelector("#input");
const addBtn=document.querySelector(".inputField button");
const todoList=document.querySelector(".todoList");
let editIndex;
let isEdited=false;
let todo=JSON.parse(localStorage.getItem("New task"));
displayTask();
// Activate add button
inputBox.onkeyup  = ()=>{
    let data=inputBox.value.trim();
    if(data != 0){
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }

}
// Add new todo
addBtn.onclick = ()=>{
    let data=inputBox.value.trim();
   
    if(!isEdited){
        if(todo==null){
            todo=[];
        }
        let taskInfo={name:data,status:"pending"};
        todo.push(taskInfo);
    }else{
        isEdited=false;
        todo[editIndex].name = data;
        console.log(todo[editIndex]);
    }
    localStorage.setItem("New task",JSON.stringify(todo));
    displayTask();
}

function displayTask(){
    let newList='';
    if(todo!=undefined){
        todo.forEach((inputTask ,index)=> {
            let isComplete="";
            if(todo[index].status=="completed"){
                isComplete="completed";
            }
            newList +=` <li>
                            <p class="${isComplete}"> 
                                ${inputTask.name}
                            </p>
                            <span>
                                <i onclick="updateStatus(this)" class='fas fa-check-circle' style="color: rgb(159, 6, 213);" id="${index}">
                                </i> <i onclick="edit('${inputTask.name}','${index}')" class="fas fa-edit"></i> 
                                <i onclick="deleteTask(${index})" class='fas fa-trash' style="color: rgb(159, 6, 213);" ></i> 
                            </span>
                        </li> `
        });
    }
    todoList.innerHTML=newList;
    inputBox.value = "";
}

// todo complete or pending
function updateStatus(element){
    let taskName=element.parentElement.previousElementSibling;
    if(todo[element.id].status=="completed"){
        // taskName.classList.remove('completed');
        todo[element.id].status="pending";
    }else{
        // taskName.classList.add('completed');
        todo[element.id].status="completed";
    }
    localStorage.setItem("New task",JSON.stringify(todo));
    displayTask();
}

// Edit todo
function edit(inputTaskName,index){
    editIndex=index;
    isEdited=true;
    inputBox.value=inputTaskName;
}

// Delete todo
function deleteTask(index){
    todo.splice(index,1);
    localStorage.setItem("New task",JSON.stringify(todo));
    displayTask();
}
