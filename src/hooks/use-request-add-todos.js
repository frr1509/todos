import { useState } from "react";

export const useRequestAddTodos = (refreshTodos) => {
    const [isCreating, setIsCreating] = useState(false);
    const [todo, setTodo] = useState("");

    const requestAddTodos = () => {
        // event.preventDefault();
        setIsCreating(true);

        fetch("http://localhost:3005/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                text: todo,
            }),
        })
            .then((rawResponce) => rawResponce.json())
            .then((responce) => {
                console.log("задача добавлена", responce);
                refreshTodos();
            })
            .finally(() => setIsCreating(false));
        setTodo("");
    };

    return {
        isCreating,
        requestAddTodos,
        setTodo,
        todo,
    };
};
