import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
export const useRequestGetTodos = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newTodo, setNewTodo] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const todosDbRef = ref(db, "todos");
        return onValue(todosDbRef, (snapshot) => {
            const loadedTodos = snapshot.val();
            const todosArray = loadedTodos
                ? Object.entries(loadedTodos).map(([id, todo]) => ({
                      id,
                      ...todo,
                  }))
                : [];
            if (isSorted) {
                todosArray.sort((a, b) => a.text.localeCompare(b.text));
            }
            setNewTodo(todosArray);
            setIsLoading(false);
        });
    }, [isSorted]);
    // console.log(newTodo)
    return {
        isLoading,
        newTodo,
        isSorted,
        setIsSorted,
    };
};
