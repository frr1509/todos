import { useState, useEffect } from "react";
import styles from "./App.module.css";

export const App = () => {
    const [todo, setTodo] = useState("");
    const [newTodo, setNewTodo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [refreshTodosFlag, SetRefreshTodosFlag] = useState(false);
    const [editableTodoId, setEditableTodoId] = useState(null);
    const [editableText, setEditableText] = useState("");
    const [isSorted, setIsSorted] = useState(false);
    const [search, setSearch] = useState("");

    const refreshTodos = () => SetRefreshTodosFlag(!refreshTodosFlag);

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

    const requestAddTodos = (event) => {
        event.preventDefault();
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

    const handleEdit = (id, text) => {
        setEditableText(text);
        setEditableTodoId(id);
    };

    const requestEditableTodos = (id) => {
        fetch(`http://localhost:3005/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                text: editableText,
            }),
        })
            .then((rawResponce) => rawResponce.json())
            .then((responce) => {
                console.log("задача обновлена", responce);
                refreshTodos();
            })
            .finally(() => {
                setEditableTodoId(null);
                setEditableText("");
            });
    };

    const requestDeleteTodos = (id) => {
        fetch(`http://localhost:3005/todos/${id}`, {
            method: "DELETE",
        })
            .then((rawResponce) => rawResponce.json())
            .then((responce) => {
                console.log("задача удалена", responce);
                refreshTodos();
            });
    };

    const toggleSort = (e) => {
        e.preventDefault();
        setIsSorted(!isSorted);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredTodos = newTodo.filter((todo) =>
        todo.text.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className={styles.app}>
            <div className={styles.title}>Список дел</div>
            <form className={styles.form}>
                <button
                    className={`${styles.sortButton} ${isSorted ? styles.active : ""}`}
                    onClick={toggleSort}
                >
                    c
                </button>
                <input
                    type="text"
                    placeholder="Опишите вашу задачу"
                    className={styles.inputTitle}
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                ></input>
                <button
                    onClick={requestAddTodos}
                    type="submit"
                    className={styles.buttonAdd}
                    disabled={isCreating}
                >
                    Добавить
                </button>
            </form>
            <input
                type="text"
                placeholder="Поиск задач"
                className={styles.searchInput}
                value={search}
                onChange={handleSearchChange}
            />
            {isLoading ? (
                <div className={styles.loader}></div>
            ) : (
                filteredTodos.map(({ id, text }) => (
                    <div key={id} className={styles.todoItemContainer}>
                        {editableTodoId === id ? (
                            <input
                                className={styles.inputField}
                                value={editableText}
                                onChange={(e) =>
                                    setEditableText(e.target.value)
                                }
                            ></input>
                        ) : (
                            <div className={styles.todoItem}>{text}</div>
                        )}
                        {editableTodoId === id ? (
                            <button
                                className={styles.saveButton}
                                onClick={() => requestEditableTodos(id)}
                            >
                                Сохранить
                            </button>
                        ) : (
                            <button
                                className={styles.editButton}
                                onClick={() => handleEdit(id, text)}
                            >
                                Редактировать
                            </button>
                        )}
                        <button
                            className={styles.deleteButton}
                            onClick={() => requestDeleteTodos(id)}
                        >
                            Удалить
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};
