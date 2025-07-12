import Api from "./api";

export const createGroupTask = async (data) => {
    try {
        const res = await Api.post("/groupTask/create", data, {
            withCredentials: true,
        });
        return res.data.data;
    } catch (err) {
        const msg = err.response?.data?.message || "Failed to create group task";
        throw new Error(msg);
    }
};

export const getGroupTask = async () => {
    try {
        const response = await Api.get("/groupTask/AllGroups");
        return response.data.data || [];
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to fetch group tasks";
        throw new Error(errMsg);
    }
}

export const updateGroupTask = async (id, data) => {
    try {
        const response = await Api.patch(`/groupTask/update/${id}`, data, { withCredentials: true, });
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Only team leader can make changes";
        throw new Error(errMsg);
    }
}

export const deleteGroupTask = async (groupTaskId) => {
    try {
        const response = await Api.delete(`/groupTask/delete/${groupTaskId}`)
        return response.data.message || "Successfully deleted"
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to delete group task";
        throw new Error(errMsg);
    }
}

export const leaveGroupTask = async (id) => {
    try {
        const res = await Api.patch(`/groupTask/leave/${id}`);
        return res.data.data;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to leave from group task";
        throw new Error(errMsg);
    }
};

export const removeUserFromGroup = async (id, userToRemove) => {
    try {
        const res = await Api.patch(`/groupTask/RemoveGroupMembers/${id}`, {
            userToRemove,
        });
        return res.data.data;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to remove user from group task";
        throw new Error(errMsg);
    }
};

export const updateGroupMembers = async (id, body) => {
    try {
        const res = await Api.patch(`/groupTask/UpdateGroupMembers/${id}`, body);
        return res.data.data;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to update group task members";
        throw new Error(errMsg);
    }
};

export const getGroupTaskDetails = async (id) => {
    try {
        const res = await Api.get(`/groupTask/details/${id}`);
        return res.data.data;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to fetch group task details";
        throw new Error(errMsg);
    }
};

export const respondToGroupInvite = async (id, response) => {
    try {
        const res = await Api.patch(`/groupTask/respond/${id}`, { response });
        return res.data.data;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to send response for group task";
        throw new Error(errMsg);
    }
};

export const getPendingInvites = async () => {
    try {
        const res = await Api.get("/groupTask/invitations/pending");
        return res.data.data || [];
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to get invitations for group task";
        throw new Error(errMsg);
    }
}