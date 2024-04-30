import React from "react";
import { useTodo } from "../contexts"; // useTodo is a custom hook that returns the context value

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = React.useState(false);

    const [todoMsg, setTodoMsg] = React.useState(todo.message);

    const {updateTodo,deleteTodo,toggleComplete} = useTodo(); // Destructuring the functions from the context


    // function to edit the todo --> Run when it's editable and clicked on Save button
    const editTodo = () =>{
        updateTodo(todo.id, {...todo,message:todoMsg}) // Update the todo with the new message
        setIsTodoEditable(false); // Set isTodoEditable to false

    }

    // Function to toggle the completed status of a todo
    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }


    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable || todo.completed}
            />

            {/* Edit, Save Button */}
            <button title={!todo.completed? (isTodoEditable ?"Save":"Edit"):""}
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable(true);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>

            {/* Delete Todo Button */}
            <button title="Delete"
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
