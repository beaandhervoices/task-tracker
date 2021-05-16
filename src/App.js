import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/About';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  
  //WEATHER 
  
  //el estado apiData se usa para almacenar la respuesta
  const [apiData, setApiData] = useState({})
  
  //getState se usa para almacenar el nombre de la ubicación que se obtiene del input
  const [getState, setGetState] = useState('Madrid')
  
  //state se usa para almacenar una copia de lo anterior
  const [state, setState] = useState('Madrid')
  
  // API KEY AND URL
const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

console.log(apiUrl)

//Side effect

useEffect(()=> {
  fetch(apiUrl)
    .then((res)=>res.json())
    .then((data)=> setApiData(data));
}, [apiUrl]);

// función para manejar el input, coger sus datos y almacenarlos en getState
const inputHandler = (event) => {
  setGetState(event.target.value);
};

//función para copiar el estado de getState a state
const submitHandler = () => {
  setState(getState);
};

const kelvinToFarenheit = (k) => {
  return (k - 273.15).toFixed(2);
};

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

//Fetch tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}

//Fetch task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

//Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method :'POST',
    headers : {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)

  })
  const data = await res.json()

  setTasks([...tasks, data
  ])
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task}
  // setTasks([...tasks, newTask])
}

//Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })
  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method :'PUT',
    headers : {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })
  const data = await res.json()

  setTasks(
    tasks.map((task) => 
    task.id === id ? {...task, reminder: data.reminder} : task))
}




  return (
    <Router>
      <div className="container">
        <Header 
          onAdd = {()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}
        />
        <Route path='/' exact render={()=>(
          <>
          {showAddTask && <AddTask 
          onAdd = {addTask}  
        />}
        {tasks.length>0 ? 
        ( <Tasks 
            tasks= {tasks} 
            onDelete = {deleteTask}
            onToggle = {toggleReminder}
          /> 
        ) : ('No tasks to show'
        )}
          </>
        )} />
        <Route path ='/about' component={About} />
        <Footer />
        <About />
      </div>
    </Router>
  );
}

export default App;
