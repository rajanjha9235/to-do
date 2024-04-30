import React, { useState } from "react";
import { useTodo } from "../contexts";  // useTodo is a custom hook that returns the context value

function TodoForm() {
    const [todoMsg,setTodoMsg] = useState(""); // State to store the todo message

    const {addTodo} = useTodo(); // Destructuring the addTodo function from the context

    // It will run when the form is submitted
    const add = (e) => {
        e.preventDefault();

        if (!todoMsg) return;
        addTodo({message:todoMsg,completed:false}) // Add the todo to the todos state
        setTodoMsg("");  // Clear the input field after adding the todo
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 overflow-auto"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

