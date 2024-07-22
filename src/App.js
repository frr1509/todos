import { useState, useEffect } from "react";
import { ref, onValue, push, set, remove } from "firebase/database";
import styles from "./App.module.css";
import { db } from "./firebase";

export const App = () => {
    const [todo, setTodo] = useState("");
    const [newTodo, setNewTodo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [editableTodoId, setEditableTodoId] = useState(null);
    const [editableText, setEditableText] = useState("");
    const [isSorted, setIsSorted] = useState(false);
    const [search, setSearch] = useState("");

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

    const requestAddTodos = (event) => {
        const todosDbRef = ref(db, "todos");
        event.preventDefault();
        setIsCreating(true);
        push(todosDbRef, {
            text: todo,
        }).then(() => {
            setTodo("");
            setIsCreating(false);
        });
    };

    const handleEdit = (id, text) => {
        setEditableText(text);
        setEditableTodoId(id);
    };

    const requestEditableTodos = (id) => {
        const todoDbRef = ref(db, `todos/${id}`);
        set(todoDbRef, {
            text: editableText,
        }).then(() => {
            setEditableTodoId(null);
            setEditableText("");
        });
    };

    const requestDeleteTodos = (id) => {
        const todoDbRef = ref(db, `todos/${id}`);

        remove(todoDbRef).then((responce) => {
            console.log("задача удалена", responce);
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
