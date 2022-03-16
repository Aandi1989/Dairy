export const  getAllTasks= async()=>{
const response=await fetch('http://localhost:7777/tasks')
const tasks= await response.json()
return tasks
}

export const getAllTasksThen=()=>{
  return fetch('http://localhost:7777/tasks')
  .then(response=>response.json())
  .then(tasks=>tasks)
}

export const postNewTask = async (task) => {
  const resopnse = await fetch('http://localhost:7777/tasks', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })
  const request = await resopnse.json()
  return request;          
}

export const putNewTask = async (task) => {
  const resopnse = await fetch('http://localhost:7777/tasks', {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })
  const request = await resopnse.json()
  return request;          
}