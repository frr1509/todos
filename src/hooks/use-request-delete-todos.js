import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useRequestDeleteTodos = (refreshTodos) => {
    const requestDeleteTodos = (id) => {
        const todoDbRef = ref(db, `todos/${id}`);

        remove(todoDbRef).then((responce) => {
            console.log("задача удалена", responce);
        });
    };

    return {
        requestDeleteTodos,
    };
};
