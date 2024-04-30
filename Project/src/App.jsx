import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts"
import { TodoForm,TodoItem } from "./components"


export default function App() {
  let obj = {id:1,message:"Hello",completed:false};
  // State to store the todos in the app 
  const [todos, setTodos] = useState([]) // Initial value is an empty array
  console.log("Empty now = ",todos);


  // Function to add a todo to the todos state
  const addTodo = (todo) => {
    // todo is an object with message and completed properties
    setTodos((prev) => [{id : Date.now(),...todo},...prev]) // Add the new todo to the beginning of the todos array 
  }

  // Function to update a todo in the todos state
  const updateTodo = (id,todo) => {
    // id is the id of the todo to be updated
    // todo is the new todo object
    setTodos((prev) => prev.map( // Loop over the todos array
      (prevTodo) => prevTodo.id === id ? todo : prevTodo)) // If the id matches, update the todo with the new todo
  }

  // Function to delete a todo from the todos state 
  const deleteTodo = (id) => {
    // Show only that todo whose id is not equal to the id to be deleted
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id)) // Filter out the todo with the id to be deleted
  }

  // Function to toggle the completed status of a todo
  const toggleComplete = (id) => {
    // Loop over the prev state & if id matches, toggle the completed status
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo,completed : !prevTodo.completed} : prevTodo))
  }


  // Load todos from session storage when the app loads for the first time
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    console.log("This will run only once = ",todos);

    if (todos && todos.length > 0){
      setTodos(todos)
    }
  },[]) // Empty array means it will run only once when the component mounts


  // Save todos to session storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
    //console.log("It will run when there is a change in Todos");
  },[todos]) // It will run whenever the todos state changes


  return (
    // Wrap the components with the TodoProvider and pass the todos and the functions to manipulate the todos
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>

      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>

          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {/* Loop over the todos array and pass each todo to the TodoItem component */}
            {todos.map((todo) => (
              <div  key={todo.id} className="w-full">
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>

        </div>
      </div>
    </TodoProvider>
  )
}
