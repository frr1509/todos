export const useRequestDeleteTodos = (refreshTodos) => {
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

    return {
        requestDeleteTodos,
    };
};
