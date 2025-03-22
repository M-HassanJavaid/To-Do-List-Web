let AddTask = document.querySelector('#AddTaks');
let TaskInput = document.querySelector('#Input');
let ListContainer = document.querySelector('#list-Container');
let LocalStorageData;
RenderLocalStorageData()

function ListFromLocalStorage() {
    LocalStorageData = localStorage.getItem('Tasks');
    LocalStorageData = JSON.parse(LocalStorageData);
    if (LocalStorageData === null) {
        LocalStorageData = [];
    }
}

function RenderLocalStorageData() {
    ListFromLocalStorage()
    for (let i = 0; i < LocalStorageData.length; i++) {
        let ListItem = document.createElement('div');
        ListItem.classList.add('list-Item');
        ListContainer.appendChild(ListItem);
        ListItem.innerHTML = `<div class="EditTask">
                               <input type="text" class="EditInput">
                               <button class="EditDone" onclick="EditDone(this)">Done</button>
                             </div>
                             <p class="ListPara">${LocalStorageData[i]}</p>
                             <div class="btns">
                               <button class="Edit" onclick="EditTask(this)">Edit</button>
                               <button class="Delete" onclick="DeleteTask(this)">Delete</button>
                             </div>`;
        
    }
}



AddTask.addEventListener('click', () => {
    InputValue = TaskInput.value;
    if (InputValue === '') {
        alert('Please Enter your Task!');
        return;
    }
    let ListItem = document.createElement('div');
    ListItem.classList.add('list-Item');
    ListContainer.appendChild(ListItem);
    ListItem.innerHTML = `<div class="EditTask">
                            <input type="text" class="EditInput">
                            <button class="EditDone" onclick="EditDone(this)">Done</button>
                          </div>
                          <p>${InputValue}</p>
                          <div class="btns">
                            <button class="Edit" onclick="EditTask(this)">Edit</button>
                            <button class="Delete" onclick="DeleteTask(this)">Delete</button>
                          </div>`;
    TaskInput.value = '';
    LocalStorageData.push(InputValue);
    localStorage.setItem('Tasks' , JSON.stringify(LocalStorageData));
});

function DeleteTask(CickBtn) {
    let DeleteFromLocalStorage = CickBtn.parentElement.previousElementSibling.innerText;
    for (let i = 0; i < LocalStorageData.length; i++) {
        if (LocalStorageData[i] === DeleteFromLocalStorage) {
            LocalStorageData.splice(i , 1);
            localStorage.setItem('Tasks' , JSON.stringify(LocalStorageData));
            break;
        }
    }
    ClickListItem = CickBtn.parentElement.parentElement;
    ClickListItem.remove();
}

function EditTask(ClickBtn) {
    let EditMenu = ClickBtn.parentElement.previousElementSibling.previousElementSibling;
    EditMenu.style.width = '100%';
}

function EditDone(clickBtn) {
    let EditInput = clickBtn.previousElementSibling;
    let listItemToEdit = clickBtn.parentElement.nextElementSibling;
    for (let i = 0; i < LocalStorageData.length; i++) {
        if (LocalStorageData[i] === listItemToEdit.innerText) {
            LocalStorageData[i] = EditInput.value;
            localStorage.setItem('Tasks' , JSON.stringify(LocalStorageData))
            break;
        }
        
    }
    if (EditInput.value === '') {
        alert('Please write something!');
        return;
    }
    listItemToEdit.innerText = EditInput.value;
    clickBtn.parentElement.style.width = '0%';
    EditInput.value = '';
}