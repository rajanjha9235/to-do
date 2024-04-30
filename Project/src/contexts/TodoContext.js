import { useContext,createContext } from "react";

// Created a context for the todos and the functions to manipulate the todos
export const TodoContext = createContext({
    todos : [
        {
            id : 1,
            message : "Todo Message",
            completed : false
        }
    ],
    addTodo : (todo) => {},
    updateTodo : (id,todo) => {},
    deleteTodo : (id) => {},
    toggleComplete : (id) => {}
});

// Custom hook to use the context in the components
export const useTodo = () => {
    return useContext(TodoContext);
}

// Provider to wrap the components with the context provider
export const TodoProvider = TodoContext.Provider;