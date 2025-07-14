import Api from "./api";

export const registerUser = async (formData) => {
    try {
        const response = await Api.post("/users/registration", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("auth is working fine")
        return response.data;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Registration failed"
        throw new Error(errMsg);
    }
}

export const loginUser = async (data) => {
    try {
        const response = await Api.post("/users/login", data, {
            withCredentials: true,
        });
        if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Login failed";
        throw new Error(errMsg);
    }
}

export const logoutUser = async (data) => {
    try {
        const res = await Api.post("/users/logout", {}, { withCredentials: true });
        return res.data.message  || "Logout successful";
    } catch (error) {
        throw new Error("Logout failed");
    }
}

export const UpdateUser = async (data) => {
    try {
        const response = await Api.post("/users/changeDetails", data, {
            withCredentials: true,
        });
        return response.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Editing failed"
        throw new Error(errMsg);
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await Api.get("/users/details", {
            withCredentials: true,
        });
        return response.data.data || [];
    } catch (error) {
        const errMsg = error.response?.data?.message || "Failed to fetch current user";
        throw new Error(errMsg);
    }
}
