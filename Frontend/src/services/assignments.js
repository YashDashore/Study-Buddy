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
const fetchUserStudySessions = async () => {
    const response = await Api.get("/studyProgress/allSessions");
    console.log(response);
    return response.data.data || [];
};

const createTodo = async (data) => {
    try {
        const response = await Api.post("/tasks/create", data, {
            withCredentials: true,
        });
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to create to-do";
        throw new Error(errMsg);
    }
}
const createAssignment = async (data) => {
    try {
        const response = await Api.post("/assignments/create", data, {
            withCredentials: true,
        });
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to create assignment";
        throw new Error(errMsg);
    }
}

export {
    fetchUserAssignments,
    fetchUserTodos,
    fetchUserStudySessions,
    createTodo,
    createAssignment,
}