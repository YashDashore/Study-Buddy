import Api from "./api";

const fetchUserAssignments = async () => {
    const response = await Api.get("/assignments/allAssign");
    return response.data.data || [];
};

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

const updateAssignment = async (id, data) => {
    try {
        const response = await Api.patch(`/assignments/update/${id}`, data, { withCredentials: true, });
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to update assignment";
        throw new Error(errMsg);
    }
}

const deleteAssignment = async (assignmentId) => {
    try {
        const response = await Api.delete(`/assignments/delete/${assignmentId}`)
        return response.data.message || "Successfully deleted"
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to delete assignment";
        throw new Error(errMsg);
    }
}

const fetchUserTodos = async () => {
    const response = await Api.get("/tasks/allTasks");
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

const updateTodo = async (id, data) => {
    try {
        const response = await Api.patch(`/tasks/UpdateTask/${id}`, data, { withCredentials: true, });
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to update todo";
        throw new Error(errMsg);
    }
}

const deleteTodo = async (TodoId) => {
    try {
        const response = await Api.delete(`/tasks/delete/${TodoId}`)
        return response.data.message || "Successfully deleted"
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to delete To-do";
        throw new Error(errMsg);
    }
}

const fetchUserStudySessions = async () => {
    const response = await Api.get("/studyProgress/allSessions");
    return response.data.data || [];
};

const createStudySession = async (data) => {
    try {
        const response = await Api.post("/studyProgress/create", data, {
            withCredentials: true,
        });
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to create Study Session";
        throw new Error(errMsg);
    }
}

const updateStudySession = async (id, data) => {
    try {
        const response = await Api.patch(`/studyProgress/update/${id}`, data, { withCredentials: true, });
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to update Study-Session";
        throw new Error(errMsg);
    }
}

const deleteUserStudySession = async (SessionId) => {
    try {
        const response = await Api.delete(`/studyProgress/delete/${SessionId}`)
        return response.data.message || "Successfully deleted"
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to delete study session";
        throw new Error(errMsg);
    }
}

export {
    fetchUserAssignments,
    fetchUserTodos,
    fetchUserStudySessions,
    createTodo,
    createAssignment,
    createStudySession,
    deleteAssignment,
    deleteTodo,
    deleteUserStudySession,
    updateAssignment,
    updateStudySession,
    updateTodo
}