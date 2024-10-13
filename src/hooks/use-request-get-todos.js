import { useEffect, useState } from "react";

export const useRequestGetTodos = (refreshTodosFlag) => {
    const [isLoading, setIsLoading] = useState(false);
    const [newTodo, setNewTodo] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch("http://localhost:3005/todos")
            .then((loadedData) => loadedData.json())
            .then((loadedTodos) => {
                if (isSorted) {
                    loadedTodos.sort((a, b) => a.text.localeCompare(b.text));
                }
                setNewTodo(loadedTodos);
            })
            .finally(() => setIsLoading(false));
    }, [refreshTodosFlag, isSorted]);

    return {
        isLoading,
        newTodo,
        isSorted,
        setIsSorted
    };
};
