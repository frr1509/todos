import { useState } from "react";

export const useRequestEditableTodos = (refreshTodos) => {
    const [editableTodoId, setEditableTodoId] = useState(null);
    const [editableText, setEditableText] = useState("");

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

    return {
        requestEditableTodos,
        handleEdit,
        editableTodoId,
        editableText,
        setEditableText
    };
};
