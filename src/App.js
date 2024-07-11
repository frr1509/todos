import { useState, useEffect } from "react";
import styles from "./App.module.css";

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((loadedData) => loadedData.json())
            .then((loadedTodos) => {
                setTodos(loadedTodos);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className={styles.app}>
            <div>Список дел</div>
            {isLoading ? (<div className={styles.loader}></div>) : (todos.map(({ id, title }) => (
                <div key={id} className={styles.todoItem}>
                    {id}. {title}
                </div>)
            ))}
        </div>
    );
};
