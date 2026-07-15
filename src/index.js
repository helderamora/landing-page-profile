const inputText = document.querySelector("#new-task")
const taskComponent = document.querySelector(".task-content")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getValueInput() {
    if (inputText.value === '') return

    tasks.push({
        text: inputText.value,
        done: false 
    })

    saveTasks()
    renderTasks()

    inputText.value = ''
}

function renderTasks() {
    
    taskComponent.innerHTML = ''

    tasks.forEach((task, index) => {
        taskComponent.innerHTML += `
        <li class="tasks">
            <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${index})">
            <span 
            class="text-content"
            ondblclick="editTasks(${index}, this)"
            style="text-decoration: ${task.done ? 'line-through' : 'none'}"
            >
                ${task.text}
            </span>
            <img
            class="icon"  
            onclick="deleteTask(${index})"
            src="assets/trash-2.svg" 
            />
        </li>
    `
    })
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done

    saveTasks()
    renderTasks()
}

function deleteTask(index) {
    tasks.splice(index, 1)

    saveTasks()
    renderTasks()
}

function editTasks(index, spanElement) {
    const input = document.createElement('input')
    input.type = 'text'
    input.value = tasks[index].text
    input.className = spanElement.className
    input.style.cssText = spanElement.style.cssText
    input.style.border = 'none'
    input.style.outline = 'none'
    input.style.fontSize = '1rem'
    input.style.color = '#CCCCD0'
    input.style.background = 'transparent'

    spanElement.parentNode.replaceChild(input, spanElement)
    input.focus()
    input.select()

    const saveEdit = () => {
        const newText = input.value.trim()
        if (newText !== '') {
            tasks[index].text = newText
            saveTasks()
        }
        renderTasks()
    }

    const cancelEdit = () => {
        renderTasks()
    }

    input.addEventListener('blur', saveEdit)
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit()
        } else if (e.key === 'Escape') {
            cancelEdit()
        }
    })
}


renderTasks()
