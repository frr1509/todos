import { useState } from "react";
import styles from "./App.module.css";

import {
    useRequestAddTodos,
    useRequestDeleteTodos,
    useRequestEditableTodos,
    useRequestGetTodos,
} from "./hooks";

export const App = () => {
    const [search, setSearch] = useState("");

    const { isLoading, newTodo, isSorted, setIsSorted } = useRequestGetTodos();

    const { isCreating, requestAddTodos, setTodo, todo } = useRequestAddTodos();
    const {
        requestEditableTodos,
        handleEdit,
        editableTodoId,
        editableText,
        setEditableText,
    } = useRequestEditableTodos();
    const { requestDeleteTodos } = useRequestDeleteTodos();

    const toggleSort = (e) => {
        e.preventDefault();
        setIsSorted(!isSorted);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const filteredTodos = (newTodo || []).filter(
        (todo) =>
            todo.text && todo.text.toLowerCase().includes(search.toLowerCase()),
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
                    disabled={todo === "" || isCreating}
                >
                    Добавить
                </button>
            </form>
            <input
                type="text"
                placeholder={"Поиск задач"}
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
