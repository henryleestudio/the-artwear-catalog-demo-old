// document.querySelector('#addLiBtn').addEventListener('click', addToDo)
    
// DONT NEED THIS IN FULL STACK APP
// function addToDo(){
//   // assigning the type of checkbox for checkBoxVariable
//   let checkBox = document.createElement('input')
//   checkBox.setAttribute("type", "checkbox");
//   checkBox.addEventListener('click', markedDone)


//   // grabbing user input
//   let newToDoEntry = document.querySelector('#newToDoEntry').value
//   console.log(newToDoEntry)
  
//   // creating text for the li
//   let toDoTxt = document.createTextNode(newToDoEntry);
//   // creating li and checkbox element
//   let liItem = document.createElement('li', 'checkbox')
//   let liItem2 = document.createElement('span')
//   // adding the checkbox element to the li
//   liItem.appendChild(checkBox)
//   // adding txt to li element
//   liItem2.appendChild(toDoTxt)
//   liItem.appendChild(liItem2)
//   ul.appendChild(liItem)

//   displayToDoLeft()
// }


// document.querySelector('#clearCompletedBtn').addEventListener('click', deleteParentDone)


const deletebtn = document.querySelector('#clearCompletedBtn')
const clearAll = document.querySelector('#clearAll')
let ul = document.querySelector("#toDoList")


function markedDone(event){
  console.log(event.target.tagName)
  event.target.nextSibling.classList.toggle('strikeThrough')
  event.target.parentElement.classList.toggle('strikeThrough')
  displayToDoLeft()
}

// function deleteParentDone(){
//   document.querySelectorAll('li.strikeThrough').forEach(element => element.style.display='none')
// }

function displayToDoLeft() {
  let nonStrikeThroughAmount = [...document.querySelectorAll('li')].filter(element => !element.classList.contains("strikeThrough")).length
  console.log("Todo Left: ", nonStrikeThroughAmount)
  const toDoLeftText = document.querySelector("#toDoLeftText")
  toDoLeftText.innerText = `${nonStrikeThroughAmount}`
}

// select all checkboxes and add query handler
document.querySelectorAll('.checkBoxes').forEach( box => {
  box.addEventListener("change", event => {
    console.log(event.target)
    console.log(event.target.checked)

    const task = event.target.parentNode.querySelector('.task').innerText
    console.log(task)
    fetch('/upDateEntry', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entry: task,
        completed: event.target.checked
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  })
})

deletebtn.addEventListener('click', _ => {
  fetch('/taskDelete', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      window.location.reload()
    })
})

// const task = event.target.parentNode.querySelectorAll('.task').innerText



clearAll.addEventListener('click', _ => {
  document.querySelector('.delete').addEventListener("click",()=>{
    document.querySelectorAll('li').forEach(bullet =>{
        bullet.remove()
    })
    })

  // fetch('/clearAll', {
  //   method: 'delete',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     interests: interests
  //   })
  // })
  //   .then(res => {
  //     if (res.ok) return res.json()
  //   })
  //   .then(data => {
  //     window.location.reload()
  //   })
})