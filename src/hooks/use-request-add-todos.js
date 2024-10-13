import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export const useRequestAddTodos = (refreshTodos) => {
    const [isCreating, setIsCreating] = useState(false);
    const [todo, setTodo] = useState("");

    const requestAddTodos = () => {
        const todosDbRef = ref(db, "todos");
        setIsCreating(true);
        push(todosDbRef, {
            text: todo,
        }).then(() => {
            setTodo("");
            setIsCreating(false);
        });
    };

    return {
        isCreating,
        requestAddTodos,
        setTodo,
        todo,
    };
};
