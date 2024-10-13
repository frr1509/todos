import { useState } from "react";
import { ref, set} from "firebase/database";
import { db } from "../firebase";

export const useRequestEditableTodos = () => {
    const [editableTodoId, setEditableTodoId] = useState(null);
    const [editableText, setEditableText] = useState("");

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

    return {
        requestEditableTodos,
        handleEdit,
        editableTodoId,
        editableText,
        setEditableText
    };
};
