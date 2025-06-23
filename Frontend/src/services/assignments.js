import Api from "./api";

const fetchUserAssignments = async () => {
    const response = await Api.get("/assignments/allAssign");
    return response.data.data || [];
};
 const fetchUserTodos = async () => {
    const response = await Api.get("/tasks/allTasks");
    console.log(response);
    return response.data.data || [];
};

export {
fetchUserAssignments,
fetchUserTodos
}