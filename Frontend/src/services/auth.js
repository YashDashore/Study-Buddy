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
        return response.data.message;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Login failed";
        throw new Error(errMsg);
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